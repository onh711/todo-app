import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { BabyActionEditModal } from "./BabyActionEditModal ";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import { BabyActionCreateModal } from "./BabyActionCreateModal";

// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
// 日本語化
dayjs.locale("ja");
// タイムゾーンのデフォルトをJST化
dayjs.tz.setDefault("Asia/Tokyo");

export const Calender = ({ actions, fetch }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [calenderClickDate, setCalenderClickDate] = useState("");
  const [events, setEvents] = useState([]);

  const onCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const onCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const ACTION_ID = [
    { id: 1, label: "寝る" },
    { id: 2, label: "授乳" },
    { id: 3, label: "ご飯" },
    { id: 4, label: "うんち" },
    { id: 5, label: "おしっこ" },
    { id: 6, label: "うんち/おしっこ" },
  ];

  const findId = (label) => {
    //labelを渡してリスト内のlabelのIDを返す関数
    const found = ACTION_ID.find((id) => id.label === label);
    return found ? found.id : "";
  };

  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedEventData = {
      id: event.id,
      action: findId(event.title),
      start_date: dayjs(event.start).format("YYYY-MM-DD HH:mm:ss"),
      end_date: dayjs(event.end).format("YYYY-MM-DD HH:mm:ss"),
    };

    const API_URL = `http://localhost/api/drop/${event.id}`;
    try {
      await axios.put(API_URL, updatedEventData);
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const eventList = actions.map((action) => {
    const eventColors = (action) => {
      switch (action.action_text) {
        case "寝る":
          return "#a3ffa3";
        case "授乳":
          return "#ffa3d1";
        case "ご飯":
          return "#a3ffff";
        case "うんち":
          return "#ffc184";
        case "おしっこ":
          return "#ffffa3";
        case "うんち/おしっこ":
          return "#bf7fff";
      }
    };

    return {
      id: action.id,
      title: action.action_text,
      cry: action.cry,
      start: action.start_date,
      end: action.end_date,
      milk_amount: action.milk_amount,
      description: action.memo,
      color: eventColors(action),
      textColor: "rgb(0, 0, 0)",
    };
  });

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locales={jaLocale}
        locale="ja"
        timeZone="local"
        selectable={true}
        height={"100%"}
        allDaySlot={false}
        eventBackgroundColor={"#FFFFFF"}
        nowIndicator={true} //現在時刻をラインで表示
        eventMinHeight={25} //イベントの表示幅の指定
        eventShortHeight={40}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        scrollTime={dayjs(new Date().getTime()).format("HH:mm:ss")} //初期表示の時間
        events={eventList} //カレンダーに渡すイベントのJSON
        eventDrop={handleEventDrop}
        eventResize={handleEventDrop}
        dateClick={(info) => {
          setCalenderClickDate(info.dateStr);
          setCreateModalOpen(true);
        }}
        eventClick={(e) => {
          setEditModalOpen(true);
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
      <BabyActionEditModal
        showFlag={isEditModalOpen}
        events={events}
        onCloseEditModal={onCloseEditModal}
        fetch={fetch}
      />

      <BabyActionCreateModal
        showFlag={isCreateModalOpen}
        fetch={fetch}
        onCloseCreateModal={onCloseCreateModal}
        clickDate={calenderClickDate}
      />
    </>
  );
};
