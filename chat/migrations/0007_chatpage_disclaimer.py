# Generated by Django 4.2.2 on 2023-08-08 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_conversation_external_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatpage',
            name='disclaimer',
            field=models.TextField(blank=True, null=True),
        ),
    ]
