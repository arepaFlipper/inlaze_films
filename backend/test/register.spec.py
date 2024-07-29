import requests
import json

# The URL of your registration endpoint
url = "http://localhost:3000/auth/register"  # Adjust the port if different

# The data to send in the request
data = {
    "email": "test@example.com",
    "password": "securepassword123"
}

# Headers for the request
headers = {
    "Content-Type": "application/json"
}

try:
    # Send the POST request
    response = requests.post(url, data=json.dumps(data), headers=headers)

    # Check the response
    if response.status_code == 201:  # Assuming 201 Created is returned on successful registration
        print("Registration successful!")
        print("Response:", response.json())
    else:
        print("Registration failed.")
        print("Status code:", response.status_code)
        print("Response:", response.text)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
