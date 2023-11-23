from rest_framework import serializers
from .models import SensorData
from .models import ThresholdConditions

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ('shipment_id', 'timestamp', 'temperature', 'humidity')

class ThresholdConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThresholdConditions
        fields = ('shipment_id', 'temperature_upper_limit', 'temperature_lower_limit', 'humidity_upper_limit', 'humidity_lower_limit')
