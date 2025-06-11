import requests
import json

BASE_URL = 'http://10.2.0.2:5000/api'

def test_login():
    """Test login with admin credentials"""
    response = requests.post(f'{BASE_URL}/auth/login', json={
        'email': 'admin@rentalkompanion.com',
        'password': 'admin123'
    })
    print('\nLogin Test:')
    print(f'Status Code: {response.status_code}')
    print(f'Response: {json.dumps(response.json(), indent=2)}')
    return response.json().get('access_token')

def test_me(token):
    """Test /me endpoint with token"""
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f'{BASE_URL}/auth/me', headers=headers)
    print('\n/me Test:')
    print(f'Status Code: {response.status_code}')
    print(f'Response: {json.dumps(response.json(), indent=2)}')

def test_companions(token):
    """Test companions endpoint"""
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f'{BASE_URL}/companions', headers=headers)
    print('\nCompanions Test:')
    print(f'Status Code: {response.status_code}')
    print(f'Response: {json.dumps(response.json(), indent=2)}')

if __name__ == '__main__':
    # Run tests in sequence
    token = test_login()
    if token:
        test_me(token)
        test_companions(token) 