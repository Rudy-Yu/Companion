import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, Heart, Calendar, CheckCircle } from 'lucide-react';
import PlayfulButton from '@/components/ui/custom/playful-button';
import PlayfulCard from '@/components/ui/custom/playful-card';
import ServiceCard from '@/components/ui/custom/service-card';
import CompanionCard from '@/components/ui/custom/companion-card';
import { ROUTES, SERVICE_TYPES } from '@/lib/constants';

// Data dummy untuk kompanion populer
const POPULAR_COMPANIONS = [
  {
    id: 1,
    name: 'Anisa',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    serviceType: 'friend',
    price: 50000,
  },
  {
    id: 2,
    name: 'Budi',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    rating: 4,
    serviceType: 'lover',
    price: 75000,
  },
  {
    id: 3,
    name: 'Citra',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    serviceType: 'offline',
    price: 150000,
  },
  {
    id: 4,
    name: 'Deni',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    rating: 4,
    serviceType: 'friend',
    price: 60000,
  },
];

// Data dummy untuk testimoni
const TESTIMONIALS = [
  {
    id: 1,
    text: 'Layanan yang sangat membantu saat saya membutuhkan teman ngobrol. Kompanion sangat ramah dan menyenangkan!',
    name: 'Rina',
    role: 'Pengguna',
  },
  {
    id: 2,
    text: 'Kompanion sangat profesional dan menyenangkan. Saya merasa nyaman dan terhibur selama sesi offline date.',
    name: 'Andi',
    role: 'Pengguna',
  },
];

/**
 * HomePage - Halaman beranda
 * 
 * @returns {React.ReactElement}
 */
const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6366f1] to-[#ec4899] py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                Temukan Teman Virtual atau Offline Sesuai Kebutuhanmu
              </h1>
              <p className="mb-8 text-lg opacity-90">
                Layanan rental kompanion terpercaya untuk menemani aktivitasmu. Chat, telepon, video call, hingga offline date.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to={ROUTES.COMPANION_LIST}>
                  <PlayfulButton variant="secondary" size="lg" className="bg-white text-[#6366f1]">
                    Cari Kompanion
                  </PlayfulButton>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <PlayfulButton variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Daftar Sekarang
                  </PlayfulButton>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop" 
                alt="Friends having fun" 
                className="mx-auto rounded-xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto -mt-8 px-4">
        <PlayfulCard className="flex flex-col items-center justify-between gap-4 p-6 shadow-xl sm:flex-row">
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold">Cari Kompanion</h2>
            <p className="text-sm text-muted-foreground">Temukan kompanion yang sesuai dengan kebutuhanmu</p>
          </div>
          <div className="flex w-full flex-1 items-center gap-2 rounded-full border border-input bg-background px-4 py-2 sm:max-w-xs">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama atau layanan..." 
              className="flex-1 border-none bg-transparent text-sm outline-none" 
            />
          </div>
          <Link to={ROUTES.COMPANION_LIST}>
            <PlayfulButton variant="primary">
              Cari
            </PlayfulButton>
          </Link>
        </PlayfulCard>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Layanan Kami</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Kami menyediakan berbagai layanan kompanion untuk memenuhi kebutuhan Anda
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard 
              type="friend"
              title="Rent a Friend"
              description="Chat, telepon, atau video call dengan kompanion pilihan Anda"
              onViewDetails={() => {}}
            />
            <ServiceCard 
              type="lover"
              title="Rent a Lover"
              description="Chat romantis, good morning text, dan layanan romantis lainnya"
              onViewDetails={() => {}}
            />
            <ServiceCard 
              type="offline"
              title="Offline Date"
              description="Jadwalkan pertemuan offline dengan kompanion sesuai jadwal Anda"
              onViewDetails={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Popular Companions Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Kompanion Populer</h2>
              <p className="text-muted-foreground">
                Kompanion dengan rating tertinggi dan paling banyak dibooking
              </p>
            </div>
            <Link to={ROUTES.COMPANION_LIST}>
              <PlayfulButton variant="outline" className="flex items-center gap-2">
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </PlayfulButton>
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_COMPANIONS.map((companion) => (
              <CompanionCard 
                key={companion.id}
                name={companion.name}
                imageUrl={companion.imageUrl}
                rating={companion.rating}
                serviceType={companion.serviceType}
                price={companion.price}
                onViewProfile={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Cara Kerja</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Proses mudah untuk menggunakan layanan Rental Kompanion
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">1. Daftar</h3>
              <p className="text-sm text-muted-foreground">
                Buat akun dan lengkapi profil Anda
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">2. Pilih</h3>
              <p className="text-sm text-muted-foreground">
                Pilih kompanion dan layanan yang Anda inginkan
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">3. Bayar</h3>
              <p className="text-sm text-muted-foreground">
                Lakukan pembayaran untuk layanan yang dipilih
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">4. Nikmati</h3>
              <p className="text-sm text-muted-foreground">
                Mulai layanan dan nikmati waktu bersama kompanion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Testimoni</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Apa kata pengguna tentang layanan kami
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <PlayfulCard key={testimonial.id} className="flex flex-col">
                <p className="mb-6 italic text-muted-foreground">"{testimonial.text}"</p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </PlayfulCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PlayfulCard variant="gradient" className="flex flex-col items-center justify-between gap-8 p-12 text-center md:flex-row md:text-left">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Siap Untuk Mulai?</h2>
              <p className="text-white/90">
                Daftar sekarang dan temukan kompanion yang sesuai dengan kebutuhanmu
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to={ROUTES.REGISTER}>
                <PlayfulButton variant="secondary" size="lg" className="bg-white text-[#6366f1]">
                  Daftar Sekarang
                </PlayfulButton>
              </Link>
              <Link to={ROUTES.COMPANION_LIST}>
                <PlayfulButton variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Lihat Kompanion
                </PlayfulButton>
              </Link>
            </div>
          </PlayfulCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

