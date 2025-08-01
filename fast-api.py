from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration
from datetime import datetime

from sqlalchemy.orm import Session
from models import Base, Translation
from database import engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tokenizer = T5Tokenizer.from_pretrained("model")
model = T5ForConditionalGeneration.from_pretrained("model")

class TranslationRequest(BaseModel) :
    french: str
    sentiment: str

@app.post("/translate")
def translate(req: TranslationRequest, db: Session = Depends(get_db)):
    input_text = f"<{req.sentiment}> {req.french}"
    tokens = tokenizer.encode(input_text, return_tensors="pt")
    output_ids = model.generate(tokens, max_length=128)
    translation = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    record = Translation(
        french_text=req.french,
        sentiment=req.sentiment,
        english_text=translation
    )
    db.add(record)
    db.commit()
    
    return {"translation": translation}


