# Generated by Django 4.2 on 2022-12-22 14:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("selections", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ReservationJob",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("execution_time", models.DateTimeField()),
                ("status", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "selection",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="selections.selection",
                    ),
                ),
            ],
            options={
                "ordering": ("id",),
            },
        ),
        migrations.CreateModel(
            name="Reservation",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("status", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "selection",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="selections.selection",
                    ),
                ),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reservations",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("id",),
            },
        ),
    ]
