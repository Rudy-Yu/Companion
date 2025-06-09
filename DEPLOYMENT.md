# Panduan Deployment Rental Kompanion

Dokumen ini berisi panduan lengkap untuk mendeploy aplikasi Rental Kompanion ke lingkungan produksi.

## Daftar Isi
1. [Persiapan](#persiapan)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

## Persiapan

### 1. File yang Diperlukan

#### Backend
- `requirements.txt`
- `Procfile`
- `.env.example`
- `gunicorn` (untuk production server)

#### Frontend
- `.env.example`
- `vercel.json` (opsional)

### 2. Update Kode

#### Backend (`main.py`)
```python
import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-frontend-domain.vercel.app"
        ]
    }
})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

#### Frontend (`src/config/api.js`)
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default API_URL;
```

## Backend Deployment

### 1. Render.com

1. Buat akun di [Render](https://render.com)
2. Connect dengan repository GitHub
3. Pilih "New Web Service"
4. Pilih repository
5. Konfigurasi:
   - Name: `rental-kompanion-api`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn main:app`
6. Set Environment Variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FLASK_ENV=production`

### 2. Railway.app

1. Buat akun di [Railway](https://railway.app)
2. Connect dengan repository GitHub
3. Pilih "New Project"
4. Pilih "Deploy from GitHub repo"
5. Konfigurasi:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn main:app`
6. Set Environment Variables

## Frontend Deployment

### 1. Vercel

1. Buat akun di [Vercel](https://vercel.com)
2. Connect dengan repository GitHub
3. Konfigurasi:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Set Environment Variables:
   - `REACT_APP_API_URL`

### 2. Netlify

1. Buat akun di [Netlify](https://netlify.com)
2. Connect dengan repository GitHub
3. Konfigurasi:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Set Environment Variables

## Database Setup

### 1. PlanetScale

1. Buat akun di [PlanetScale](https://planetscale.com)
2. Buat database baru
3. Dapatkan connection string
4. Update `DATABASE_URL` di environment variables

### 2. Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Dapatkan connection string
4. Update `DATABASE_URL` di environment variables

## Environment Variables

### Backend (.env)
```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key
FLASK_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Common Issues

1. **CORS Error**
   - Pastikan domain frontend sudah ditambahkan di CORS configuration
   - Periksa protocol (http/https)

2. **Database Connection**
   - Periksa connection string
   - Pastikan database server mengizinkan koneksi dari IP hosting

3. **Environment Variables**
   - Pastikan semua environment variables sudah diset
   - Periksa nama variable (case sensitive)

4. **Build Error**
   - Periksa `requirements.txt`
   - Periksa versi Python
   - Periksa log build

### Monitoring

1. **Backend**
   - Render Dashboard
   - Railway Dashboard
   - Log monitoring

2. **Frontend**
   - Vercel Analytics
   - Netlify Analytics
   - Error tracking

## Maintenance

### Regular Tasks

1. **Security Updates**
   - Update dependencies
   - Rotate secrets
   - Monitor security alerts

2. **Performance**
   - Monitor response times
   - Optimize database queries
   - Cache frequently accessed data

3. **Backup**
   - Regular database backups
   - Backup environment variables
   - Document configuration changes

## Support

Jika mengalami masalah, silakan:
1. Periksa log di dashboard hosting
2. Periksa dokumentasi platform
3. Hubungi support platform
4. Buat issue di repository GitHub

## Kontak

- Rudy Yu (rudyyu@zuvana.com)
- GitHub: [Rudy-Yu](https://github.com/Rudy-Yu)
- Repository: [rental-kompanion](https://github.com/Rudy-Yu/Companion) 