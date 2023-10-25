from django.contrib import admin
from shipping.models import Shipment, SensorData, ThresholdConditions

admin.site.register(Shipment)
admin.site.register(SensorData)
admin.site.register(ThresholdConditions)