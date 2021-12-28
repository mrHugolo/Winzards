import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import css from "../cssModules/Main.module.css"
import wcss from "../cssModules/Wall.module.css"
import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { Card } from "../components/Card"

export const Wall = () => {
  const { deck55 } = useContext(DeckContext)
  const [deck, setDeck] = useState()
  const [shape, setShape] = useState({})

  useEffect(() => {
    setDeck(deck55?.slice(0, 50))
  }, [deck55])

  const removeSelectedShape = () => {

  }

  const showPossibleMoves = () => {

  }

  return(
    <div className={wcss.wrapper}>
      <div className={wcss.board}>
        {deck?.length == 50 && deck?.map(card => (
          <div className={css.pointer} key={card.name+card.value}>
            <Card
              card={{ card }}
              shape={{ setShape, shape, removeSelectedShape }}
              game={{ game: "Solitaire", showPossibleMoves }}
              cssx={{css: wcss}}
            />
          </div>
        ))}
      </div>
      <div className={css.playerImg}>
        <img src="./src/pictures/Zurf-Powerfull.png"/>
      </div>
      <div className={css.playerImg}>
        <img src="./src/pictures/Zapp-Powerfull.png" />
      </div>
    </div>
  )
}