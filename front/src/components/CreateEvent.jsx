import { useState } from 'react';

function CreateEvent(){
    const [titreEvent, setTitreEvent] = useState('');
    const [descriptEvent, setDescriptEvent] = useState('');
    const [lieuEvent, setLieuEvent] = useState('');
    const [dateEvent, setDateEvent] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChangeTitre(e){
        setTitreEvent(e.target.value);
    }

    function handleChangeDescript(e){
        setDescriptEvent(e.target.value);
    }

    function handleChangeLieu(e){
        setLieuEvent(e.target.value);
    }

    function handleChangeDate(e){
        setDateEvent(e.target.value);
    }

    async function handleClickValidate(){
        setLoading(true);

        let event = {"titre": titreEvent,
                    "description": descriptEvent,
                    "dateHeure": dateEvent,
                    "lieu": lieuEvent,
                    "nbVotes": 0}

        console.log(event)

        try{
            const response = await fetch('http://localhost:5000/api/events', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            });

            const uploaded = await response.json()

            if (!response.ok){
                throw new Error(uploaded.error || 'Erreur upload évènements');
            }

            setTitreEvent('');
            setDescriptEvent('');
            setDateEvent('');
            setLieuEvent('')

        } catch {
            throw new Error('Erreur upload évènements');
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="md:px-30 lg:px-80 my-5 md:my-10">

            <button className="bg-bleuClair rounded-md mb-6 px-4 py-2 ml-5 md:ml-0 cursor-pointer" onClick={() => window.location.href = "/"}>Retour</button>

            <div className="p-5 md:p-7 mx-5 md:mx-0 rounded-lg border-3 border border-bleuClair">
                <h1 className="text-center text-3xl mb-10">Création d'un évènement</h1>

                <div className='flex flex-col'>

                    <div className='flex flex-col mb-3'>
                        <label htmlFor="titreEvent" className="text-xl">Titre de l'évènement : </label>
                        <input id="titreEvent" type="text" className="border border-1" value={titreEvent} onChange={handleChangeTitre}></input>
                    </div>

                    <div className='flex flex-col mb-3'>
                        <label htmlFor="descriptionEvent" className="text-xl">Description : </label>
                        <textarea id="descriptionEvent" rows="5" className="border border-1 max-h-50" value={descriptEvent} onChange={handleChangeDescript}></textarea>
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor="dateEvent" className="text-xl">Date : </label>
                        <input id="dateEvent" type="datetime-local" className="border border-1" value={dateEvent} onChange={handleChangeDate}></input>
                    </div>
                    
                    <div>
                        <label htmlFor="lieuEvent" className="text-xl">Lieu : </label>
                        <input id="lieuEvent" type="text" className="border border-1" value={lieuEvent} onChange={handleChangeLieu}></input>
                    </div>
                </div>

                <button className="bg-bleuClair rounded-md mt-6 px-4 py-2 md:mx-0 size-full cursor-pointer" onClick={handleClickValidate}>{loading ? "Upload..." : "Enregistrer l'évènement"}</button>
            </div>

        </div>
    )
}

export {CreateEvent}



