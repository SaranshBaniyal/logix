from django.urls import path
from shipping import views

urlpatterns = [
    path("sensordata", views.ReceiveSensorData.as_view(), name="sensordata"),
    path("setconditions", views.SetThresholdConditions.as_view(), name="setconditions"),
    path("checkconditions", views.CheckCondition.as_view(), name="checkconditions"),

    path("checkkar", views.CheckKar.as_view(), name="checkkar"),
]