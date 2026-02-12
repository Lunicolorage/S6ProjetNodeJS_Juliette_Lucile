function CreateEvent(){

    return(
        <div className="md:pr-50 md:pl-50 lg:pr-100 lg:pl-100">

            <button>Retour</button>

            <div className="flex flex-col p-7 m-auto rounded-md border-">
                <h1 className="text-center">Création d'un évènement</h1>

                <label htmlFor="titreEvent">Titre de l'évènement : </label>
                <input id="titreEvent" type="text"></input>

                <label htmlFor="descriptionEvent">Description : </label>
                <textarea id="descriptionEvent" rows="4"></textarea>

                <div>
                    <label htmlFor="dateEvent">Date : </label>
                    <input id="dateEvent" type="datetime-local"></input>
                </div>
                
                <div>
                    <label htmlFor="lieuEvent">Lieu : </label>
                    <input id="lieuEvent" type="text"></input>
                </div>
                
            </div>
        </div>
    )
}

export {CreateEvent}



