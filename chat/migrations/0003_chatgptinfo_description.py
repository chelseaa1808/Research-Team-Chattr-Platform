# Generated by Django 4.2.2 on 2023-06-20 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_remove_bot_starting_user_message_bot_bot_initiates_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatgptinfo',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
