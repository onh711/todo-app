import axios from "axios";
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

export const BabyActionCreate = ({ fetch }) => {
  const date = dayjs();
  const nowFormat = date.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの現在時刻
  const fiveMinLater = date.add(5, 'm');
  const fiveMinFormat = fiveMinLater.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの5分後の時刻

  const babyActionCreate = (actionNum) => {
    return {
      baby_id: 1,
      action: actionNum,
      cry: 0,
      start_date:nowFormat,
      end_date:fiveMinFormat
    }
  }

  const fetchAction = async (actionNum) => {
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
        <button onClick={() => fetchAction(1)}>寝る</button>
        <button onClick={() => fetchAction(2)}>授乳</button>
        <button onClick={() => fetchAction(3)}>ご飯</button>
        <button onClick={() => fetchAction(4)}>うんち</button>
        <button onClick={() => fetchAction(5)}>おしっこ</button>
        <button onClick={() => fetchAction(6)}>うんち/おしっこ</button>
      </div>
    </>
  )
}