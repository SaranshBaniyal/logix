class ShippingHandler:
    def __init__(self):
        pass

    def calculate_overall_condition(data):
        # Define your threshold values for temperature and humidity
        temperature_upper_limit = 25  # Adjust to your requirements
        temperature_lower_limit = 10  # Adjust to your requirements
        humidity_upper_limit = 70    # Adjust to your requirements
        humidity_lower_limit = 30    # Adjust to your requirements

        temperature_out_of_range = 0
        humidity_out_of_range = 0

        for entry in data:
            temperature = entry['temperature']
            humidity = entry['humidity']

            if temperature < temperature_lower_limit or temperature > temperature_upper_limit:
                temperature_out_of_range += 1

            if humidity < humidity_lower_limit or humidity > humidity_upper_limit:
                humidity_out_of_range += 1

        if temperature_out_of_range > 0 or humidity_out_of_range > 0:
            return 'Bad'  # At least one data point was out of range
        else:
            return 'Good'  # All data points were within the specified range