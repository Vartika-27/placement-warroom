import StatsCard from "../components/StatsCard"
import GoalCard from "../components/GoalCard"

function Dashboard({
  goals,
  newGoal,
  setNewGoal,
  addGoal,
  toggleGoal,
  deleteGoal,
}) {

  return (
    <div>

      <div className="mt-10">

        <h1 className="text-5xl font-bold text-blue-400">
          Placement War-Room
        </h1>

        <p className="mt-4 text-gray-300 text-xl">
          Stay accountable. Stay dangerous.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <StatsCard
          title="DSA Questions"
          value="143"
        />

        <StatsCard
          title="Study Hours"
          value="87"
        />

        <StatsCard
          title="Current Streak"
          value="12 Days"
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

          {goals.map((goal, index) => (
            <GoalCard
              key={index}
              task={goal.task}
              completed={goal.completed}
              toggleGoal={toggleGoal}
              deleteGoal={deleteGoal}
              index={index}
            />
          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard