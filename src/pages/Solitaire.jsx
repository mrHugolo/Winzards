import { useContext, useState, useEffect } from "react"
import { DeckContext } from "../contexts/DeckContext"
import { Card } from "../components/Card"

export const Solitaire = () => {
  const { deck55 } = useContext(DeckContext)
  const [deck, setDeck] = useState([])
  const [shape, setShape] = useState(null)

  const removeSelectedShape = () => {
    let card = deck.filter(c => c.selected)[0]
    card.selected = null
    const idx = deck.indexOf(card)
    let tempDeck = deck.slice(0, deck.length)
    card.shape = {
      form: '',
      color: ''
    }
    console.log(tempDeck)
    setDeck(tempDeck)
  }

  useEffect(() => {
    if(deck55.length == 55) {
      setDeck(deck55.slice(0, 49))
    }
  }, [deck55])

  return (
    <div className="wrapper noSelect">
      {deck && deck?.map(card => (
        <div key={card.id}>
          <Card card={{ card }} shape={{ setShape, shape, removeSelectedShape}}
         />
        </div>
      ))}
    </div>
  )
}