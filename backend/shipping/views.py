from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SensorData, ThresholdConditions
from .serializers import SensorDataSerializer
from .models import ThresholdConditions
from .serializers import ThresholdConditionsSerializer

# class ReceiveSensorData(APIView):
#     #make one check api jo contract se call ho
#     def post(self, request, format=None):
#         serializer = SensorDataSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             # Fetch the shipment_id from the request data
#             shipment_id = serializer.validated_data.get('shipment_id')

#             # Fetch the threshold conditions from the database based on the shipment_id
#             try:
#                 conditions = ThresholdConditions.objects.get(shipment_id=shipment_id)
#             except ThresholdConditions.DoesNotExist:
#                 conditions = None

#             if conditions:
#                 temperature = serializer.validated_data['temperature']
#                 humidity = serializer.validated_data['humidity']

#                 # Check the sensor data against the threshold conditions
#                 temperature_upper_limit = conditions.temperature_upper_limit
#                 temperature_lower_limit = conditions.temperature_lower_limit
#                 humidity_upper_limit = conditions.humidity_upper_limit
#                 humidity_lower_limit = conditions.humidity_lower_limit

#                 if (
#                     temperature >= temperature_lower_limit and
#                     temperature <= temperature_upper_limit and
#                     humidity >= humidity_lower_limit and
#                     humidity <= humidity_upper_limit
#                 ):
#                     condition = 'Good'
#                 else:
#                     condition = 'Bad'
#             else:
#                 condition = 'Threshold conditions not found for the specified shipment_id.'

#             return Response({'condition': condition}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReceiveSensorData(APIView):
    def post(self, request, format=None):
        serializer = SensorDataSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CheckCondition(APIView):
    # def post(self, request, format=None):
    def get(self, request, format=None):
        # shipment_id = request.data.get('shipment_id')

        shipment_id = request.GET.get('shipment_id')

        # Fetch the threshold conditions for the specified shipment_id
        try:
            conditions = ThresholdConditions.objects.get(shipment_id=shipment_id)
        except ThresholdConditions.DoesNotExist:
            return Response({'condition_ok': False, 'message': 'Threshold conditions not found for the specified shipment_id.'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch all SensorData instances for the specified shipment_id
        sensor_data_instances = SensorData.objects.filter(shipment_id=shipment_id)

        if not sensor_data_instances:
            return Response({'condition_ok': False, 'message': 'No SensorData found for the specified shipment_id.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if all instances are within the threshold
        for instance in sensor_data_instances:
            temperature = instance.temperature
            humidity = instance.humidity

            temperature_upper_limit = conditions.temperature_upper_limit
            temperature_lower_limit = conditions.temperature_lower_limit
            humidity_upper_limit = conditions.humidity_upper_limit
            humidity_lower_limit = conditions.humidity_lower_limit

            if (
                temperature < temperature_lower_limit or
                temperature > temperature_upper_limit or
                humidity < humidity_lower_limit or
                humidity > humidity_upper_limit
            ):
                return Response({'condition_ok': False, 'message': 'Threshold crossed for the specified shipment_id.'}, status=status.HTTP_200_OK)

        # If all instances are within the threshold
        return Response({'condition_ok': True}, status=status.HTTP_200_OK)

class SetThresholdConditions(APIView):
    def post(self, request, format=None):
        serializer = ThresholdConditionsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CheckKar(APIView):
    def get(self, request, format=None):    
        return Response({'condition_ok': True, 'message': 'Within the Threshold'}, status=status.HTTP_200_OK)