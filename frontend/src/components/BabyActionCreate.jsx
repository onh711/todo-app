import axios from "axios";

export const BabyActionCreate = ({fetch}) => {

  const babyActionCreate = (actionNum) =>{
      return{     
      baby_id:1,
      action:actionNum,
      cry:0,
    }
  }

  const fetchAction = async(actionNum) =>{
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
        <button onClick={()=>fetchAction(1)}>寝る</button>
        <button onClick={()=>fetchAction(2)}>起きる</button>
        <button onClick={()=>fetchAction(3)}>授乳</button>
        <button onClick={()=>fetchAction(4)}>ご飯</button>
        <button onClick={()=>fetchAction(5)}>うんち</button>
        <button onClick={()=>fetchAction(6)}>おしっこ</button>
        <button onClick={()=>fetchAction(7)}>うんち/おしっこ</button>
    </div>
    </>
  )
}