import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import css from "../cssModules/Main.module.css"
import wcss from "../cssModules/Wall.module.css"
import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { Card } from "../components/Card"
import { PickCharachter } from "../components/PickCharachter"

import { findPlayerCard, indexesAround } from "../utils/Utils"
import { GameOver } from "../utils/GameOver"

export const Wall = () => {
  const { wallDeck } = useContext(DeckContext)
  const { bag45 } = useContext(ShapeContext)
  const [deck, setDeck] = useState()
  const [shape, setShape] = useState(null)
  const [newRound, setNewRound] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(0)
  const [turn, setTurn] = useState(0)
  const [firstRound, setFirstRound] = useState(true)
  const [players, setPlayers] = useState([])
  const [playerTracker, setPlayerTracker] = useState(1)

  const history = useHistory()

  useEffect(() => {
    setDeck(createBoard(wallDeck))
  }, [wallDeck])

  useEffect(() => {
    if(!playerTurn) return
    document.getElementById(wcss[`Img${playerTurn}`]).style.boxShadow = "0 0 0 4px " + players[playerTurn-1].shineColor.split('shine')[1]
    document.getElementById(wcss[`Img${playerTurn == 1 ? 2 : 1}`]).style.boxShadow = null
  }, [playerTurn])

  const createBoard = (cards) => {
    const bag = bag45.slice()
    // TODO: see if the number of circles per color is less than the cards of the same color and at least one average
    cards.forEach((c, i) => {
      
      // triangles
      if (i == 40 || i == 49) c.shape = { form: "triangle", color: "blue" }
      if (i == 41 || i == 48) c.shape = { form: "triangle", color: "green" }
      if (i == 42 || i == 47) c.shape = { form: "triangle", color: "red" }
      if (i == 43 || i == 46) c.shape = { form: "triangle", color: "yellow" }
      if (i == 44 || i == 45) c.shape = { form: "triangle", color: "white" }

      // squares
      if (i >= 30 && i <= 39) {
        const idx = bag.indexOf(bag.filter(s => s.form == "square")[0])
        c.shape = bag.splice(idx, 1)[0]
      }

      // circles
      if (i >= 10 && i <= 19) {
        const idx = bag.indexOf(bag.filter(s => s.form == "circle")[0])
        let card = bag.splice(idx, 1)[0]
        c.shape = card
      }
    })
    return cards
  }

  const startGame = () => {
    let redCount1 = deck.filter((c, i) => i % 10 < 5 && c.emotion == "Powerfull" && c.color == "Red").length
    let redCount2 = deck.filter((c, i) => i % 10 >= 5 && c.emotion == "Powerfull" && c.color == "Red").length
    if(redCount1 != redCount2) return redCount1 > redCount2 ? 1 : 2
    redCount1 = deck.filter((c, i) => i % 10 < 5 && c.emotion == "Average" && c.color == "Red").length
    redCount2 = deck.filter((c, i) => i % 10 >= 5 && c.emotion == "Average" && c.color == "Red").length
    if (redCount1 != redCount2) return redCount1 > redCount2 ? 1 : 2
    redCount1 = deck.filter((c, i) => i % 10 < 5 && c.emotion == "Sad" && c.color == "Red").length
    redCount2 = deck.filter((c, i) => i % 10 >= 5 && c.emotion == "Sad" && c.color == "Red").length
    if (redCount1 != redCount2) return redCount1 > redCount2 ? 1 : 2
    return 1
  }

  const removeSelectedShape = (c) => {
    deck.forEach(it => {
      it.highlighted = null
    })
    let card = deck.filter(c => c.selected)[0]
    if(!card) return

    card.selected = null
    if (card.shape == "empty") {
      let avg = deck[card.id];
      deck[card.id] = deck[c.card.id];
      deck[c.card.id] = avg;
      let idx = card.id
      card.id = c.card.id
      c.card.id = idx
    }
    
    if (card != c.card) {
      card.shape = {
        form: '',
        color: ''
      }
    }

    if (c) {
      setTurn(p => p + 1)
      if(turn == 2 || (turn == 1 && firstRound)) highlightRemovableObjs("removeCard")
    }
  }

  const showPossibleMoves = (card) => {
    if(card.shineColor != players[playerTurn - 1].shineColor) return
    let arr = []
    let indexes = []
    if (card.shape.form == "triangle") {
      const i = card.id

      if (card.emotion == "Powerfull") {
        for (let nr = 0; nr < 50; nr++) indexes[nr] = nr
      }
      else if (card.emotion == "Average") {
        indexes = indexesAround(i, 10)
      }
      else if (card.emotion == "Sad") {
        indexes = [i + 10, i - 10]
      }
    }
    else if (card.shape.form == "square" || card.shape.form == "circle") {
      const playerCard = findPlayerCard(card.shape.color, card.id, deck, 10, "Wall")
      if (!playerCard || playerCard.shineColor != players[playerTurn - 1].shineColor) return

      const i = playerCard.id
      const push = 2 * card.id - i
      if (playerCard.emotion == "Powerfull") {
        for (let nr = 0; nr < 50; nr++) indexes[nr] = nr
      }
      else if (playerCard.emotion == "Average") {
        indexes = indexesAround(i, 10)
        if (i % 10 - card.id % 10 == card.id % 10 - push % 10 && Math.floor(i / 10) - Math.floor(card.id / 10) == Math.floor(card.id / 10) - Math.floor(push / 10)) indexes.push(push)
      }
      else if (playerCard.emotion == "Sad") {
        if(Math.abs(i - card.id) == 10) indexes = [push]
      }
    }
    else if (card.shape.form == "") {
      if (card.emotion == "Powerfull") {
        for (let nr = 0; nr < 50; nr++) indexes[nr] = nr
      }
      else if (card.emotion == "Average") {
        const i = card.id
        indexes = indexesAround(i, 10)
      }
    }
    arr = deck.filter(c => (c.shineColor == card.shineColor || card.shape.form == "square") && c.shape.form == "" && indexes.includes(c.id))
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    return arr.length > 0
  }

  const highlightRemovableObjs = (objName) => {
    let arr = []
    if(objName == "removeCard") {
      arr = deck.filter(c => c.shineColor == players[playerTurn - 1].shineColor && c.shape.form == "circle" && c.shape.color == c.color.toLowerCase() && (players[playerTurn - 1].column == undefined || c.id % 10 == players[playerTurn - 1].column))
    } else if(objName == "removeSquare") {
      arr = deck.filter(c => c.shineColor == players[playerTurn - 1].shineColor && c.shape.form == "square")
    }
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    if(arr.length) {
      setNewRound(objName)
    } else {
      switchPlayer()
    }
  }

  const assignCharachter = (char) => {
    deck.forEach((c, i) => {
      if ((i % 10 < 5 && playerTracker == 1 || i % 10 >= 5 && playerTracker == 2)) c.shineColor = char.shineColor
    })
    let arr = players.slice()
    arr.push(char)
    setPlayers(arr)
    if(playerTracker == 1) {
      setPlayerTracker(2)
    } else {
      setPlayerTurn(startGame())
    }
  }

  const removeObj = (card) => {
    let c = card.card
    if(c.shape == "removeCard") {
      players[playerTurn - 1].column = c.id % 10
      players[playerTurn - 1].removedCards = players[playerTurn - 1].removedCards == undefined ? 1 : players[playerTurn - 1].removedCards + 1
      document.getElementById(`Wall-${c.id}`).style.visibility = "hidden"
      if (players[playerTurn - 1].removedCards == 5) {
        setTimeout(()=> {
          GameOver(history, players[playerTurn - 1].src?.substring(15)?.split('-')[0], "Wall")
        }, 250)
      }
    }
    else if(c.shape == "removeSquare") {
      c.shape = {form: "", color: ""} 
    }
    switchPlayer()
  }

  const switchPlayer = () => {
    setTurn(0)
    setPlayerTurn(p => p == 1 ? 2 : 1)
    if(firstRound) setFirstRound(false)
  }

  const handleBtnClick = () => {
    if(turn == 0) {
      highlightRemovableObjs("removeSquare")
    }
    else if((firstRound && turn == 2) || (!firstRound && turn == 3)) {
      setNewRound(null)
      removeSelectedShape()
      switchPlayer()
    }
  }

  const getName = (otherPlayer) => {
    return players[Math.abs(playerTurn - (otherPlayer ? 2 : 1))]?.src?.substring(15)?.split('-')[0]
  }

  return(
    <div className={css.noSelect}>
      <PickCharachter cssx={{ css: wcss }} game={{assignCharachter, minPlayers: 2, maxPlayers: 2}}/>
      <div className={wcss.wrapper}>
        {players.length == 2 && (
          <div className={wcss.info}>
            <div>{getName() + "'s turn"}</div>
            {turn}
            <button className={`${css.pointer} ${wcss.btn} ${wcss.btnPass} ${(turn == 1 || !firstRound && turn == 2) && css.hide}`} onClick={() => handleBtnClick()}>
              <span>{turn != 0 ? 'Pass' : `Ask ${getName(true)}`}</span>
              <span>{turn == 0 && (<div> to remove a box</div>)}</span>
            </button>
          </div>
        )}
        <div className={`${wcss.board} ${css.board}`}>
          {deck?.length == 50 && deck?.map(card => (
            <div id={`Wall-${card.id}`} className={css.pointer} key={card.id}>
              <Card
                card={{ card, showShineColor: (card.id % 10 < 5 && playerTurn == 1 || card.id % 10 >= 5 && playerTurn == 2) }}
                shape={{ setShape, shape, removeSelectedShape }}
                game={{ game: "Wall", showPossibleMoves, newRound, setNewRound, setTurn, removeObj }}
                cssx={{ css: wcss }}
              />
            </div>
          ))}
        </div>
        <div id={wcss.playerImg1} className={wcss.playerImg} onClick={() => setPlayerTurn(p => p == 1 ? 2 : 1)}>
          {players?.length >= 1 && (<img src={players[0].src} />)}
        </div>
        <div id={wcss.playerImg2} className={wcss.playerImg} onClick={() => setPlayerTurn(p => p == 1 ? 2 : 1)}>
          {players?.length >= 2 && (<img src={players[1].src} />)}
        </div>
      </div>
    </div>
  )
}