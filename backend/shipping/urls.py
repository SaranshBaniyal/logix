from django.urls import path
from shipping import views

urlpatterns = [
    path("receive-sensor-data", views.ReceiveSensorData.as_view(), name="receive-sensor-data"),
    path('set-threshold-conditions', views.SetThresholdConditions.as_view(), name='set-threshold-conditions'),
]