# %%
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from datasets import load_dataset, Dataset
import pandas as pd

# %%
df = pd.read_csv("French-English-dataset.csv")
fr_en_df = pd.read_csv("French-to-English-translation.csv")
df = df.rename(columns={'text': 'english'})

col_data = fr_en_df.pop('French')
df.insert(0, 'french', col_data)



# %%
df["input_text"] = df["label"].apply(lambda s: f"<{s}> ") + df["french"]
df["target_text"] = df["english"]

dataset = Dataset.from_pandas(df[["input_text", "target_text"]])

# %%
# Tokenizer/model
tokenizer = T5Tokenizer.from_pretrained("t5-small", legacy=True)
model = T5ForConditionalGeneration.from_pretrained("t5-small")

def preprocess(ex):
    model_inputs = tokenizer(ex["input_text"], truncation=True, padding="max_length", max_length=128)
    labels = tokenizer(ex["target_text"], truncation=True, padding="max_length", max_length=128)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

tokenized = dataset.map(preprocess, batched=True)

# %%
# Training
from transformers import TrainingArguments

args = TrainingArguments(
    output_dir="t5-translator",
    eval_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=8,
    num_train_epochs=3
)
print("TrainingArguments created successfully.")


trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized,
    eval_dataset=tokenized,
    tokenizer=tokenizer,
) 
trainer.train()

# %%
model.save_pretrained("model")
tokenizer.save_pretrained("model")

# %%


# %%


# %%


# %%


# %%


# %%



