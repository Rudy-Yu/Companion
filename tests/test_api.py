import unittest
import json
from datetime import datetime, timedelta
from src import create_app
from src.models.database import db, User, CompanionProfile, CompanionService

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
        # Create test user
        self.user = User(
            name='Test User',
            email='test@example.com',
            phone='081234567890',
            role='user'
        )
        self.user.set_password('password123')
        db.session.add(self.user)
        
        # Create test companion
        self.companion = User(
            name='Test Companion',
            email='companion@example.com',
            phone='081234567891',
            role='companion'
        )
        self.companion.set_password('password123')
        db.session.add(self.companion)
        db.session.commit()
        
        self.companion_profile = CompanionProfile(
            user_id=self.companion.id,
            description='Test description',
            age=25,
            gender='female',
            location='Jakarta'
        )
        db.session.add(self.companion_profile)
        
        self.service = CompanionService(
            companion_profile_id=self.companion_profile.id,
            service_name='Test Service',
            description='Test service description',
            price_per_hour=100000,
            price_per_day=800000
        )
        db.session.add(self.service)
        db.session.commit()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
        
    def get_auth_token(self, email='test@example.com', password='password123'):
        response = self.client.post(
            '/api/auth/login',
            json={
                'email': email,
                'password': password
            }
        )
        return response.json['access_token']
        
    def test_user_registration(self):
        response = self.client.post(
            '/api/auth/register',
            json={
                'name': 'New User',
                'email': 'new@example.com',
                'phone': '081234567892',
                'password': 'password123',
                'role': 'user'
            }
        )
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'New User')
        
    def test_user_login(self):
        response = self.client.post(
            '/api/auth/login',
            json={
                'email': 'test@example.com',
                'password': 'password123'
            }
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('access_token', data)
        
    def test_get_companions(self):
        token = self.get_auth_token()
        response = self.client.get(
            '/api/companions',
            headers={'Authorization': f'Bearer {token}'}
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], 'Test Companion')
        
    def test_get_companion_detail(self):
        token = self.get_auth_token()
        response = self.client.get(
            f'/api/companions/{self.companion_profile.id}',
            headers={'Authorization': f'Bearer {token}'}
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Test Companion')
        self.assertEqual(len(data['services']), 1)
        
    def test_create_booking(self):
        token = self.get_auth_token()
        start_time = datetime.utcnow() + timedelta(days=1)
        end_time = start_time + timedelta(hours=2)
        
        response = self.client.post(
            '/api/bookings',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'companion_profile_id': self.companion_profile.id,
                'service_id': self.service.id,
                'start_time': start_time.isoformat(),
                'end_time': end_time.isoformat(),
                'notes': 'Test booking'
            }
        )
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'pending')
        self.assertEqual(data['total_price'], 200000)
        
    def test_get_bookings(self):
        token = self.get_auth_token()
        response = self.client.get(
            '/api/bookings',
            headers={'Authorization': f'Bearer {token}'}
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        
    def test_create_payment(self):
        # Create booking first
        token = self.get_auth_token()
        start_time = datetime.utcnow() + timedelta(days=1)
        end_time = start_time + timedelta(hours=2)
        
        booking_response = self.client.post(
            '/api/bookings',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'companion_profile_id': self.companion_profile.id,
                'service_id': self.service.id,
                'start_time': start_time.isoformat(),
                'end_time': end_time.isoformat()
            }
        )
        booking_data = json.loads(booking_response.data)
        
        # Create payment
        response = self.client.post(
            '/api/payments/create',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'booking_id': booking_data['id'],
                'payment_method': 'bank_transfer'
            }
        )
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertIn('payment_id', data)
        self.assertIn('payment_url', data)

if __name__ == '__main__':
    unittest.main() 