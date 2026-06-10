function StatsCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-3 text-blue-400">
        {value}
      </p>
    </div>
  )
}

export default StatsCard