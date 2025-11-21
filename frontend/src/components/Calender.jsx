import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { CalenderModal } from './CalenderModal ';


export const Calender = ({actions}) => {
  const [open, setOpen] = useState(false); 
  const [events,setEvents] = useState([]);
  
  // useEffect(()=>{
    // console.log("値",actions);
    const eventList = actions.map((action) => {
      return {id: action.id, title: action.action_text, start:action.start_date, end:action.end_date, description:action.memo};
    });
  //   setEvents(eventList);
  //   console.log("中",eventList);
  // },[actions]);
  
  // console.log(eventList);

  return (
    <>
   
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin]}
      initialView="timeGridDay"
      locales={jaLocale} 
      locale='ja'
      timeZone='local'
      selectable={true}
      // select={handleDateSelect}
      nowIndicator={true} //現在時刻をラインで表示

      headerToolbar={{                         
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={eventList}//カレンダーに渡すイベントのJSON
      // dateClick={(info) => console.log((`日付がクリックされました: ${info.dateStr}`))}
      dateClick={(info) => console.log((`日付がクリックされました: ${info.view}`))}
      eventClick={(e) => {
        // alert(`イベント: ${e.event.extendedProps.description}`)
        // alert(`イベント: ${e.event.id}`)
        setOpen(true);
        setEvents({...events,
          id:e.event.id,
          title:e.event.title,
          start:e.event.startStr,
          end:e.event.endStr,
          description:e.event.extendedProps.description
        });
      }}
      slotDuration={'00:15:00'}
      slotLabelInterval={'01:00:00'} //時間の表示間隔
      editable={true}
    />
    
    <CalenderModal showFlag={open} events={events}/>
     </>
  )
}
