# Generated by Django 4.2.11 on 2024-04-04 01:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_appuser_email_alter_appuser_password_appsave_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appsave',
            name='userid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saved_content', to=settings.AUTH_USER_MODEL),
        ),
    ]