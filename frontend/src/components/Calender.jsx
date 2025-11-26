import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { CalenderModal } from "./CalenderModal ";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
// 日本語化
dayjs.locale("ja");
// タイムゾーンのデフォルトをJST化
dayjs.tz.setDefault("Asia/Tokyo");

export const Calender = ({ actions, fetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  // useEffect(()=>{
  // console.log("値",actions);
  const eventList = actions.map((action) => {
    return {
      id: action.id,
      title: action.action_text,
      cry: action.cry,
      start: action.start_date,
      end: action.end_date,
      milk_amount: action.milk_amount,
      description: action.memo,
    };
  });
  //   setEvents(eventList);
  //   console.log("中",eventList);
  // },[actions]);

  // console.log(eventList);

  // console.log(dayjs(new Date()).tz("Asia/Tokyo")).format("hh:mm:ss");
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locales={jaLocale}
        locale="ja"
        timeZone="local"
        selectable={true}
        // select={handleDateSelect}
        nowIndicator={true} //現在時刻をラインで表示
        eventMinHeight={25} //イベントの表示幅の指定
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        scrollTime={dayjs(new Date().getTime()).format("hh:mm:ss")} //初期表示の時間
        events={eventList} //カレンダーに渡すイベントのJSON
        // dateClick={(info) => console.log((`日付がクリックされました: ${info.dateStr}`))}
        dateClick={(info) =>
          console.log(`日付がクリックされました: ${info.dateStr}`)
        }
        eventClick={(e) => {
          // alert(`イベント: ${e.event.extendedProps.description}`)
          // alert(`イベント: ${e.event.id}`)
          setIsOpen(true);
          setEvents({
            ...events,
            id: e.event.id,
            title: e.event.title,
            cry: e.event.extendedProps.cry,
            start: e.event.startStr,
            end: e.event.endStr,
            milk_amount: e.event.extendedProps.milk_amount,
            description: e.event.extendedProps.description,
          });
        }}
        slotDuration={"00:15:00"}
        slotLabelInterval={"01:00:00"} //時間の表示間隔
        editable={true}
      />
      <CalenderModal
        showFlag={isOpen}
        events={events}
        onCloseModal={onCloseModal}
        fetch={fetch}
      />
    </>
  );
};
