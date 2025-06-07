import { Link } from 'react-router-dom'

function CompanionCard({ companion }) {
  const {
    id,
    name,
    photo,
    rating,
    reviewCount,
    services,
    price,
    isOnline,
    location
  } = companion

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isOnline && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Online
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center">
            {renderStars(rating)}
            <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">{location}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {services.map((service, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-blue-600">
            Rp{price.toLocaleString()}/jam
          </div>
          <Link
            to={`/companion/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Lihat Profil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompanionCard 