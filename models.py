from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Translation(Base):
    __tablename__ = "translations"

    id = Column(Integer, primary_key=True, index=True)
    french_text = Column(String)
    sentiment = Column(String)
    english_text = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
