import PlayfulButton from './PlayfulButton'

function ProfileInfo({ user, onEdit }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user.photo || 'https://via.placeholder.com/150'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <button
            onClick={() => onEdit('photo')}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Informasi Dasar</h3>
          <PlayfulButton
            variant="outline"
            size="small"
            onClick={() => onEdit('basic')}
          >
            Edit
          </PlayfulButton>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Nama Lengkap</label>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Nomor Telepon</label>
            <p className="font-medium">{user.phone || '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tentang Saya</h3>
          <PlayfulButton
            variant="outline"
            size="small"
            onClick={() => onEdit('about')}
          >
            Edit
          </PlayfulButton>
        </div>
        <p className="text-gray-700">{user.about || 'Belum ada deskripsi'}</p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Preferensi</h3>
          <PlayfulButton
            variant="outline"
            size="small"
            onClick={() => onEdit('preferences')}
          >
            Edit
          </PlayfulButton>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Jenis Kompanion</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.preferences?.companionTypes?.map((type, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Jenis Layanan</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.preferences?.serviceTypes?.map((type, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Verifikasi</h3>
          {!user.isVerified && (
            <PlayfulButton
              variant="primary"
              size="small"
              onClick={() => onEdit('verification')}
            >
              Verifikasi Sekarang
            </PlayfulButton>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span className="font-medium">
            {user.isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Level Pengguna</h3>
          <PlayfulButton
            variant="outline"
            size="small"
            onClick={() => onEdit('level')}
          >
            Info Level
          </PlayfulButton>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Level {user.level}</span>
            <span className="text-sm text-gray-600">
              {user.points} / {user.nextLevelPoints} poin
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(user.points / user.nextLevelPoints) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo 