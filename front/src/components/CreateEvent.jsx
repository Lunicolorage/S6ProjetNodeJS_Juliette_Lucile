function CreateEvent(){

    return(
        <div className="md:px-30 lg:px-80 my-10">

            <button className="bg-bleuClair rounded-md mb-6 px-4 py-2 ml-10 md:ml-0">Retour</button>

            <div className="flex flex-col p-7 mx-10 md:m-0 rounded-lg border-3 border border-bleuClair">
                <h1 className="text-center text-3xl mb-10">Création d'un évènement</h1>

                <label htmlFor="titreEvent" className="text-xl">Titre de l'évènement : </label>
                <input id="titreEvent" type="text" className="border border-1"></input>

                <label htmlFor="descriptionEvent" className="text-xl">Description : </label>
                <textarea id="descriptionEvent" rows="4" className="border border-1"></textarea>

                <div>
                    <label htmlFor="dateEvent" className="text-xl">Date : </label>
                    <input id="dateEvent" type="datetime-local" className="border border-1"></input>
                </div>
                
                <div>
                    <label htmlFor="lieuEvent" className="text-xl">Lieu : </label>
                    <input id="lieuEvent" type="text" className="border border-1"></input>
                </div>
                
            </div>
        </div>
    )
}

export {CreateEvent}



