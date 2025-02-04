from django.contrib.auth.models import AbstractUser
from django.db.models import CharField


# Create your models here.
class User(AbstractUser):
    """Default user for Chattr Labs."""

    #: First and last name do not cover name patterns around the globe
    name = CharField(("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
