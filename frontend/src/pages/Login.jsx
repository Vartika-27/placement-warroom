function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-10 rounded-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-gray-700 mb-4 outline-none text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-gray-700 mb-6 outline-none text-white"
        />

        <button
          className="w-full bg-blue-500 py-4 rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login