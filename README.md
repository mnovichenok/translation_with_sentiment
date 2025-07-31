#  Sentiment-Controlled French-to-English Translator
A full-stack web application that translates French sentences into English with a specified sentiment.

## Overview
This project allows users to input a sentence in French and choose an English sentiment (i.e., neutral, joy, anger, sadness, surprise, fear, disgust) for the translation. It uses a fine-tuned T5 model to generate translations in the selected emotional tone. The application is built with:


- Hugging Face models:

  - [`j-hartmann/emotion-english-distilroberta-base`](https://huggingface.co/j-hartmann/emotion-english-distilroberta-base) for sentiment labeling (used during training)

  - A custom fine-tuned T5 model for sentiment-aware translation

- FastAPI backend handles inference using Hugging Face Transformers

- React frontend for clean user interaction

- Containerized with Podman using podman-compose for easy deployment

<img src="https://github.com/user-attachments/assets/10696be2-ac76-4142-8fec-ae02b4e518f1" alt="Screenshot 2025-07-31 at 1 46 38 PM" style="max-width: 100%; width: 75%; height: auto;" />


## Installation & Running the Project
###  Prerequisites

- [Podman](https://podman.io/) installed and configured
- Podman machine (for macOS users):
```bash
podman machine init && podman machine start
```

#### 1. Clone the repository

```bash
git clone https://github.com/mnovichenok/translation_with_sentiment.git
cd translation_with_sentiment
```

#### 2. Build and start services

```bash
podman-compose up --build
```

#### 3. Access the App

http://localhost:3000


### -Maya Novichenok

