import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';


export const Calender = ({actions}) => {
  const [events, setEvents] = useState();
  // useEffect(()=>{
    console.log("値",actions);
    const eventList = actions.map((action) => {
      return {id: action.id, title: action.action, start:action.start_date, end:action.due_date, description:action.memo};
    });
  //   setEvents(eventList);
  //   console.log("中",eventList);
  // },[actions]);
  
  // console.log(eventList);
  const handleDateSelect = (args) => {
   const title = prompt('予定のタイトルを入力してください')
   const calendarInstance= args.view.calendar

   calendarInstance.unselect()
   if (title) {
     calendarInstance.addEvent({
       title,
       start: args.startStr,
       end: args.endStr,
       allDay: args.allDay,
     })
    }
  }
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin ,interactionPlugin]}
      initialView="timeGridDay"
      locales={jaLocale} 
      locale='ja' 
      selectable={true}
      select={handleDateSelect}

      headerToolbar={{                         
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      events={eventList}
    />
  )
}
