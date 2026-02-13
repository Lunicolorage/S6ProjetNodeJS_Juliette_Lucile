import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useContext  } from "react";
import { VoteContext } from "../VoteContext";
import { useNavigate } from "react-router";

function AffichageUnEvent(){
    let navigate = useNavigate();
    const { id } = useParams();
    //console.log(id);

    const [dejaVote, setDejaVote] = useState(false);
    const [event, setEvent] = useState(null);
    const [vote, setVote] = useContext(VoteContext);
        
    useEffect(() => {
        fetch('/api/events/' + id)
        .then((res) => res.json())
        .then((data) => {
            // console.log('Données reçues:', data);
            setEvent(data);                         
        })
        .catch((error) => console.error('Erreur:', error));

        if (vote.includes(parseInt(id))) {
            setDejaVote(true);
        }
    }, [vote]);

    const formattedDate = new Date(event?.dateHeure).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });


    async function aVote(id){
        await fetch(`/api/events/${id}/vote`, {method: 'POST', }) 
            .then((res) => res.json()) 
            .then((data) => { 
                console.log('Vote enregistré:', data);
                setEvent(data);  
            })
        setVote([...vote, parseInt(id)])
        setDejaVote(true);
    }

    return(
        <div className="md:px-30 lg:px-70 my-10">
            <button className="bg-bleuClair rounded-md mb-6 px-4 py-2 ml-5 md:ml-0 cursor-pointer" onClick={() => navigate('/')}>Retour</button>
            <div  className="flex flex-col p-7 mx-5 md:m-0 rounded-lg border-3 border border-bleuClair">
                <h1 className="text-center text-3xl mb-5">{event?.titre}</h1>
                <div>
                    <h2 className="text-xl">Description</h2>
                    <p>{event?.description}</p>
                </div>
                <p className=" mt-4">Date et heure : {formattedDate}</p>
                <p className=" mt-2">Lieu : {event?.lieu}</p>
                <div className="mt-2 flex gap-4 justify-between">
                    <p>Nombre de votes : {event?.nbVotes}</p>
                    { !dejaVote && <button className="bg-orangeClair rounded-md w-1/2 md:w-1/3 py-2 cursor-pointer" onClick={() => aVote(id)}>Voter</button>}
                    </div>
            </div>
        </div>
    )
}

export {AffichageUnEvent}
