# Panduan Deployment Frontend ke GitHub Pages

Dokumen ini berisi panduan lengkap untuk mendeploy aplikasi frontend Rental Kompanion ke GitHub Pages.

## Daftar Isi
1. [Persiapan](#persiapan)
2. [Konfigurasi Project](#konfigurasi-project)
3. [Setup GitHub Pages](#setup-github-pages)
4. [Deployment](#deployment)
5. [Troubleshooting](#troubleshooting)
6. [Custom Domain](#custom-domain)

## Persiapan

### 1. Prasyarat
- Akun GitHub
- Node.js dan npm terinstall
- Repository GitHub yang sudah ada
- Akses ke repository

### 2. File yang Diperlukan
- `package.json`
- `vite.config.js`
- `.env.production`
- `index.html`

## Konfigurasi Project

### 1. Update package.json
```json
{
  "name": "rental-kompanion",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://rudy-yu.github.io/Companion",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 2. Install Dependencies
```bash
npm install --save-dev gh-pages
```

### 3. Konfigurasi Vite (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Companion/',
})
```

### 4. Environment Variables (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Setup GitHub Pages

### 1. Repository Settings
1. Buka repository di GitHub
2. Klik "Settings"
3. Scroll ke bagian "GitHub Pages"
4. Di "Source", pilih branch "gh-pages"
5. Klik "Save"

### 2. Branch Protection (Opsional)
1. Di "Settings" > "Branches"
2. Klik "Add rule"
3. Masukkan "gh-pages"
4. Aktifkan "Require pull request reviews"
5. Klik "Create"

## Deployment

### 1. Build dan Deploy
```bash
# Build project
npm run build

# Deploy ke GitHub Pages
npm run deploy
```

### 2. Verifikasi Deployment
1. Tunggu beberapa menit
2. Buka https://rudy-yu.github.io/Companion
3. Periksa semua fitur berfungsi

## Troubleshooting

### 1. Common Issues

#### CORS Error
```javascript
// Backend (Flask)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://rudy-yu.github.io"
        ]
    }
})
```

#### Routing Issues
```javascript
// App.jsx atau router configuration
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/Companion">
      {/* Your routes */}
    </Router>
  );
}
```

#### 404 on Refresh
Tambahkan file `404.html` di folder `public`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Rental Kompanion</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

### 2. Build Errors
1. Periksa console untuk error
2. Pastikan semua dependencies terinstall
3. Hapus folder `node_modules` dan `package-lock.json`
4. Jalankan `npm install` ulang

## Custom Domain

### 1. Setup Domain
1. Beli domain dari provider (Namecheap, GoDaddy, dll)
2. Tambahkan file `CNAME` di folder `public`:
```
your-domain.com
```

### 2. DNS Configuration
1. Di provider domain, tambahkan records:
   - Type: A
   - Name: @
   - Value: 185.199.108.153
   - Value: 185.199.109.153
   - Value: 185.199.110.153
   - Value: 185.199.111.153

2. Tambahkan CNAME record:
   - Type: CNAME
   - Name: www
   - Value: your-username.github.io

### 3. Update Configuration
1. Update `homepage` di `package.json`:
```json
{
  "homepage": "https://your-domain.com"
}
```

2. Update `base` di `vite.config.js`:
```javascript
export default defineConfig({
  base: '/',
})
```

## Maintenance

### 1. Regular Updates
1. Update dependencies secara berkala
2. Periksa security vulnerabilities
3. Backup environment variables

### 2. Monitoring
1. Gunakan GitHub Actions untuk CI/CD
2. Setup error tracking (Sentry, dll)
3. Monitor performance

## Kontak

Jika mengalami masalah:
- Buat issue di repository
- Hubungi maintainer
- Cek dokumentasi GitHub Pages

## Referensi
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/) 