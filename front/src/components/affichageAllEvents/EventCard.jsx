
function EventCard({event, vote, setVote}){

    async function aVote(id){
        // console.log("vote pour " + id);
    await fetch(`http://localhost:5000/api/events/${id}/vote`, {method: 'POST', }) 
        .then((res) => res.json()) 
        .then((data) => { console.log('Vote enregistré:', data); })
            // Optionnel : Mettre à jour l'interface utilisateur après le vote }) 
            // .catch((error) => { console.error('Erreur lors du vote:', error); });
        setVote([...vote, id])
    }

    const formattedDate = new Date(event.dateHeure).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });

    return(
        <div key={event.id} className="event-card">
            {/* <h2 className="bg-red-500 text-white p-10 text-3xl">{event.titre}</h2> */}
            <p>{event.titre}</p>
            <p>Votes : {event.nbVotes}</p>
            <p>Date : {formattedDate}</p>
            <p>Lieu : {event.lieu}</p>
            <div>
                <button onClick={() => aVote(event.id)}>voter</button>
                <a href={`/event/${event.id}`}>Voir</a>
            </div>
        </div>
    )
}

export {EventCard}