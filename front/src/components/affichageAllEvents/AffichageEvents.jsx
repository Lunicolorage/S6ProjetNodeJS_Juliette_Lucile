import React, { useState, useEffect } from 'react';
import { EventCard } from './EventCard';

function AffichageEvents(){
    const [events, setEvents] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:5000/api/events')
        .then((res) => res.json())
        .then((data) => setEvents(data.events))
        // setEvent(response2);
        // setLoading(false)
      }, [])
      
    
      return (
        <div>
          <h1>Évènements</h1>
          <div>
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      )

}

export {AffichageEvents}