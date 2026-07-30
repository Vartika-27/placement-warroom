import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login");

  };


  return (

    <nav className="w-full bg-slate-900 p-5 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-400">
        Placement War-Room
      </h1>


      <button
        onClick={handleLogout}
        className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600"
      >
        Logout
      </button>


    </nav>

  );
}


export default Navbar;