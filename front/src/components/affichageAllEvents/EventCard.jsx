import { useActionState, useContext, useState  } from "react";
import { VoteContext } from "../../VoteContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function EventCard({event}){
    let navigate = useNavigate();

    const [vote, setVote] = useContext(VoteContext);

    const [dejaVote, setDejaVote] = useState(false);

    useEffect(() => {
        if (vote.includes(event.id)) {
            setDejaVote(true);
        }
    }, [vote, event.id]);

    async function aVote(id){
        // console.log("vote pour " + id);
    await fetch(`http://localhost:5000/api/events/${id}/vote`, {method: 'POST', }) 
        .then((res) => res.json()) 
        .then((data) => { console.log('Vote enregistré:', data); })
            // Optionnel : Mettre à jour l'interface utilisateur après le vote }) 
            // .catch((error) => { console.error('Erreur lors du vote:', error); });
        setVote([...vote, id])
        setDejaVote(true);
    }
    
    const formattedDate = new Date(event.dateHeure).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });

    return(
        <div key={event.id} className="border-3 border border-bleuClair rounded-lg p-5 mb-5">
            {/* <h2 className="bg-red-500 text-white p-10 text-3xl">{event.titre}</h2> */}
            <div className="h-30">
                <p className="text-center text-xl" >{event.titre}</p>
                <p>Votes : {event.nbVotes}</p>
                <p>Date : {formattedDate}</p>
                <p>Lieu : {event.lieu}</p>
            </div>
            <div className="flex gap-4 mt-4">
                {!dejaVote && <button className="bg-orangeClair rounded-md w-1/2 py-2 cursor-pointer" onClick={() => aVote(event.id)}>Voter</button>}
                {/* <button className="bg-orangeClair rounded-md w-1/2 py-2 cursor-pointer" onClick={() => aVote(event.id)}>voter</button> */}
                <button className="bg-bleuClair rounded-md w-1/2 py-2 cursor-pointer" onClick={() => navigate(`/event/${event.id}`)}>Voir</button>
            </div>
        </div>
    )
}

export {EventCard}