# Generated by Django 4.2.2 on 2023-06-20 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_chatgptinfo_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='conversation',
            name='uid',
        ),
    ]
