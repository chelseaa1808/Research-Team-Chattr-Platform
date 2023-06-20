# Chattr GPT

Chattr GPT is a website for creating and interacting with ChatGPT bots.

## Getting started

Chattr GPT uses [Poetry](https://python-poetry.org/) for managing dependencies. Get started by running `poetry install`.

You can also create a `.env` file to use for the development environment. It should have the following keys:

```
DEBUG=True
DATABASE_URL=
```

`DATABASE_URL` should be a dj-database-url compatible database string specifying the database type, username and password, and connection info.
