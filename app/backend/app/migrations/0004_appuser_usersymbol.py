# Generated by Django 4.2.11 on 2024-04-04 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_appsave_userid'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='userSymbol',
            field=models.ImageField(blank=True, null=True, upload_to='user_profile_picture/'),
        ),
    ]