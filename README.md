#  Sentiment-Controlled French-to-English Translator
A full-stack web application that translates French sentences into English with a specified sentiment.

## Overview
This project allows users to input a sentence in French and choose an English sentiment (i.e., neutral, joy, anger, sadness, surprise, fear, disgust) for the translation. It uses a fine-tuned T5 model to generate translations in the selected emotional tone. The application is built with:


- **Hugging Face** models:

  - **[`j-hartmann/emotion-english-distilroberta-base`](https://huggingface.co/j-hartmann/emotion-english-distilroberta-base)**: A compact, high-performance RoBERTa-based model used during preprocessing to automatically label English sentences with one of seven emotion categories. These labels were then used to condition the fine-tuning dataset for translation.

  - **T5 Model**: A T5 (Text-to-Text Transfer Transformer) model fine-tuned on paired French-English sentences with sentiment tags. The model was trained to generate English translations that align with a given emotional tone (e.g., joy, fear, disgust), enabling stylistically controlled output.
    
- **FastAPI backend**: processes translation requests from the frontend, prepares sentiment-tagged prompts for the T5 model, performs inference, logs the translation to the database, and returns the result to the client
  
- **React frontend**: user-friendly interface built with React, allowing users to input French sentences, select a target sentiment, and view the emotionally tailored English translation. Communicates with the backend via Axios and displays real-time responses

- **PostgreSQL database**: relational database that persists translation history, including the original French sentence, selected sentiment, and resulting English translation. Enables tracking, analysis, and potential model auditing

- **Podman & podman-compose**: the full stack is containerized for reproducibility and portability. Podman orchestrates isolated containers for the backend, frontend, and database, while podman-compose simplifies multi-container deployment

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

