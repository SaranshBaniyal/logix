from django.db import models
import uuid

class Shipment(models.Model):
    id = models.CharField(
        max_length=36, default=uuid.uuid4, primary_key=True, unique=True
    )
    name = models.CharField(max_length=100)
    # Add other fields for tracking the shipping, e.g., destination, departure time, sender, receiver etc.

class SensorData(models.Model):
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature = models.FloatField()
    humidity = models.FloatField()


class ThresholdConditions(models.Model):
    temperature_upper_limit = models.FloatField()
    temperature_lower_limit = models.FloatField()
    humidity_upper_limit = models.FloatField()
    humidity_lower_limit = models.FloatField()
