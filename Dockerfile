# DOESN'T WORK YET

# Build the frontend
FROM node:18-bullseye-slim AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install && npm cache clean --force
COPY frontend ./
RUN npm run build

# Build dependencies
FROM python:3.11-slim-bullseye AS build
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1 \
    POETRY_VERSION=1.5.1 \
    POETRY_CACHE_DIR='/var/cache/pypoetry'
RUN apt update && apt install --no-install-recommends -y \
    build-essential libpq-dev \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*
RUN pip install "poetry==$POETRY_VERSION"
WORKDIR /code
COPY pyproject.toml poetry.lock ./
RUN poetry install

# And run it
FROM python:3.11-slim-bullseye AS runtime
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /app
RUN addgroup --system django && adduser --system --ingroup django django
RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/app/wheels /wheels

