import unittest
from datetime import datetime, timedelta
from src.models.database import db, User, CompanionProfile, CompanionService, Booking, Payment
from src import create_app

class TestModels(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
        
    def test_user_creation(self):
        user = User(
            name='Test User',
            email='test@example.com',
            phone='081234567890',
            role='user'
        )
        user.set_password('password123')
        db.session.add(user)
        db.session.commit()
        
        self.assertIsNotNone(user.id)
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('password123'))
        
    def test_companion_profile_creation(self):
        user = User(
            name='Test Companion',
            email='companion@example.com',
            phone='081234567891',
            role='companion'
        )
        user.set_password('password123')
        db.session.add(user)
        db.session.commit()
        
        profile = CompanionProfile(
            user_id=user.id,
            description='Test description',
            age=25,
            gender='female',
            location='Jakarta',
            rating=4.5,
            verification_status='pending'
        )
        db.session.add(profile)
        db.session.commit()
        
        self.assertIsNotNone(profile.id)
        self.assertEqual(profile.user_id, user.id)
        self.assertEqual(profile.rating, 4.5)
        
    def test_booking_creation(self):
        # Create user
        user = User(
            name='Test User',
            email='test@example.com',
            phone='081234567890',
            role='user'
        )
        user.set_password('password123')
        db.session.add(user)
        
        # Create companion
        companion = User(
            name='Test Companion',
            email='companion@example.com',
            phone='081234567891',
            role='companion'
        )
        companion.set_password('password123')
        db.session.add(companion)
        db.session.commit()
        
        profile = CompanionProfile(
            user_id=companion.id,
            description='Test description',
            age=25,
            gender='female',
            location='Jakarta'
        )
        db.session.add(profile)
        
        # Create service
        service = CompanionService(
            companion_profile_id=profile.id,
            service_name='Test Service',
            description='Test service description',
            price_per_hour=100000,
            price_per_day=800000
        )
        db.session.add(service)
        db.session.commit()
        
        # Create booking
        start_time = datetime.utcnow()
        end_time = start_time + timedelta(hours=2)
        booking = Booking(
            user_id=user.id,
            companion_profile_id=profile.id,
            service_id=service.id,
            start_time=start_time,
            end_time=end_time,
            total_price=200000,
            status='pending'
        )
        db.session.add(booking)
        db.session.commit()
        
        self.assertIsNotNone(booking.id)
        self.assertEqual(booking.user_id, user.id)
        self.assertEqual(booking.companion_profile_id, profile.id)
        self.assertEqual(booking.total_price, 200000)
        
    def test_payment_creation(self):
        # Create booking first
        user = User(
            name='Test User',
            email='test@example.com',
            phone='081234567890',
            role='user'
        )
        user.set_password('password123')
        db.session.add(user)
        
        companion = User(
            name='Test Companion',
            email='companion@example.com',
            phone='081234567891',
            role='companion'
        )
        companion.set_password('password123')
        db.session.add(companion)
        db.session.commit()
        
        profile = CompanionProfile(
            user_id=companion.id,
            description='Test description',
            age=25,
            gender='female',
            location='Jakarta'
        )
        db.session.add(profile)
        
        service = CompanionService(
            companion_profile_id=profile.id,
            service_name='Test Service',
            description='Test service description',
            price_per_hour=100000,
            price_per_day=800000
        )
        db.session.add(service)
        db.session.commit()
        
        start_time = datetime.utcnow()
        end_time = start_time + timedelta(hours=2)
        booking = Booking(
            user_id=user.id,
            companion_profile_id=profile.id,
            service_id=service.id,
            start_time=start_time,
            end_time=end_time,
            total_price=200000,
            status='pending'
        )
        db.session.add(booking)
        db.session.commit()
        
        # Create payment
        payment = Payment(
            booking_id=booking.id,
            amount=200000,
            payment_method='bank_transfer',
            transaction_id='TEST-123',
            status='pending',
            payment_url='https://example.com/pay'
        )
        db.session.add(payment)
        db.session.commit()
        
        self.assertIsNotNone(payment.id)
        self.assertEqual(payment.booking_id, booking.id)
        self.assertEqual(payment.amount, 200000)
        self.assertEqual(payment.status, 'pending')

if __name__ == '__main__':
    unittest.main() 