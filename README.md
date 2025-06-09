# Rental Kompanion

Aplikasi web untuk menyewa teman (companion) dengan berbagai layanan seperti chat, telepon, video call, dan offline date.

## Fitur Utama

- Autentikasi pengguna (register, login, logout)
- Manajemen profil pengguna dan companion
- Pencarian dan filter companion
- Booking layanan companion
- Sistem pembayaran
- Dashboard admin

## Teknologi yang Digunakan

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Python
- Flask
- SQLAlchemy
- JWT Authentication
- MySQL

## Cara Menjalankan Proyek

### Prasyarat
- Node.js (v14 atau lebih baru)
- Python (v3.8 atau lebih baru)
- MySQL (XAMPP)

### Backend Setup
1. Buat virtual environment Python:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Buat database MySQL:
   ```sql
   CREATE DATABASE mydb;
   ```

4. Jalankan backend:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

## Struktur Proyek

```
companion/
├── src/                    # Frontend source code
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   └── config/            # Configuration files
├── static/                # Static files
├── main.py               # Backend entry point
├── requirements.txt      # Python dependencies
└── package.json         # Node.js dependencies
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user baru
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get profil user saat ini
- POST `/api/auth/logout` - Logout user

### User
- GET `/api/users/profile` - Get profil user
- PUT `/api/users/profile` - Update profil user

### Companion
- GET `/api/companions` - Get daftar companion
- GET `/api/companions/:id` - Get detail companion
- GET `/api/companions/:id/services` - Get layanan companion

### Booking
- POST `/api/bookings` - Buat booking baru
- GET `/api/bookings` - Get daftar booking
- GET `/api/bookings/:id` - Get detail booking

## Kontribusi

1. Fork proyek ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## Kontak

Rudy Yu - [@rudyyu](https://github.com/Rudy-Yu)

Link Proyek: [https://github.com/Rudy-Yu/Companion](https://github.com/Rudy-Yu/Companion) 