function CreateEvent(){

    return(
        <div>
            <button></button>
            <div>
                <h1>Création d'un évènement</h1>

                <label htmlFor="titreEvent">Titre de l'évènement : </label>
                <input id="titreEvent" type="text"></input>

                <label htmlFor="descriptionEvent">Description : </label>
                <textarea id="descriptionEvent" rows="4"></textarea>

                <label htmlFor="dateEvent">Date : </label>
                <input id="dateEvent" type="date"></input>

                <label htmlFor="lieuEvent">Lieu : </label>
                <input id="lieuEvent" type="text"></input>
            </div>
        </div>
    )
}

export {CreateEvent}



