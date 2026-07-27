import { useEffect, useState } from "react"
import axios from "axios"

import "./App.css"

function App() {

  // =========================
  // AUTH STATES
  // =========================

  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  )

  // =========================
  // GOAL STATES
  // =========================

  const [goals, setGoals] = useState([])
  const [newGoal, setNewGoal] = useState("")

  // =========================
  // FETCH GOALS
  // =========================

  const fetchGoals = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/goals",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setGoals(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // LOAD GOALS
  // =========================

  useEffect(() => {

    if (token) {
      fetchGoals()
    }

  }, [token])

  // =========================
  // REGISTER
  // =========================

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",

        {
          name,
          email,
          password,
        }
      )

      alert("Registration Successful")

      setIsLogin(true)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // LOGIN
  // =========================

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",

        {
          email,
          password,
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      setToken(response.data.token)

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // LOGOUT
  // =========================

  const logoutUser = () => {

    localStorage.removeItem("token")

    setToken("")

    setGoals([])
  }

  // =========================
  // ADD GOAL
  // =========================

  const addGoal = async () => {

    if (!newGoal.trim()) return

    try {

      const response = await axios.post(

        "http://localhost:5000/api/goals",

        {
          task: newGoal,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setGoals([
        ...goals,
        response.data,
      ])

      setNewGoal("")

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // DELETE GOAL
  // =========================

  const deleteGoal = async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/goals/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setGoals(
        goals.filter(
          (goal) => goal._id !== id
        )
      )

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // TOGGLE GOAL
  // =========================

  const toggleGoal = async (id) => {

    try {

      const response = await axios.put(

        `http://localhost:5000/api/goals/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )

      setGoals(

        goals.map((goal) =>

          goal._id === id
            ? response.data
            : goal
        )
      )

    } catch (error) {

      console.log(error)
    }
  }

  // =========================
  // AUTH SCREEN
  // =========================

  if (!token) {

    return (

      <div className="auth-container">

        <h1>
          Placement War-Room
        </h1>

        <div className="auth-box">

          {!isLogin && (

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={
              isLogin
                ? loginUser
                : registerUser
            }
          >

            {isLogin
              ? "Login"
              : "Register"}

          </button>

          <p
            onClick={() =>
              setIsLogin(!isLogin)
            }
            className="toggle-auth"
          >

            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}

          </p>

        </div>

      </div>
    )
  }

  // =========================
  // MAIN APP
  // =========================

  return (

    <div className="app">

      <div className="top-bar">

        <h1>
          Placement War-Room
        </h1>

        <button onClick={logoutUser}>
          Logout
        </button>

      </div>

      <div className="goal-input">

        <input
          type="text"
          placeholder="Enter goal..."
          value={newGoal}
          onChange={(e) =>
            setNewGoal(e.target.value)
          }
        />

        <button onClick={addGoal}>
          Add Goal
        </button>

      </div>

      <div className="goals-container">

        {goals.map((goal) => (

          <div
            key={goal._id}
            className="goal-card"
          >

            <h3
              style={{
                textDecoration:
                  goal.completed
                    ? "line-through"
                    : "none",
              }}
            >
              {goal.task}
            </h3>

            <p>

              {goal.completed
                ? "✅ Completed"
                : "⏳ Pending"}

            </p>

            <button
              onClick={() =>
                toggleGoal(goal._id)
              }
            >
              Toggle
            </button>

            <button
              onClick={() =>
                deleteGoal(goal._id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default App