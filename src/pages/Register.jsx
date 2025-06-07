function Register() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Daftar</h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Masukkan password Anda"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border rounded"
              placeholder="Konfirmasi password Anda"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register 