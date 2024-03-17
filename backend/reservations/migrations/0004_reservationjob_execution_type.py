# Generated by Django 4.2 on 2022-12-23 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "reservations",
            "0003_alter_reservation_status_alter_reservation_user_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="reservationjob",
            name="execution_type",
            field=models.CharField(
                blank=True,
                choices=[("ETA", "ETA"), ("IMMEDIATE", "IMMEDIATE")],
                default="ETA",
                max_length=100,
                null=True,
            ),
        ),
    ]
