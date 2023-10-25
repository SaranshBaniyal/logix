import requests
import time
import random

shipping_id = "unique_shipping_identifier"  # Replace with the appropriate identifier

server_url = f"http://your_server_url/api/sensor-data/{shipping_id}/"

while True:
    temperature = random.uniform(0, 40)
    humidity = random.uniform(20, 80)

    data = {
        "temperature": temperature,
        "humidity": humidity,
    }

    try:
        response = requests.post(server_url, json=data)
        if response.status_code == 201:
            print("Sensor data sent successfully.")
        else:
            print("Error sending sensor data.")
    except Exception as e:
        print(f"Error: {e}")

    time.sleep(300)

