function EventCard({event}){
    return(
        <div key={event.id} className="event-card">
            <h2 className="bg-red-500 text-white p-10 text-3xl">{event.titre}</h2>
            <p>{event.description}</p>
            <p>{event.dateHeure}</p>
            <p>{event.lieu}</p>
            <p>Votes: {event.nbVotes}</p>
        </div>
    )
}

export {EventCard}