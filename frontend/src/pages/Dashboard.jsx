import { useEffect, useState } from "react";
import API from "../services/api";

import StatsCard from "../components/StatsCard";
import GoalCard from "../components/GoalCard";

function Dashboard() {

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [stats, setStats] = useState({
  dsaSolved: 0,
  studyHours: 0,
  streak: 0,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {

  fetchGoals();
  fetchDashboard();

}, []);

  const fetchDashboard = async () => {

  try {

    const res = await API.get("/dashboard");

    setStats(res.data.stats);

    setUser(res.data.user);


  } catch(err) {

    console.log(err);

  }

};

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addGoal = async () => {

    if (!newGoal.trim()) return;

    try {

      const res = await API.post("/goals", {
        task: newGoal,
      });

      setGoals([...goals, res.data]);
      setNewGoal("");

    } catch (err) {
      console.log(err);
    }
  };

  const deleteGoal = async (id) => {

    try {

      await API.delete(`/goals/${id}`);

      setGoals(
        goals.filter(goal => goal._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  const toggleGoal = async (id) => {

    try {

      const res = await API.put(`/goals/${id}`);

      setGoals(
        goals.map(goal =>
          goal._id === id
            ? res.data
            : goal
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <div className="mt-10">

        <h1 className="text-5xl font-bold text-blue-400">
         Welcome {user?.username || "Warrior"} 👋
        </h1>

        <p className="mt-4 text-gray-300 text-xl">
          Stay accountable. Stay dangerous.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <StatsCard
        title="DSA Questions"
        value={stats.dsaSolved}
        />

      <StatsCard
        title="Study Hours"
        value={stats.studyHours}
      />

      <StatsCard
        title="Current Streak"
        value={`${stats.streak} Days`}
      />
      </div>

      {/* Goals */}

      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-6">
          Today's Goals
        </h2>

        <input
          type="text"
          placeholder="Enter a new goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 mb-4 outline-none"
        />

        <button
          onClick={addGoal}
          className="bg-blue-500 px-6 py-3 rounded-xl font-semibold mb-6 hover:bg-blue-600 transition"
        >
          Add Goal
        </button>

        <div className="space-y-4">

          {goals.map((goal) => (

            <GoalCard
              key={goal._id}
              goal={goal}
              toggleGoal={toggleGoal}
              deleteGoal={deleteGoal}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;