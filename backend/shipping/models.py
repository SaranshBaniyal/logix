from django.db import models
import uuid

# class Shipment(models.Model):
#     id = models.CharField(
#         max_length=36, default=uuid.uuid4, primary_key=True, unique=True
#     )
#     name = models.CharField(max_length=100)
#     # Add other fields for tracking the shipping, e.g., destination, departure time, sender, receiver etc.

class ThresholdConditions(models.Model):
    shipment_id = models.CharField(max_length=36, default=uuid.uuid4, primary_key=True, unique=True)
    temperature_upper_limit = models.FloatField()
    temperature_lower_limit = models.FloatField()
    humidity_upper_limit = models.FloatField()
    humidity_lower_limit = models.FloatField()

class SensorData(models.Model):
    id = models.CharField(max_length=36, default=uuid.uuid4, primary_key=True, unique=True)
    shipment_id = models.ForeignKey(ThresholdConditions, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True) #can we make this as PK
    temperature = models.FloatField()
    humidity = models.FloatField()
    