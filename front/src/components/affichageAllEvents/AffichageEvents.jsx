import React, { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { useContext  } from "react";
import { VoteContext } from "../../VoteContext";
import { useNavigate } from "react-router";

function AffichageEvents(){
    let navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [vote, setVote] = useContext(VoteContext);

    
    
      useEffect(() => {
        fetch('http://localhost:5000/api/events')
        .then((res) => res.json())
        .then((data) => setEvents(data.events))
        // setEvent(response2);
        // setLoading(false)
      }, [vote])
      
    
      return (
        <div className="md:px-30 lg:px-80 my-10">
          <h1 className="text-center text-3xl mb-10 mt-5">Évènements</h1>
          <button className="bg-bleuClair rounded-md mb-6 px-4 py-2 ml-10 md:ml-0 cursor-pointer" onClick={() => navigate('/creation')}>Créer un événement</button>
          <div className='mx-10 md:mx-0 mt-5 md:grid md:grid-cols-3 md:gap-5'>
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev}/>
            ))}
          </div>
        </div>
      )

}

export {AffichageEvents}