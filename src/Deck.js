import React, {useState, useEffect} from "react";
import { readDeck } from "./utils/api";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function Deck() {
    const [deck, setDeck] = useState({name: "", cards:[]})
    const history = useHistory()
    const { deckId } = useParams()
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    useEffect(() => {
        async function loadDeck() {
            try{
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            }catch(error){
                console.error(error)
            }
        }
        loadDeck()
    }, [deckId])
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
      };
    
      const handleNext = () => {
        const newIndex = currentCardIndex + 1;
        
        if(newIndex <deck.cards.length) {
            setCurrentCardIndex(newIndex)
            setIsFlipped(false)
        }else{
            const restart = window.confirm('restart cards? click cancel to return tot he home page.')
            if (restart) {
                setCurrentCardIndex(0)
                setIsFlipped(false)
            }else {
                history.push('/')
            }
        }
    }

        const currentCard = deck.cards[currentCardIndex]

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"> Home  </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to ={`{/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>

            <h2> Study: {deck.name} </h2>
            <h3> {deck.description} </h3>
            <div>Card {currentCardIndex + 1} of {deck.cards.length}</div>
            <div className="card">
                <div className="card-body">
                    {isFlipped? <p>{currentCard?.back}</p> : <p>{currentCard?.front}</p>}
                </div>
            </div>
            <button onClick={handleFlip}>Flip</button>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}
export default Deck