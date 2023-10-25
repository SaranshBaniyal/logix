from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SensorData, ThresholdConditions
from .serializers import SensorDataSerializer
from .models import ThresholdConditions
from .serializers import ThresholdConditionsSerializer

class ReceiveSensorDataView(APIView):
    def post(self, request, format=None):
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Fetch the threshold conditions from the database
            try:
                conditions = ThresholdConditions.objects.first()
            except ThresholdConditions.DoesNotExist:
                conditions = None

            if conditions:
                temperature = serializer.validated_data['temperature']
                humidity = serializer.validated_data['humidity']

                # Check the sensor data against the threshold conditions
                temperature_upper_limit = conditions.temperature_upper_limit
                temperature_lower_limit = conditions.temperature_lower_limit
                humidity_upper_limit = conditions.humidity_upper_limit
                humidity_lower_limit = conditions.humidity_lower_limit

                if (
                    temperature >= temperature_lower_limit and
                    temperature <= temperature_upper_limit and
                    humidity >= humidity_lower_limit and
                    humidity <= humidity_upper_limit
                ):
                    condition = 'Good'
                else:
                    condition = 'Bad'
            else:
                condition = 'Threshold conditions not set.'

            return Response({'condition': condition}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SetThresholdConditionsView(APIView):
    def get(self, request, format=None):
        try:
            conditions = ThresholdConditions.objects.first()
        except ThresholdConditions.DoesNotExist:
            conditions = None

        if conditions:
            serializer = ThresholdConditionsSerializer(conditions)
            return Response(serializer.data)
        return Response({'message': 'Threshold conditions not set.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        try:
            conditions = ThresholdConditions.objects.first()
        except ThresholdConditions.DoesNotExist:
            conditions = None

        serializer = ThresholdConditionsSerializer(conditions, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
