# Generated by Django 5.1.7 on 2025-04-01 21:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0007_chatpage_disclaimer"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="conversation",
            name="ip_address",
            field=models.GenericIPAddressField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="bot",
            name="model",
            field=models.CharField(
                choices=[
                    ("gpt-4o-mini", "GPT-4o Mini (new and cheap)"),
                    ("gpt-4o", "GPT-4o (newest)"),
                    ("gpt-4-turbo", "GPT-4 Turbo"),
                    ("gpt-4", "GPT-4"),
                    ("gpt-3.5-turbo", "GPT-3.5 Turbo"),
                    ("gpt-4-0613", "GPT-4-0613"),
                    ("gpt-4-32k", "GPT-4-32k"),
                    ("gpt-4-32k-0613", "GPT-4-32k-0613"),
                    ("gpt-3.5-turbo-0613", "GPT-3.5 Turbo-0613"),
                    ("gpt-3.5-turbo-16k", "GPT-3.5 Turbo-16k"),
                    ("gpt-3.5-turbo-16k-0613", "GPT-3.5 Turbo-16k-0613"),
                ],
                max_length=200,
            ),
        ),
        migrations.AlterField(
            model_name="chatpage",
            name="bot",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="chat_pages",
                to="chat.bot",
            ),
        ),
        migrations.CreateModel(
            name="UsageLog",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("action", models.CharField(max_length=255)),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("request_data", models.JSONField()),
                ("response_data", models.JSONField()),
                ("metadata", models.JSONField(blank=True, null=True)),
                (
                    "bot",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="chat.bot"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
