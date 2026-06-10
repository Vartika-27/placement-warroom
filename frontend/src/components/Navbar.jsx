import { Link } from "react-router-dom"

function Navbar() {

  return (
    <nav className="flex items-center justify-between bg-gray-800 px-8 py-4 rounded-xl">

      <h1 className="text-2xl font-bold text-blue-400">
        War-Room
      </h1>

      <div className="flex gap-6 text-gray-300">

        <Link
          to="/"
          className="hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/team"
          className="hover:text-white"
        >
          Team
        </Link>

        <Link
          to="/profile"
          className="hover:text-white"
        >
          Profile
        </Link>

      </div>

    </nav>
  )
}

export default Navbar