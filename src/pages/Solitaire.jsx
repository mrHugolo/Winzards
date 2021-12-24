import { useContext, useState, useEffect } from "react"
import { DeckContext } from "../contexts/DeckContext"
import { Card } from "../components/Card"

export const Solitaire = () => {
  const { deck55 } = useContext(DeckContext)
  const [deck, setDeck] = useState([])
  const [shape, setShape] = useState(null)

  useEffect(() => {
    if (deck55.length == 55) {
      deck55.forEach((c, i) => {
        c.id = i
      })
      setDeck(deck55.slice(0, 49))
    }
  }, [deck55])

  const removeSelectedShape = () => {
    deck.forEach(it => {
      it.highlighted = null
    })
    let card = deck.filter(c => c.selected)[0]
    if(!card) return
    card.selected = null
    card.shape = {
      form: '',
      color: ''
    }
  }

  const showPossibleMoves = (card) => {
    let arr = []
    let indexes = []
    if (card.shape.form == "triangle") {
      const i = card.id

      if(card.emotion == "Powerfull" ) {
        for(let nr = 0; nr < 49; nr++) indexes[nr] = nr
      }
      else if(card.emotion == "Average") {
        indexes = [i-8, i-7, i-6, i-1, i+1, i+6, i+7, i+8]
      }
      else if(card.emotion == "Sad") {
        const idx = card.id
        const rest = Math.abs((24 - idx) % 7)

        if(idx == 24) return
        else if(rest >= 1 && rest <= 3 && idx < 24) indexes = [idx + 1, (idx < 21 ? idx + 7 : idx - 6), idx + 8]
        else if(rest >= 1 && rest <= 3 && idx > 24) indexes = [idx - 1, (idx > 27 ? idx - 7 : idx + 6), idx - 8]
        else if(rest >= 4 && rest <= 6 && idx < 24) indexes = [idx - 1, idx + 6, idx + 7]
        else if(rest >= 4 && rest <= 6 && idx > 24) indexes = [idx + 1, idx - 6, idx - 7]
        else if(rest == 0 && idx < 24) indexes = [idx + 6, idx + 7, idx + 8]
        else if(rest == 0 && idx > 24) indexes = [idx - 6, idx - 7, idx - 8]
      }
    }
    else if (card.shape.form == "square" || card.shape.form == "circle") {
      const playerCard = findPlayerCard(card.shape.color, card.id)
      if(!playerCard) return
      
      if(playerCard.emotion == "Powerfull") {
        for (let nr = 0; nr < 49; nr++) indexes[nr] = nr
      }
      else if(playerCard.emotion == "Average") {
        const i =  playerCard.id
        indexes = [i - 8, i - 7, i - 6, i - 1, i + 1, i + 6, i + 7, i + 8, 2 * card.id - i]
      }
      else if(playerCard.emotion == "Sad") return
    }

    arr = deck.filter(c => c.shape.form == "" && indexes.includes(c.id))
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    return arr.length > 0
  }

  const findPlayerCard = (color, i) => {
    const indexes = [i - 8, i - 7, i - 6, i - 1, i + 1, i + 6, i + 7, i + 8]
    return deck.filter(c => c.shape.color == color && c.shape.form == "triangle" && indexes.includes(c.id))[0]
  }

  return (
    <div className="wrapper noSelect">
      {deck && deck?.map(card => (
        <div key={card.id}>
          <Card card={{ card }} shape={{ setShape, shape, removeSelectedShape }} game={{ game: "Solitaire", showPossibleMoves}}
         />
        </div>
      ))}
    </div>
  )
}