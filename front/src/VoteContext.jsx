import { useState, createContext,useEffect } from "react";

export const VoteContext = createContext();

function VoteProvider({ children }) {

    const [vote, setVote] = useState(() => {
        const storedVotes = localStorage.getItem('votes');
        return storedVotes ? JSON.parse(storedVotes) : [];
    });

    useEffect(() => {
        localStorage.setItem('votes', JSON.stringify(vote));
        console.log('Votes sauvegardés:', vote);
    }, [vote]);

    return(
        <VoteContext.Provider value={[vote, setVote]}>
            {children}
        </VoteContext.Provider>
    );
}

export { VoteProvider };