import { useEffect, useState } from "react";
import API from "../services/api";
import DSAStats from "../components/DSAStats";
import TopicProgress from "../components/TopicProgress";

function DSA() {

  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);

  const [form, setForm] = useState({

    title:"",
    topic:"",
    difficulty:"Easy",
    platform:"LeetCode",
    problemUrl:"",
    notes:""

  });



  useEffect(()=>{

    fetchQuestions();
    fetchTopics();

  },[]);



  const fetchQuestions = async()=>{

    try{

      const res = await API.get("/dsa/questions");

      setQuestions(res.data);


    }catch(error){

      console.log(error);

    }

  };

    const fetchTopics = async()=>{

    try{

        const res = await API.get("/dsa/topics");

        setTopics(res.data);

    }
    catch(error){

        console.log(error);

     }

    };



  const addQuestion = async()=>{

    try{

      const res = await API.post(
        "/dsa/question",
        form
      );


      setQuestions([
        res.data,
        ...questions
      ]);


      setForm({

        title:"",
        topic:"",
        difficulty:"Easy",
        platform:"LeetCode",
        problemUrl:"",
        notes:""

      });


    }catch(error){

      console.log(error);

    }

  };



  const deleteQuestion = async(id)=>{

    try{

      await API.delete(
        `/dsa/question/${id}`
      );


      setQuestions(
        questions.filter(
          q=>q._id!==id
        )
      );


    }catch(error){

      console.log(error);

    }

  };



  return (

    <div className="text-white">


      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        DSA Tracker
      </h1>
      <DSAStats questions={questions}/>
      <TopicProgress topics={topics}/>



      {/* Add Question */}

      <div className="bg-gray-800 p-6 rounded-2xl mb-10">


        <input
          placeholder="Problem Name"
          className="w-full p-3 bg-gray-700 rounded mb-3"
          value={form.title}
          onChange={
            e=>setForm({
              ...form,
              title:e.target.value
            })
          }
        />



        <input
          placeholder="Topic"
          className="w-full p-3 bg-gray-700 rounded mb-3"
          value={form.topic}
          onChange={
            e=>setForm({
              ...form,
              topic:e.target.value
            })
          }
        />



        <select

          className="w-full p-3 bg-gray-700 rounded mb-3"

          value={form.difficulty}

          onChange={
            e=>setForm({
              ...form,
              difficulty:e.target.value
            })
          }

        >

          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>

        </select>



        <input
          placeholder="Problem URL"
          className="w-full p-3 bg-gray-700 rounded mb-3"
          value={form.problemUrl}
          onChange={
            e=>setForm({
              ...form,
              problemUrl:e.target.value
            })
          }
        />



        <textarea

          placeholder="Notes"

          className="w-full p-3 bg-gray-700 rounded mb-3"

          value={form.notes}

          onChange={
            e=>setForm({
              ...form,
              notes:e.target.value
            })
          }

        />



        <button

          onClick={addQuestion}

          className="bg-blue-500 px-6 py-3 rounded-xl"

        >

          Add Question

        </button>


      </div>




      {/* Questions List */}


      <div className="space-y-4">


        {
          questions.map((q)=>(

            <div
              key={q._id}
              className="bg-gray-800 p-5 rounded-xl"
            >

              <h2 className="text-2xl font-bold">
                {q.title}
              </h2>


              <p>
                {q.topic} • {q.difficulty}
              </p>


              <p>
                {q.platform}
              </p>



              <button

                onClick={()=>deleteQuestion(q._id)}

                className="mt-3 bg-red-500 px-4 py-2 rounded"

              >

                Delete

              </button>


            </div>

          ))
        }


      </div>


    </div>

  );

}


export default DSA;