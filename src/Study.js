import { readDeck } from "./utils/api";
import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom/cjs/react-router-dom";


function Study() {
    const { deckId } = useParams()
    const history = useHistory()

    const [deck, setDeck] = useState(null)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)


    useEffect(() => {
        async function fetchDeck() {
            try{
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            }catch(error){
                console.error(error)
            }
        }
        fetchDeck()
    }, [deckId])

    const cards = deck ? deck.cards : []

    if (!deck) {
        return <div>loading...</div>
    }
    if (cards.length < 3){
        return (
            <div>
                <h2>Not Enough Cards</h2>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button>Add Cards</button>
                </Link>
            </div>
        )
    }

    const currentCard = cards[currentCardIndex]

    const handleFlip = () => {
        setIsFlipped(true)
    }

    const handleNext = () => {
        if (currentCardIndex + 1 < cards.length) {
            setCurrentCardIndex(currentCardIndex + 1)
            setIsFlipped(false)
        }else{
            const restart = window.confirm("Restart the deck?")
            if(restart) {
                setCurrentCardIndex(0)
                setIsFlipped(false)
            }else{
                history.push("/")
            }
        }
    }
    return (
        <h1>Study</h1>
        // <div>
        //     <nav aria-label="breadcrumb">
        //         <ol className="breadcrumb">
        //             <li className="breadcrumb-item">
        //                 <Link to="/">Home</Link>
        //             </li>
        //             <li className="breadcrumb-item">
        //                 <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        //             </li>
        //             <li className="breadcrumb-item active" aria-current="page">
        //                 Study
        //             </li>
        //         </ol>
        //     </nav>
        //     <h2> Study: {deck.name} </h2>
        //     <div>
        //         Card {currentCardIndex + 1} of {cards.length}
        //     </div>
        //     <div className ="card">
        //         <div className = "card-body">
        //             {isFlipped ? (
        //                 <p>{currentCard.back}</p>
        //             ) : (
        //                 <p>{currentCard.front}</p>
        //             )}
        //         </div>
        //     </div>
        //     <button onClick={handleFlip}>Flip</button>
        //     <button onClick={handleNext}>Next</button>
        // </div>
    )
}
export default Study