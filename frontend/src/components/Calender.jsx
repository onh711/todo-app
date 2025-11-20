import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import jaLocale from '@fullcalendar/core/locales/ja';

export const Calender = () => {

  const handleDateSelect = () => {
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
      events={[
          {title:'うんち', start: '2025-11-19T09:00:00', end: '2025-11-19T09:05:00'}
      ]}
    />
  )
}
