function GoalCard({ goal, toggleGoal, deleteGoal }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 flex justify-between items-center">

      <div>

        <h3
          className={`text-xl font-semibold ${
            goal.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {goal.task}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {goal.completed ? "✅ Completed" : "⏳ Pending"}
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() => toggleGoal(goal._id)}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          Toggle
        </button>

        <button
          onClick={() => deleteGoal(goal._id)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default GoalCard;
