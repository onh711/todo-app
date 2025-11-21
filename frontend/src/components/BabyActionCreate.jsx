import axios from "axios";

export const BabyActionCreate = ({fetch}) => {

  const babyActionCreate = (actionNum) =>{
      return{     
      baby_id:1,
      action:actionNum,
      cry:0,
    }
  }

  const handleSubmit = async(actionNum) =>{
    const API_URL = "http://localhost/api/dashbord"
    try {
      await axios.post(API_URL, babyActionCreate(actionNum));
      fetch();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
    <div>
        <button onClick={()=>handleSubmit(1)}>寝る</button>
        <button onClick={()=>handleSubmit(2)}>起きる</button>
        <button onClick={()=>handleSubmit(3)}>授乳</button>
        <button onClick={()=>handleSubmit(4)}>ご飯</button>
        <button onClick={()=>handleSubmit(5)}>うんち</button>
        <button onClick={()=>handleSubmit(6)}>おしっこ</button>
        <button onClick={()=>handleSubmit(7)}>うんち/おしっこ</button>
    </div>
    </>
  )
}