from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CharField


# Create your models here.
class User(AbstractUser):
    """Custom user model for Chattr Labs."""
    
    # Replacing first and last name with a single 'name' field
    name = models.CharField("Name of User", max_length=255, blank=True)
    first_name = None  # Remove default first_name
    last_name = None  # Remove default last_name

    # Additional field: Bio
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username  # Displays username in admin and shell