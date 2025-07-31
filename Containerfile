FROM python:3.10

WORKDIR /app

# Install build tools and libsentencepiece explicitly
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsentencepiece-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "fast-api:app", "--host", "0.0.0.0", "--port", "8000"]

