import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { findPlayerCard, indexesAround } from "../utils/Utils"
import { GameOver } from "../utils/GameOver"
import { CardWithoutValue } from "../components/CardWithoutValue"
import { Card } from "../components/Card"
import { PickCharachter } from "../components/PickCharachter"

import css from "../cssModules/Main.module.css"
import rcss from "../cssModules/Repello.module.css"

export const Repello = () => {
  const { deck55, shuffle } = useContext(DeckContext)
  const [deck, setDeck] = useState()
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
    setPlayerTurn(1)
  }

  const removeSelectedShape = (c) => {
    
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
    return arr.length > 0
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

  return (
    <div className={css.noSelect}>
      <PickCharachter cssx={{ css: rcss }} game={{ startGame, assignCharachter, minPlayers: 2, maxPlayers: 4 }} hide={{hide: 'Frozt'}} />
      <div className={rcss.wrapper}>
        <div className={rcss.turn}>
          {players[playerTurn - 1]?.src?.substring(15)?.split('-')[0]}'s turn
        </div>
        <div className={`${rcss.board} ${css.board}`}>
          {deck?.length == 81 && deck.map((card, i) => (
            <div id={`Repello-${i}`} className={css.pointer} key={`Repello-${card._id}`}> 
              <CardWithoutValue
                card={{ card }}
                shape={{ setShape, shape, removeSelectedShape }}
                game={{ game: "Repello", showPossibleMoves, newRound, setNewRound, setTurn }}
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