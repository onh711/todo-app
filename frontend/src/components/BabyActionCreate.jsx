import axios from "axios";

export const BabyActionCreate = () => {

const now = new Date();
  const baby_actions = {
      action:1,
      cry:0,
      start_date:now,
      end_date:now.setMinutes(now.getMinutes() + 5)
  };


  
//   console.log(baby_actions.start_date);
//   console.log(new Date().setMinutes(now.getMinutes() + 5));

  const handleSubmit = async(e) =>{
    e.preventDefault();
      const API_URL = "http://localhost/api/dashbord"
      try {
      await axios.post(API_URL, {baby_actions});
      console.log(baby_actions);
      } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
    <div>
        <button onClick={handleSubmit}>ねる</button>
    </div>
    </>
  )
}
