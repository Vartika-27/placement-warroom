function TopicProgress({ topics }) {


  const calculateProgress = (topic) => {

    const solved =
      topic.easySolved +
      topic.mediumSolved +
      topic.hardSolved;


    const target =
      topic.easyTarget +
      topic.mediumTarget +
      topic.hardTarget;


    if(target === 0) return 0;


    return Math.round(
      (solved / target) * 100
    );

  };



  return (

    <div className="mt-10">


      <h2 className="text-3xl font-bold mb-6">
        Topic Progress
      </h2>



      <div className="space-y-6">


      {
        topics.map(topic => (

          <div
            key={topic._id}
            className="bg-gray-800 p-6 rounded-2xl"
          >


            <div className="flex justify-between mb-3">

              <h3 className="text-xl font-bold">
                {topic.topic}
              </h3>


              <span className="text-blue-400">
                {calculateProgress(topic)}%
              </span>


            </div>



            <div className="w-full bg-gray-700 h-3 rounded-full">


              <div

                className="bg-blue-500 h-3 rounded-full"

                style={{
                  width:`${calculateProgress(topic)}%`
                }}

              />


            </div>



            <p className="text-gray-400 mt-3">

              Easy: {topic.easySolved}/{topic.easyTarget}

              {" | "}

              Medium: {topic.mediumSolved}/{topic.mediumTarget}

              {" | "}

              Hard: {topic.hardSolved}/{topic.hardTarget}

            </p>


          </div>


        ))
      }


      </div>


    </div>

  );

}


export default TopicProgress;