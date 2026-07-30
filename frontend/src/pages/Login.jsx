import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration Successful!");

      setUsername("");
      setEmail("");
      setPassword("");

      setIsLogin(true);

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Registration failed."
      );
    }
  };

  const loginUser = async () => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      login(response.data.token);

      navigate("/");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Login failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-800 p-10 rounded-2xl w-[420px]">

        <h1 className="text-4xl font-bold text-blue-400 text-center mb-8">
          Placement War-Room
        </h1>

        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 rounded-xl bg-slate-700 mb-4 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-slate-700 mb-4 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-slate-700 mb-6 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={isLogin ? loginUser : registerUser}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-xl font-semibold"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-blue-400 mt-5 cursor-pointer text-center"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
}

export default Login;