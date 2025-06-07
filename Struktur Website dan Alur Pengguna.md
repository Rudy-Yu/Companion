# Struktur Website dan Alur Pengguna

## Struktur Website

### 1. Halaman Publik
- **Beranda (Homepage)**
  - Landing page dengan penjelasan layanan
  - Call-to-action untuk sign up/login
  - Showcase kompanion populer
  - Testimoni pengguna

- **Tentang Kami**
  - Informasi tentang platform
  - Cara kerja
  - FAQ

- **Daftar Kompanion**
  - Katalog kompanion dengan filter
  - Profil singkat dan rating

- **Halaman Detail Kompanion**
  - Foto dan informasi lengkap
  - Layanan yang ditawarkan
  - Harga
  - Rating dan ulasan
  - Tombol booking

- **Halaman Pendaftaran/Login**
  - Form pendaftaran pengguna
  - Form pendaftaran kompanion
  - Login

### 2. Area Pengguna (User)
- **Dashboard Pengguna**
  - Ringkasan aktivitas
  - Booking yang aktif
  - Riwayat booking

- **Profil Pengguna**
  - Informasi pribadi
  - Foto profil
  - Preferensi

- **Halaman Booking**
  - Form pemilihan kompanion
  - Form pemilihan layanan
  - Form detail booking
  - Kalkulasi harga
  - Pembayaran

- **Riwayat Transaksi**
  - Daftar transaksi
  - Status pembayaran
  - Detail booking

- **Pesan/Chat**
  - Komunikasi dengan kompanion setelah booking

### 3. Area Kompanion
- **Dashboard Kompanion**
  - Ringkasan aktivitas
  - Booking yang masuk
  - Jadwal booking

- **Profil Kompanion**
  - Informasi pribadi
  - Foto profil
  - Layanan yang ditawarkan
  - Harga
  - Jadwal ketersediaan

- **Manajemen Booking**
  - Daftar booking masuk
  - Konfirmasi/tolak booking
  - Jadwal booking yang dikonfirmasi

- **Riwayat Transaksi**
  - Daftar transaksi
  - Status pembayaran
  - Komisi

### 4. Area Admin
- **Dashboard Admin**
  - Ringkasan aktivitas platform
  - Statistik pengguna dan kompanion
  - Transaksi terbaru

- **Manajemen Pengguna**
  - Daftar pengguna
  - Verifikasi pengguna
  - Blokir/aktifkan pengguna

- **Manajemen Kompanion**
  - Daftar kompanion
  - Verifikasi kompanion
  - Blokir/aktifkan kompanion

- **Manajemen Transaksi**
  - Daftar semua transaksi
  - Status pembayaran
  - Pembatalan dan refund

- **Pengaturan Sistem**
  - Konfigurasi komisi
  - Pengaturan level
  - Integrasi WhatsApp

## Alur Pengguna (User Flow)

### 1. Alur Pendaftaran Pengguna
1. Kunjungi homepage
2. Klik "Daftar sebagai Pengguna"
3. Isi formulir pendaftaran
4. Verifikasi email
5. Login
6. Lengkapi profil
7. Verifikasi ID dan foto selfie

### 2. Alur Pendaftaran Kompanion
1. Kunjungi homepage
2. Klik "Daftar sebagai Kompanion"
3. Isi formulir pendaftaran
4. Verifikasi email
5. Login
6. Lengkapi profil detail
7. Tambahkan layanan dan harga
8. Verifikasi ID dan foto selfie
9. Menunggu persetujuan admin

### 3. Alur Booking Layanan
1. Login sebagai pengguna
2. Cari kompanion (browse atau filter)
3. Pilih kompanion
4. Lihat profil dan layanan
5. Pilih layanan yang diinginkan
6. Pilih jadwal (untuk offline date)
7. Isi form booking
8. Lihat kalkulasi harga
9. Lakukan pembayaran
10. Terima konfirmasi booking
11. Terima notifikasi WhatsApp
12. Terima kontak kompanion setelah pembayaran

### 4. Alur Penerimaan Booking (Kompanion)
1. Login sebagai kompanion
2. Terima notifikasi booking via WhatsApp
3. Lihat detail booking di dashboard
4. Konfirmasi booking
5. Terima kontak pengguna
6. Lakukan layanan sesuai booking
7. Booking selesai
8. Terima komisi (dikurangi potongan platform)

### 5. Alur Admin
1. Login sebagai admin
2. Verifikasi pendaftaran kompanion baru
3. Monitor transaksi
4. Kelola level pengguna dan kompanion
5. Kelola komisi
6. Tangani masalah atau keluhan

