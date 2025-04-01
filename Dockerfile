# ========================
# FRONTEND: Build React/Vite
# ========================
FROM node:18-bullseye-slim AS frontend-build

WORKDIR /app/frontend

# Install dependencies and build
COPY frontend/package*.json ./
RUN npm install && npm cache clean --force

COPY frontend/ ./
RUN npm run build

RUN pip install django

# ========================
# BACKEND: Build Python/Poetry
# ========================
FROM python:3.11-slim-bullseye AS backend-build

# Environment setup
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    POETRY_VERSION=1.5.1 \
    POETRY_CACHE_DIR='/var/cache/pypoetry'

# Install system dependencies
RUN apt update && apt install --no-install-recommends -y \
    build-essential libpq-dev curl

# Install Poetry
ENV POETRY_VIRTUALENVS_CREATE=false
RUN pip install "poetry==$POETRY_VERSION"
RUN python -m pip show django

# Install Python dependencies
WORKDIR /code
COPY . /code/
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-dev


# ========================
# FINAL RUNTIME STAGE
# ========================
FROM python:3.11-slim-bullseye

# Create Django user
RUN addgroup --system django && adduser --system --ingroup django django

# Install system dependencies
RUN apt-get update && apt-get install --no-install-recommends -y libpq-dev

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set working directory
WORKDIR /app

# Copy backend code (adjust this!)
COPY --from=backend-build /code /app

# Copy built frontend into the same app dir
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Run Django server (use Gunicorn in prod!)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
