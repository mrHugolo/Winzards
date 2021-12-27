import { useContext, useState, useEffect } from "react"
import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { Card } from "../components/Card"
import { Rules } from "../components/Rules"
import { Help } from "../components/Help"
import { useHistory } from "react-router-dom"

import { GameOver } from "../utils/GameOver"

export const Solitaire = () => {
  const { deck55 } = useContext(DeckContext)
  const { bag45 } = useContext(ShapeContext)
  const [deck, setDeck] = useState([])
  const [bag, setBag] = useState([])
  const [shape, setShape] = useState(null)
  const [turn, setTurn] = useState(0)
  const [newRound, setNewRound] = useState(null)
  const [points, setPoints] = useState(0)
  const history = useHistory()

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
    if (bag45.length == 45) setBag(bag45)
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
    if (!card) return

    card.selected = null
    if (card.shape == "empty") {
      let avg = deck[card.id];
      deck[card.id] = deck[c.card.id];
      deck[c.card.id] = avg;
      let idx = card.id
      card.id = c.card.id
      c.card.id = idx
    }
    const tempCard = { ...card }
    const obj = {
      form: tempCard.shape.form,
      color: tempCard.shape.color
    }

    if (card != c.card) {
      card.shape = {
        form: '',
        color: ''
      }
    }


    if (c) {
      setTurn(p => p + 1)
      givePoints(obj)
    }

  }

  const givePoints = (obj) => {
    if (turn == 2) {
      addShape()
    }
    if (!obj.form || obj.form == "triangle") return
    const arr = deck.map(c => {
      if (c.shape.form == obj.form && c.shape.color == obj.color) {
        return c.id
      }
    }).filter(it => it)
    let p = pointsx(5, arr) || pointsx(4, arr) || pointsx(3, arr)
    setPoints(prev => prev + p)
  }

  const pointsx = (x, arr) => {
    if (arr.length < x) return 0
    const tempArr = arr.slice()
    const arr5x = tempArr[5 - x]
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i] -= arr5x
    }
    if (x == 5) {
      if (
        isSmallArrayInBigArray([0, 7, 14, 15, 16], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 7, 12, 13, 14], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 7, 13, 14, 15], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2, 8, 15], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 7, 8, 9, 14], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2, 7, 14], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 5, 6, 7, 14], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2, 9, 16], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2, 3, 4], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 7, 14, 21, 28], tempArr, arr5x)
      ) {
        return 5
      }
    }
    else if (x == 4) {
      if (
        isSmallArrayInBigArray([0, 7, 14, 21], tempArr, arr5x) ||
        isSmallArrayInBigArray([-7, 0, 7, 14], tempArr, arr5x) ||
        isSmallArrayInBigArray([-1, 0, 1, 2], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2, 3], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 7, 8], tempArr, arr5x) ||
        isSmallArrayInBigArray([-1, 0, 6, 7], tempArr, arr5x)
      ) {
        return 4
      }
    }
    else if (x == 3) {
      if (
        isSmallArrayInBigArray([-14, -7, 0], tempArr, arr5x) ||
        isSmallArrayInBigArray([-2, -1, 0], tempArr, arr5x) ||
        isSmallArrayInBigArray([-1, 0, -1], tempArr, arr5x) ||
        isSmallArrayInBigArray([-7, 0, 7], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 1, 2], tempArr, arr5x) ||
        isSmallArrayInBigArray([0, 7, 14], tempArr, arr5x)
      ) {
        return 3
      }
    }
    return 0
  }

  const isSmallArrayInBigArray = (arrSmall, arrBig, amplifier) => {
    let correctArr = arrSmall.slice()
    while (arrSmall.length) {
      if (!arrBig.includes(arrSmall.splice(0, 1)[0])) {
        return false
      }
    }
    for (let i = 0; i < correctArr.length; i++) {
      correctArr[i] += amplifier
    }
    grayOutShapes(correctArr)
    return true
  }

  const addShape = () => {
    const shape = bag.splice(0, 1)[0]
    let arr = deck.filter(c => c.shape.form == "" && c.emotion == "Average" && c.color == (shape.color.charAt(0).toUpperCase() + shape.color.slice(1)))
    if (arr.length == 0) {
      GameOver(history, points)
      return
    }
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    setNewRound(shape)
  }

  const showPossibleMoves = (card) => {
    let arr = []
    let indexes = []
    if (card.shape.form == "triangle") {
      const i = card.id

      if (card.emotion == "Powerfull") {
        for (let nr = 0; nr < 49; nr++) indexes[nr] = nr
      }
      else if (card.emotion == "Average") {
        indexes = indexesAround(i)
      }
      else if (card.emotion == "Sad") {
        const idx = card.id
        const rest = Math.abs((24 - idx) % 7)

        if (idx == 24) return
        else if (rest >= 1 && rest <= 3 && idx < 24) indexes = [idx + 1, (idx < 21 ? idx + 7 : idx - 6), idx + 8]
        else if (rest >= 1 && rest <= 3 && idx > 24) indexes = [idx - 1, (idx > 27 ? idx - 7 : idx + 6), idx - 8]
        else if (rest >= 4 && rest <= 6 && idx < 24) indexes = [idx - 1, idx + 6, idx + 7]
        else if (rest >= 4 && rest <= 6 && idx > 24) indexes = [idx + 1, idx - 6, idx - 7]
        else if (rest == 0 && idx < 24) indexes = [idx + 6, idx + 7, idx + 8]
        else if (rest == 0 && idx > 24) indexes = [idx - 6, idx - 7, idx - 8]
      }
    }
    else if (card.shape.form == "square" || card.shape.form == "circle") {
      const playerCard = findPlayerCard(card.shape.color, card.id)
      if (!playerCard) return

      if (playerCard.emotion == "Powerfull") {
        for (let nr = 0; nr < 49; nr++) indexes[nr] = nr
      }
      else if (playerCard.emotion == "Average") {
        const i = playerCard.id
        indexes = indexesAround(i)
        if (indexes.length == 8) indexes.push(2 * card.id - i)
      }
      else if (playerCard.emotion == "Sad") return
    }
    else if (card.shape.form == "") {
      if (card.emotion == "Powerfull") {
        for (let nr = 0; nr < 49; nr++) indexes[nr] = nr
      }
      else if (card.emotion == "Average") {
        const i = card.id
        indexes = indexesAround(i)
      }
    }

    arr = deck.filter(c => c.shape.form == "" && indexes.includes(c.id))
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    return arr.length > 0
  }

  const grayOutShapes = (arr) => {
    deck.filter(c => arr.includes(c.id)).forEach(it => {
      it.shape.color = "gray"
      it.shape.emotion = "Dead"
    })
  }

  const findPlayerCard = (color, i) => {
    const indexes = indexesAround(i)
    return deck.filter(c => c.shape.color == color && c.color == (color.charAt(0).toUpperCase() + color.slice(1)) && c.shape.form == "triangle" && indexes.includes(c.id))[0]
  }

  const indexesAround = (i) => {
    let indexes = [i - 8, i - 7, i - 6, i - 1, i + 1, i + 6, i + 7, i + 8]
    if (i % 7 == 0) indexes = [i - 7, i - 6, i + 1, i + 7, i + 8]
    else if (i % 7 == 6) indexes = [i - 8, i - 7, i - 1, i + 6, i + 7]
    return indexes
  }

  return (
    <div id="Solitaire" className="wrapper noSelect">
      <div className="giga">
        Moves: {turn}
      </div>
      <div className="board">
        {deck.length == 49 && deck?.map(card => (
          <div className="pointer" key={card.id}>
            <Card
              card={{ card }}
              shape={{ setShape, shape, removeSelectedShape }}
              game={{ game: "Solitaire", showPossibleMoves, newRound, setNewRound, setTurn }}
            />
          </div>
        ))}
      </div>
      <div className="giga">
        Points: {points}
      </div>
      <div>
        <Rules game={{name:"Solitaire"}}/>
      </div>
      <div>
        <Help game={{ name: "Solitaire" }} />
      </div>
    </div>
  )
}