import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
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
      {events.map((ev) => (
        <div key={ev.id} className="event-card">
          <h2>{ev.titre}</h2>
          <p>{ev.description}</p>
          <p>{ev.dateHeure}</p>
          <p>{ev.lieu}</p>
          <p>Votes: {ev.nbVotes}</p>
        </div>
      ))}
    </div>
  )
}

export default App
