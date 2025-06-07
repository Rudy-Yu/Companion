import ServiceCard from '../components/ServiceCard'
import CompanionCard from '../components/CompanionCard'
import PlayfulButton from '../components/PlayfulButton'
import PlayfulCard from '../components/PlayfulCard'

// Temporary data for demonstration
const services = [
  {
    title: 'Rent a Friend',
    description: 'Temukan teman virtual untuk berbagi cerita dan pengalaman',
    features: ['Chat', 'Call', 'Video Call'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    link: '/services/friend'
  },
  {
    title: 'Rent a Lover',
    description: 'Nikmati pengalaman romantis virtual dengan pasangan virtual',
    features: ['Chat Romantis', 'Good Morning Text', 'Video Call'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    link: '/services/lover'
  },
  {
    title: 'Offline Date',
    description: 'Jadwalkan pertemuan offline dengan kompanion pilihanmu',
    features: ['Jadwal Fleksibel', 'Lokasi Pilihan', 'Aktivitas Menarik'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: '/services/offline'
  }
]

const popularCompanions = [
  {
    id: 1,
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    reviewCount: 128,
    services: ['Friend', 'Lover'],
    price: 75000,
    isOnline: true,
    location: 'Jakarta'
  },
  {
    id: 2,
    name: 'Mike Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    reviewCount: 95,
    services: ['Friend', 'Offline'],
    price: 100000,
    isOnline: false,
    location: 'Bandung'
  },
  {
    id: 3,
    name: 'Lisa Wong',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.7,
    reviewCount: 156,
    services: ['Lover', 'Offline'],
    price: 85000,
    isOnline: true,
    location: 'Surabaya'
  }
]

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Temukan Teman Virtual atau Offline Sesuai Kebutuhanmu
            </h1>
            <p className="text-xl mb-8">
              Platform untuk menyewa teman virtual atau offline dengan berbagai layanan menarik
            </p>
            <PlayfulButton
              size="large"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-500"
            >
              Cari Kompanion
            </PlayfulButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Companions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kompanion Populer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCompanions.map((companion) => (
              <CompanionCard key={companion.id} companion={companion} />
            ))}
          </div>
          <div className="text-center mt-12">
            <PlayfulButton variant="outline">
              Lihat Semua Kompanion
            </PlayfulButton>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cara Kerja</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: '1. Daftar',
                description: 'Buat akun dan lengkapi profil Anda'
              },
              {
                title: '2. Pilih',
                description: 'Pilih kompanion & layanan yang diinginkan'
              },
              {
                title: '3. Bayar',
                description: 'Lakukan pembayaran dengan aman'
              },
              {
                title: '4. Nikmati',
                description: 'Mulai layanan sesuai kebutuhan'
              }
            ].map((step, index) => (
              <PlayfulCard key={index} variant="gradient">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </PlayfulCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimoni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                text: 'Layanan yang sangat membantu saat saya membutuhkan teman ngobrol...',
                author: 'Sarah Johnson'
              },
              {
                text: 'Kompanion sangat profesional dan menyenangkan...',
                author: 'Mike Chen'
              }
            ].map((testimonial, index) => (
              <PlayfulCard key={index} variant="bordered">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.author}</p>
              </PlayfulCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 