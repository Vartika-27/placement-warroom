function DSAStats({ questions }) {


  const total = questions.length;


  const easy = questions.filter(
    q => q.difficulty === "Easy"
  ).length;


  const medium = questions.filter(
    q => q.difficulty === "Medium"
  ).length;


  const hard = questions.filter(
    q => q.difficulty === "Hard"
  ).length;



  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">


      <div className="bg-gray-800 p-6 rounded-2xl">

        <h2 className="text-gray-400">
          Total Solved
        </h2>

        <p className="text-4xl font-bold text-blue-400 mt-3">
          {total}
        </p>

      </div>



      <div className="bg-gray-800 p-6 rounded-2xl">

        <h2 className="text-gray-400">
          Easy
        </h2>

        <p className="text-4xl font-bold text-green-400 mt-3">
          {easy}
        </p>

      </div>



      <div className="bg-gray-800 p-6 rounded-2xl">

        <h2 className="text-gray-400">
          Medium
        </h2>

        <p className="text-4xl font-bold text-yellow-400 mt-3">
          {medium}
        </p>

      </div>



      <div className="bg-gray-800 p-6 rounded-2xl">

        <h2 className="text-gray-400">
          Hard
        </h2>

        <p className="text-4xl font-bold text-red-400 mt-3">
          {hard}
        </p>

      </div>


    </div>

  );

}


export default DSAStats;