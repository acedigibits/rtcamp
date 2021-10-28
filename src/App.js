import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import EventDetails from './EventDetails';
import projectDefaults from './projectDefaults';

const App = () => {

    function handleEventClick(arg) {
        let event_details = arg.event._def.extendedProps;
        //Setting Title same as Wordpress API result 
        let title = { rendered: arg.event._def.title };
        setEvent({ ...event_details, title });
    }
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({});
    useEffect(async () => {
        let response = await fetch(`${projectDefaults.baseURL}/wordcamps`)
        response = await response.json();
        setEvents(projectDefaults.correctEventsDataForFullCalendar(response));
    }, []);

    return (
        <>
            <div className="event_calendar float_left">
                <h3 className="center"> wordcamp Events Calendar View</h3>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={handleEventClick}
                />
            </div>
            <EventDetails event_details={event} />
        </>
    )
}

export default App;