from rest_framework import serializers
from .models import SensorData
from .models import ThresholdConditions

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = ('timestamp', 'temperature', 'humidity')

class ThresholdConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThresholdConditions
        fields = ('temperature_upper_limit', 'temperature_lower_limit', 'humidity_upper_limit', 'humidity_lower_limit')
