function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rental Kompanion</h3>
            <p className="text-gray-300">
              Platform untuk menyewa teman virtual atau offline sesuai kebutuhanmu
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Chat Virtual</li>
              <li>Video Call</li>
              <li>Offline Date</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@rentalkompanion.com</li>
              <li>Telepon: (021) 1234-5678</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Rental Kompanion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 