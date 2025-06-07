import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Rental Kompanion
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 