import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import ignore_logger

from .settings import *  # noqa

ignore_errors = [
    "django.security.DisallowedHost",
    "django.core.exceptions.SuspiciousOperation",
]
ignore_logger(*ignore_errors)

sentry_sdk.init(
    dsn="https://ca3af9d71a3d67f7399f07c150d50725@o878041.ingest.sentry.io/4505722796965888",
    integrations=[
        DjangoIntegration(),
    ],
    traces_sample_rate=0.2,
    send_default_pii=False,
    ignore_errors=ignore_errors,
)
