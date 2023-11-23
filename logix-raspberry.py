import http.client
import json
import time
import random
import Adafruit_DHT

# DHT22 sensor setup
sensor = Adafruit_DHT.DHT22
pin = 4  # GPIO pin connected to the DHT22 sensor

# Take shipment_id as input from the user
shipment_id = input("Enter the shipment ID: ")

# Server information
host = "logix-backend.onrender.com"
url = "/sensordata"

while True:
    # temperature = random.uniform(0, 40)
    # humidity = random.uniform(20, 80)

    # # Create JSON payload
    # payload = {
    #     "shipment_id": shipment_id,
    #     "temperature": temperature,
    #     "humidity": humidity,
    # }
    # json_payload = json.dumps(payload)

    # Specify headers
    headers = {
        "Content-Type": "application/json",
        # "ngrok-skip-browser-warning": "true",
    }

    # Establish a connection to the server
    connection = http.client.HTTPSConnection(host)

    try:
        # Read temperature and humidity from the DHT22 sensor
        humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

        # Check if the values are valid
        if humidity is not None and temperature is not None:
            payload = {
                "shipment_id": shipment_id,
                "temperature": temperature,
                "humidity": humidity,
            }

            json_payload = json.dumps(payload)

            # Send the POST request
            connection.request("POST", url, json_payload, headers)

            # Get the response
            response = connection.getresponse()

            if response.status == 201:
                print("Sensor data sent successfully.")
            else:
                print(f"Error sending sensor data. Status code: {response.status}")
                # Print the response content for further debugging
                print(response.read().decode('utf-8'))

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Close the connection
        connection.close()

    time.sleep(10)
