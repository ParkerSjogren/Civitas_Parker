import { useState, useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin,{DateClickArg} from '@fullcalendar/interaction';
import EventRegistration from './EventRegistration'
import './Calendar.css';



const Calendar =()=>{
  const [addBtnPopupForm,setAddBtnPopupForm] = useState(false)
  let [events, setEvents] = useState({})
  let [allEventData, setAllEventData] = useState({})
  let [idx, setIdx] = useState({})
  let [eventId, setEventId]= useState("")
    let newEvents=[]
    
     const getEvent = async () => {
      let response= await fetch('/api/event');
      let data = await response.json();
      setAllEventData(data)
      let i = 0
      for(i=0;i<data.length;i++){
        newEvents.push({title: '' , date: ''})
        newEvents[i].title=data[i].name
        newEvents[i].date=data[i].start
        
        // newEvents[i].id=data[i]._id
        newEvents[i].id=i
    }
    setEvents(newEvents);
   }
   useEffect( () => {
    getEvent(); 
  }, []);
   
   
  
 const handleDateClick = (i)=>{
   console.log ("line 118",i.event)
   console.log("line 119",i.event.title)
   setIdx(i.event.id)
   console.log("line124 event id ",allEventData[i.event.id]._id)
   setEventId(allEventData[i.event.id]._id)
   setAddBtnPopupForm(true)
  }
 const handleEventFormClick = (eventFormData) => {
 }
return(
  <>
    <FullCalendar

  plugins={[ dayGridPlugin,interactionPlugin ]}
  initialView="dayGridMonth"
  events={events}
  eventClick={handleDateClick}
  //  events={[
  //   { title: 'event 1', date: '2021-07-29' },
  //   { title: 'event 2', date: '2021-07-30' }
  //  ]}
/> 
<div>
<EventRegistration trigger={addBtnPopupForm} setTrigger={setAddBtnPopupForm} onEventFormClick = {handleEventFormClick}  eventData = {allEventData}  idx = {idx} eventId = {eventId}/>
</div>

</>
)
}
export default Calendar

