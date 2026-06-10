function GoalCard({
  task,
  completed,
  toggleGoal,
  deleteGoal,
  index,
}) {

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">

      <div className="flex items-center gap-4">

        <button
          onClick={() => toggleGoal(index)}
          className={`w-6 h-6 rounded-full border-2 ${
            completed
              ? "bg-green-400 border-green-400"
              : "border-gray-400"
          }`}
        >
        </button>

        <span
          className={`text-lg ${
            completed
              ? "line-through text-gray-500"
              : ""
          }`}
        >
          {task}
        </span>

      </div>

      <button
        onClick={() => deleteGoal(index)}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>

    </div>
  )
}

export default GoalCard