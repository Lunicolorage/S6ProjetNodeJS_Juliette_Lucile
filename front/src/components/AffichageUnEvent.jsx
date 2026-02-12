import { useParams } from "react-router-dom";

function AffichageUnEvent(){
    const { id } = useParams();
    return(
        <div>
            <h1>Affichage</h1>
            
        </div>
    )
}

export {AffichageUnEvent}