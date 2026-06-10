import { useState, useEffect } from "react"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Team from "./pages/Team"
import Profile from "./pages/Profile"
import Login from "./pages/Login"

function App() {

  const [goals, setGoals] = useState(() => {

    const savedGoals = localStorage.getItem("goals")

    return savedGoals
      ? JSON.parse(savedGoals)
      : [
          {
            task: "Solve 5 Leetcode Problems",
            completed: true,
          },
          {
            task: "Study DBMS for 2 Hours",
            completed: false,
          },
        ]
  })

  const [newGoal, setNewGoal] = useState("")

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals))
  }, [goals])

  const addGoal = () => {

    if (newGoal.trim() === "") return

    setGoals([
      ...goals,
      {
        task: newGoal,
        completed: false,
      },
    ])

    setNewGoal("")
  }

  const toggleGoal = (index) => {

    const updatedGoals = goals.map((goal, i) => {

      if (i === index) {
        return {
          ...goal,
          completed: !goal.completed,
        }
      }

      return goal
    })

    setGoals(updatedGoals)
  }

  const deleteGoal = (index) => {

    const updatedGoals = goals.filter(
      (_, i) => i !== index
    )

    setGoals(updatedGoals)
  }

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-900 text-white p-8">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                goals={goals}
                newGoal={newGoal}
                setNewGoal={setNewGoal}
                addGoal={addGoal}
                toggleGoal={toggleGoal}
                deleteGoal={deleteGoal}
              />
            }
          />

          <Route
            path="/team"
            element={<Team />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App
