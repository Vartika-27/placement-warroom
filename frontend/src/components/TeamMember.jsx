function TeamMember({ name, score, streak }) {
  return (
    <div className="bg-gray-800 p-5 rounded-xl flex items-center justify-between">

      <div>
        <h2 className="text-xl font-semibold">
          {name}
        </h2>

        <p className="text-gray-400">
          Streak: {streak} days
        </p>
      </div>

      <div className="text-2xl font-bold text-blue-400">
        {score}
      </div>

    </div>
  )
}

export default TeamMember
