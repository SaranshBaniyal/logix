import http.client
import json
import time
import random

# Take shipment_id as input from the user
shipment_id = input("Enter the shipment ID: ")

# Server information
host = "296c-220-158-168-162.ngrok-free.app"
url = "/sensordata"

while True:
    temperature = random.uniform(0, 40)
    humidity = random.uniform(20, 80)

    # Create JSON payload
    payload = {
        "shipment_id": shipment_id,
        "temperature": temperature,
        "humidity": humidity,
    }
    json_payload = json.dumps(payload)

    # Specify headers
    headers = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    }

    # Establish a connection to the server
    connection = http.client.HTTPSConnection(host)

    try:
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
