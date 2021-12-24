import { useContext, useState, useEffect } from "react"
import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { Card } from "../components/Card"

export const Solitaire = () => {
  const { deck55 } = useContext(DeckContext)
  const { bag45 } = useContext(ShapeContext)
  const [deck, setDeck] = useState([])
  const [bag, setBag] = useState([])
  const [shape, setShape] = useState(null)
  const [turn, setTurn] = useState(1)
  const [points, setPoints] = useState(0)

  const buildBoard = (cards) => {
    const idx = cards.indexOf(cards.filter(c => c.emotion == "Average")[0])
    let avg = cards[idx];
    cards[idx] = cards[24];
    cards[24] = avg;
    cards.forEach((c, i) => {
      c.id = i

      // triangles
      if (i == 3) c.shape = { form: "triangle", color: "blue" }
      if (i == 21) c.shape = { form: "triangle", color: "green" }
      if (i == 24) c.shape = { form: "triangle", color: "red" }
      if (i == 27) c.shape = { form: "triangle", color: "yellow" }
      if (i == 45) c.shape = { form: "triangle", color: "white" }

      // squares
      if (i == 0 || i == 6 || i == 42 || i == 48) {
        const idx = bag.indexOf(bag.filter(s => s.form == "square")[0])
        c.shape = bag.splice(idx, 1)[0]
      }

      // circles
      if (i == 9 || i == 11 || i == 37 || i == 39) {
        const idx = bag.indexOf(bag.filter(s => s.form == "circle")[0])
        c.shape = bag.splice(idx, 1)[0]
      }
      

    })
    return cards.slice(0, 49)
  }

  useEffect(() => {
    if(bag45.length == 45) setBag(bag45)
  }, [bag45])

  useEffect(() => {
    if (deck55.length == 55 && bag.length == 45) {
      setDeck(buildBoard(deck55))
    }
  }, [deck55, bag])

  const removeSelectedShape = (c) => {
    deck.forEach(it => {
      it.highlighted = null
    })
    let card = deck.filter(c => c.selected)[0]
    if(!card) return
    if(card.shape == "empty") {

      let avg = deck[card.id];
      deck[card.id] = deck[c.card.id];
      deck[c.card.id] = avg;
      let idx = card.id
      card.id = c.card.id
      c.card.id = idx
    }
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
    else if(card.shape.form == "") {
      const i = card.id
      indexes = [i - 8, i - 7, i - 6, i - 1, i + 1, i + 6, i + 7, i + 8]
    }

    arr = deck.filter(c => c.shape.form == "" && indexes.includes(c.id))
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    return arr.length > 0
  }

  const findPlayerCard = (color, i) => {
    const indexes = [i - 8, i - 7, i - 6, i - 1, i + 1, i + 6, i + 7, i + 8]
    return deck.filter(c => c.shape.color == color && c.color == (color.charAt(0).toUpperCase() + color.slice(1)) && c.shape.form == "triangle" && indexes.includes(c.id))[0]
  }

  return (
    <div className="wrapper noSelect">
      {deck.length == 49 && deck?.map(card => (
        <div key={card.id}>
          <Card card={{ card }} shape={{ setShape, shape, removeSelectedShape }} game={{ game: "Solitaire", showPossibleMoves}}
         />
        </div>
      ))}
    </div>
  )
}