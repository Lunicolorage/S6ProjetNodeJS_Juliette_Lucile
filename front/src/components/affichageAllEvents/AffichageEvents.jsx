import React, { useState, useEffect } from 'react';
import { EventCard } from './EventCard';

function AffichageEvents(){
    const [events, setEvents] = useState([]);
    const [vote, setVote] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:5000/api/events')
        .then((res) => res.json())
        .then((data) => setEvents(data.events))
        // setEvent(response2);
        // setLoading(false)
      }, [vote])
      
    
      return (
        <div>
          <h1>Évènements</h1>
          <a href="/creation">Créer un événement</a>
          <div>
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} vote ={vote} setVote={setVote} />
            ))}
          </div>
        </div>
      )

}

export {AffichageEvents}