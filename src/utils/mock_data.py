from datetime import datetime, timedelta
from src.models.database import db, User, CompanionProfile, CompanionService, Booking, Payment

def create_mock_data():
    # Create admin user
    admin = User(
        name='Admin User',
        email='admin@example.com',
        phone='081234567890',
        role='admin'
    )
    admin.set_password('admin123')
    db.session.add(admin)
    
    # Create regular users
    users = []
    for i in range(5):
        user = User(
            name=f'User {i+1}',
            email=f'user{i+1}@example.com',
            phone=f'08123456789{i+1}',
            role='user'
        )
        user.set_password('password123')
        users.append(user)
        db.session.add(user)
    
    # Create companions
    companions = []
    companion_data = [
        {
            'name': 'Sarah Johnson',
            'email': 'sarah@example.com',
            'phone': '081234567901',
            'description': 'Professional companion with 5 years of experience',
            'age': 28,
            'gender': 'female',
            'location': 'Jakarta',
            'rating': 4.8
        },
        {
            'name': 'Michael Chen',
            'email': 'michael@example.com',
            'phone': '081234567902',
            'description': 'Friendly and outgoing companion',
            'age': 25,
            'gender': 'male',
            'location': 'Bandung',
            'rating': 4.6
        },
        {
            'name': 'Lisa Wong',
            'email': 'lisa@example.com',
            'phone': '081234567903',
            'description': 'Experienced companion for business events',
            'age': 30,
            'gender': 'female',
            'location': 'Surabaya',
            'rating': 4.9
        }
    ]
    
    for data in companion_data:
        companion = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            role='companion'
        )
        companion.set_password('password123')
        companions.append(companion)
        db.session.add(companion)
    
    db.session.commit()
    
    # Create companion profiles
    for i, companion in enumerate(companions):
        profile = CompanionProfile(
            user_id=companion.id,
            description=companion_data[i]['description'],
            age=companion_data[i]['age'],
            gender=companion_data[i]['gender'],
            location=companion_data[i]['location'],
            rating=companion_data[i]['rating'],
            verification_status='verified'
        )
        db.session.add(profile)
        
        # Create services for each companion
        services = [
            {
                'name': 'Business Event Companion',
                'description': 'Professional companion for business events and meetings',
                'price_per_hour': 150000,
                'price_per_day': 1200000
            },
            {
                'name': 'Social Event Companion',
                'description': 'Friendly companion for social gatherings and parties',
                'price_per_hour': 120000,
                'price_per_day': 1000000
            },
            {
                'name': 'Travel Companion',
                'description': 'Companion for travel and sightseeing',
                'price_per_hour': 200000,
                'price_per_day': 1500000
            }
        ]
        
        for service_data in services:
            service = CompanionService(
                companion_profile_id=profile.id,
                service_name=service_data['name'],
                description=service_data['description'],
                price_per_hour=service_data['price_per_hour'],
                price_per_day=service_data['price_per_day']
            )
            db.session.add(service)
    
    db.session.commit()
    
    # Create some bookings
    for user in users[:3]:  # Use first 3 users
        for companion in companions[:2]:  # Use first 2 companions
            profile = CompanionProfile.query.filter_by(user_id=companion.id).first()
            service = CompanionService.query.filter_by(companion_profile_id=profile.id).first()
            
            # Create past booking
            start_time = datetime.utcnow() - timedelta(days=7)
            end_time = start_time + timedelta(hours=3)
            booking = Booking(
                user_id=user.id,
                companion_profile_id=profile.id,
                service_id=service.id,
                start_time=start_time,
                end_time=end_time,
                total_price=service.price_per_hour * 3,
                status='completed',
                notes='Great experience!'
            )
            db.session.add(booking)
            
            # Create payment for past booking
            payment = Payment(
                booking_id=booking.id,
                amount=booking.total_price,
                payment_method='bank_transfer',
                transaction_id=f'PAST-{booking.id}',
                status='settlement',
                payment_time=start_time - timedelta(hours=1)
            )
            db.session.add(payment)
            
            # Create future booking
            start_time = datetime.utcnow() + timedelta(days=7)
            end_time = start_time + timedelta(hours=4)
            booking = Booking(
                user_id=user.id,
                companion_profile_id=profile.id,
                service_id=service.id,
                start_time=start_time,
                end_time=end_time,
                total_price=service.price_per_hour * 4,
                status='pending',
                notes='Looking forward to it!'
            )
            db.session.add(booking)
    
    db.session.commit()
    
    return {
        'admin': admin,
        'users': users,
        'companions': companions
    } 