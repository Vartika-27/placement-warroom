import TeamMember from "../components/TeamMember"

function Team() {

  return (
    <div className="mt-10">

      <h1 className="text-5xl font-bold text-blue-400 mb-10">
        Team Leaderboard
      </h1>

      <div className="space-y-4">

        <TeamMember
          name="Vartika"
          score="540"
          streak="12"
        />

        <TeamMember
          name="Aman"
          score="490"
          streak="10"
        />

        <TeamMember
          name="Riya"
          score="450"
          streak="8"
        />

      </div>

    </div>
  )
}

export default Team