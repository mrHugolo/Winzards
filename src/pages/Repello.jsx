import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { findPlayerCard, indexesAround } from "../utils/Utils"
import { GameOver } from "../utils/GameOver"
import { CardWithoutValue } from "../components/CardWithoutValue"
import { PickCharachter } from "../components/PickCharachter"

import css from "../cssModules/Main.module.css"
import rcss from "../cssModules/Repello.module.css"

export const Repello = () => {
  const { deck55, shuffle } = useContext(DeckContext)
  const [deck, setDeck] = useState([])
  const [shape, setShape] = useState(null)
  const [newRound, setNewRound] = useState(null)
  const [playerTurn, setPlayerTurn] = useState(0)
  const [turn, setTurn] = useState(0)
  const [players, setPlayers] = useState([])
  const [playerTracker, setPlayerTracker] = useState(1)

  useEffect(() => {
    if(deck55?.length == 55) {
      setDeck(createBoard())
    }
  }, [deck55])

  useEffect(() => {
    if (!playerTurn) return
    document.getElementById(rcss[`playerImg${playerTurn}`]).style.boxShadow = "0 0 0 4px " + players[playerTurn - 1].shineColor.split('shine')[1]
    document.getElementById(rcss[`playerImg${ playerTurn == 1 ? players.length : playerTurn - 1}`]).style.boxShadow = null
    showPossibleMoves()
  }, [playerTurn])

  const createBoard = () => {
    let cards = deck55.slice().filter(c => !(c.name == "Frozt" && (c.emotion == "Sad" || c.emotion == "Powerfull")))
    for(let i = 0; i < 32; i++) {
      cards.push({name: "Frozt", color: "White", emotion: "Average", shape: {form: "", color: ""}})
    }
    cards = shuffle(cards)
    cards.forEach((c, i) => {
      c._id = i
    })
    return cards
  }

  const startGame = () => {
    setPlayerTracker("firstRound")
    setPlayerTurn(1)
  }

  const removeSelectedShape = (c) => {
    deck.forEach((it, i) => {
      it.highlighted = null
    })
    if (playerTracker == "firstRound") {
      if(playerTurn == players.length) {
        setPlayerTracker(null)
      }
      if(!repel()) {
        setPlayerTurn(p => playerTurn == players.length ? 1 : p + 1)
      } else {
        highlightRepellables()
      }
    }
    setDeck(deck.slice())
  }

  const showPossibleMoves = (card) => {
    const p = players[playerTurn - 1]
    let arr = []
    let indexes = []
    if(card == undefined) {
      if(!p.isOnBoard) {
        deck.filter(c => p.src.includes(c.name)).forEach(it => {
          indexes.push(it._id)
        })
      }
    }
    arr = deck.filter(c => c.shape.form == "" && indexes.includes(c._id))
    arr.forEach(it => {
      it.highlighted = "highlighted"
    })
    setDeck(deck.slice())
    return arr.length > 0
  }

  const highlightRepellables = () => {

  }

  const repel = () => {
    let arr = deck.map(c => {
      if (c.shape.form != "") return c._id
    }).filter(id => id || id == 0)
    let isRepelable = false
    let i = arr.length - 1
    while(i > 0) {
      if(arr[i] - arr[i - 1] <= 10) {
        for (let ii = i - 1; ii >= 0; ii--) {
          if (arr[i] - arr[ii] <= 10) {
            let yi = Math.floor(arr[i] / 9)
            let xi = arr[i] % 9
            let yii = Math.floor(arr[ii] / 9)
            let xii = arr[ii] % 9
            if (Math.abs(xi - xii) <= 1 && Math.abs(yi - yii) <= 1) {
              let dir = repelDirection(xi-xii, yi-yii)
              deck[arr[i]].repel = dir
              deck[arr[ii]].repel = 10 - dir
              isRepelable = true
            }
          } else { break }
        }
      }
      i--
    }
    setDeck(deck.slice())
    return isRepelable
  }

  const repelDirection = (dx, dy) => {
    if(dx == -1 && dy == -1) return 1
    if(dx == 0 && dy == -1) return 2
    if(dx == 1 && dy == -1) return 3
    if(dx == -1 && dy == 0) return 4
    if(dx == 1 && dy == 0) return 6
    if(dx == -1 && dy == 1) return 7
    if(dx == 0 && dy == 1) return 8
    if(dx == 1 && dy == 1) return 9
  }

  const assignCharachter = (char) => {
    let arr = players.slice()
    char.points = 0
    char.isOnBoard = false
    arr.push(char)
    setPlayers(arr)
    if (playerTracker != 4) {
      setPlayerTracker(p => p + 1)
    } else {
      startGame()
    }
  }

  const instructions = () => {
    switch(turn) {
      case 0: return "Place your piece"
      case 1: return "Switch a card"
      case 2: return "Move your piece one step"
      case 3: return "Repel touching symbols"
    }
  }

  return (
    <div className={css.noSelect}>
      <PickCharachter cssx={{ css: rcss }} game={{ startGame, assignCharachter, minPlayers: 2, maxPlayers: 4 }} hide={{hide: 'Frozt'}} />
      <div className={rcss.wrapper}>
        <div className={`${!playerTurn && css.hidden} ${rcss.turn}`}>
          <div>{players[playerTurn - 1]?.src?.substring(15)?.split('-')[0]}'s turn</div>
          <div>{instructions()}</div>
        </div>
        <div className={`${rcss.board} ${css.board}`}>
          {deck?.length == 81 && deck.map((card, i) => (
            <div id={`Repello-${i}`} className={css.pointer} key={`Repello-${card._id}`}> 
              <CardWithoutValue
                card={{ card }}
                shape={{ setShape, shape, removeSelectedShape }}
                game={{ game: "Repello", showPossibleMoves, newRound, setNewRound, turn, setTurn }}
                player={{player: players[playerTurn - 1]}}
                cssx={{ css: rcss }}
              />
            </div>
          ))}
        </div>
        {players?.length && players.map((p, i) => (
          players?.length >= (i + 1) && (
            <div key={`playerImg${i + 1}`} className={rcss[`playerImg${i + 1}`]}>
              <div >
                <div className={`${i <= 1 && css.hide} ${css.center}`}>
                  Points: {p.points}
                </div>
                <div className={rcss.playerImg} id={rcss[`playerImg${i + 1}`]}>
                  <img src={p.src} />
                </div>
                <div className={`${i > 1 && css.hide} ${css.center}`}>
                  Points: {p.points}
                </div>
              </div>
            </div>
          )
        ))} 
      </div>
    </div>
  )
}