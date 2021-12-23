import { useContext, useState, useEffect } from "react"
import { DeckContext } from "../contexts/DeckContext"
import { Card } from "../components/Card"

export const Solitaire = () => {
  const { deck55 } = useContext(DeckContext)
  const [deck, setDeck] = useState([])
  const [shape, setShape] = useState({})

  useEffect(() => {
    if(deck55.length == 55) {
      setDeck(deck55.slice(0, 49))
      setShape("square")
    }
  }, [deck55])

  return (
    <div className="wrapper">
      {deck && deck?.map((card, idx) => (
        <div key={card.id}>
          <Card card={{ card, idx }} shape={{setShape, shape}}
         />
        </div>
      ))}
    </div>
  )
}