import requests

def verify_email(token):
    url = "http://localhost:3000/auth/verify-email"
    params = {'token': token}
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        print("Email verified successfully:", response.json())
    else:
        print("Failed to verify email:", response.status_code, response.json())

if __name__ == "__main__":
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTcyMjI5NTc0NCwiZXhwIjoxNzIyNDY4NTQ0fQ.bcLSCtIi-YsuS5Wtdssy4dsHjBY0kTakgRD1C9KB-TU"  # Replace with the actual token
    verify_email(token)

