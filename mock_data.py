from src.models.database import db, User, CompanionProfile, CompanionService, Booking
import bcrypt
from datetime import datetime, timedelta

def create_mock_data():
    """Membuat data mock untuk testing"""
    
    # Hapus data lama jika ada
    db.drop_all()
    db.create_all()
    
    # Hash password untuk semua user
    password_hash = bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # 1. Buat Admin User
    admin_user = User(
        name='Admin Rental Kompanion',
        email='admin@rentalkompanion.com',
        phone='081234567890',
        password_hash=password_hash,
        role='admin',
        is_verified=True
    )
    db.session.add(admin_user)
    
    # 2. Buat Regular Users
    users_data = [
        {
            'name': 'Andi Pratama',
            'email': 'andi@example.com',
            'phone': '081234567891',
            'role': 'user'
        },
        {
            'name': 'Sari Dewi',
            'email': 'sari@example.com',
            'phone': '081234567892',
            'role': 'user'
        },
        {
            'name': 'Budi Santoso',
            'email': 'budi@example.com',
            'phone': '081234567893',
            'role': 'user'
        }
    ]
    
    regular_users = []
    for user_data in users_data:
        user = User(
            name=user_data['name'],
            email=user_data['email'],
            phone=user_data['phone'],
            password_hash=password_hash,
            role=user_data['role'],
            is_verified=True
        )
        db.session.add(user)
        regular_users.append(user)
    
    # 3. Buat Companion Users
    companions_data = [
        {
            'name': 'Anisa Putri',
            'email': 'anisa@example.com',
            'phone': '081234567894',
            'display_name': 'Anisa',
            'age': 23,
            'gender': 'female',
            'location': 'Jakarta',
            'description': 'Suka ngobrol dan mendengarkan cerita. Berpengalaman dalam memberikan dukungan emosional.',
            'hourly_rate': 50000,
            'rating': 4.8
        },
        {
            'name': 'Budi Hermawan',
            'email': 'budih@example.com',
            'phone': '081234567895',
            'display_name': 'Budi',
            'age': 25,
            'gender': 'male',
            'location': 'Bandung',
            'description': 'Companion yang fun dan energik. Cocok untuk aktivitas outdoor dan ngobrol santai.',
            'hourly_rate': 60000,
            'rating': 4.5
        },
        {
            'name': 'Citra Maharani',
            'email': 'citra@example.com',
            'phone': '081234567896',
            'display_name': 'Citra',
            'age': 24,
            'gender': 'female',
            'location': 'Surabaya',
            'description': 'Berpengalaman dalam memberikan layanan romantis dan perhatian khusus.',
            'hourly_rate': 75000,
            'rating': 4.9
        },
        {
            'name': 'Deni Kurniawan',
            'email': 'deni@example.com',
            'phone': '081234567897',
            'display_name': 'Deni',
            'age': 26,
            'gender': 'male',
            'location': 'Yogyakarta',
            'description': 'Companion yang sabar dan pengertian. Cocok untuk offline date dan aktivitas bersama.',
            'hourly_rate': 80000,
            'rating': 4.7
        },
        {
            'name': 'Eka Sari',
            'email': 'eka@example.com',
            'phone': '081234567898',
            'display_name': 'Eka',
            'age': 22,
            'gender': 'female',
            'location': 'Medan',
            'description': 'Companion yang ceria dan mudah bergaul. Suka berbagi cerita dan pengalaman.',
            'hourly_rate': 55000,
            'rating': 4.6
        }
    ]
    
    companion_users = []
    companion_profiles = []
    
    for comp_data in companions_data:
        # Buat user companion
        user = User(
            name=comp_data['name'],
            email=comp_data['email'],
            phone=comp_data['phone'],
            password_hash=password_hash,
            role='companion',
            is_verified=True
        )
        db.session.add(user)
        companion_users.append(user)
        
        # Buat companion profile
        companion = CompanionProfile(
            user=user,
            display_name=comp_data['display_name'],
            age=comp_data['age'],
            gender=comp_data['gender'],
            location=comp_data['location'],
            description=comp_data['description'],
            hourly_rate=comp_data['hourly_rate'],
            rating=comp_data['rating'],
            total_bookings=10,  # Mock total bookings
            is_available=True,
            verification_status='verified'
        )
        db.session.add(companion)
        companion_profiles.append(companion)
    
    # Commit users dan companions dulu
    db.session.commit()
    
    # 4. Buat Services untuk setiap companion
    services_template = [
        # Friend services
        {'service_type': 'friend', 'service_name': 'Chat', 'price_per_hour': 30000},
        {'service_type': 'friend', 'service_name': 'Voice Call', 'price_per_hour': 50000},
        {'service_type': 'friend', 'service_name': 'Video Call', 'price_per_hour': 70000},
        
        # Lover services
        {'service_type': 'lover', 'service_name': 'Chat Romantis', 'price_per_hour': 50000},
        {'service_type': 'lover', 'service_name': 'Good Morning Text', 'price_per_day': 20000},
        {'service_type': 'lover', 'service_name': 'Video Call Romantis', 'price_per_hour': 80000},
        
        # Offline services
        {'service_type': 'offline', 'service_name': 'Offline Date', 'price_per_hour': 150000},
        {'service_type': 'offline', 'service_name': 'Event Companion', 'price_per_hour': 200000},
    ]
    
    for companion in companion_profiles:
        # Setiap companion memiliki beberapa services (tidak semua)
        if companion.display_name in ['Anisa', 'Eka']:
            # Friend-focused companions
            selected_services = [s for s in services_template if s['service_type'] in ['friend', 'lover']]
        elif companion.display_name in ['Citra']:
            # Lover-focused companion
            selected_services = [s for s in services_template if s['service_type'] in ['lover', 'offline']]
        else:
            # All-around companions
            selected_services = services_template
        
        for service_data in selected_services:
            service = CompanionService(
                companion_id=companion.id,
                service_type=service_data['service_type'],
                service_name=service_data['service_name'],
                price_per_hour=service_data.get('price_per_hour'),
                price_per_day=service_data.get('price_per_day'),
                is_available=True,
                description=f"Layanan {service_data['service_name']} dari {companion.display_name}"
            )
            db.session.add(service)
    
    # 5. Buat beberapa sample bookings
    sample_bookings = [
        {
            'user_id': regular_users[0].id,
            'companion_id': companion_profiles[0].id,
            'service_id': 1,  # Will be updated after services are created
            'booking_date': datetime.utcnow() + timedelta(days=1),
            'duration_hours': 2,
            'total_price': 100000,
            'status': 'confirmed',
            'payment_status': 'paid',
            'notes': 'Looking forward to our chat session!'
        },
        {
            'user_id': regular_users[1].id,
            'companion_id': companion_profiles[1].id,
            'service_id': 2,
            'booking_date': datetime.utcnow() + timedelta(days=2),
            'duration_hours': 3,
            'total_price': 180000,
            'status': 'pending',
            'payment_status': 'pending',
            'notes': 'Excited for the video call!'
        }
    ]
    
    # Commit services dulu
    db.session.commit()
    
    # Update service_id dengan ID yang benar
    services = CompanionService.query.all()
    for i, booking_data in enumerate(sample_bookings):
        if i < len(services):
            booking_data['service_id'] = services[i].id
        
        booking = Booking(
            user_id=booking_data['user_id'],
            companion_id=booking_data['companion_id'],
            service_id=booking_data['service_id'],
            booking_date=booking_data['booking_date'],
            duration_hours=booking_data['duration_hours'],
            total_price=booking_data['total_price'],
            status=booking_data['status'],
            payment_status=booking_data['payment_status'],
            notes=booking_data['notes']
        )
        db.session.add(booking)
    
    # Final commit
    db.session.commit()
    
    print("Mock data created successfully!")
    print(f"Created {len(regular_users) + len(companion_users) + 1} users")
    print(f"Created {len(companion_profiles)} companions")
    print(f"Created {len(services)} services")
    print(f"Created {len(sample_bookings)} bookings")
    
    return {
        'admin_user': admin_user,
        'regular_users': regular_users,
        'companion_users': companion_users,
        'companion_profiles': companion_profiles,
        'services': services,
        'bookings': sample_bookings
    }

