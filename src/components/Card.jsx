import { useEffect, useState } from "react"

import css from "../cssModules/Main.module.css"
import {Shape} from "../components/Shape"

export const Card = ({card, shape, game, cssx}) => {
  const [handledShape, setHandledShape] = useState(card.card.shape)

  useEffect(() => {
    if(card?.card?.shape?.form == '') setHandledShape(null) 
  }, [card])

  const imgSrc = (url) => {
    return `/src/pictures/${url}.png`
  }

  const handleClick = () => {
    if(game.newRound) {
      if(!card.card.highlighted) return
      card.card.shape = game.newRound
      card.card.selected = "selected"
      setHandledShape(game.newRound)
      game.setNewRound(null)
      shape.removeSelectedShape(card)
      game.setTurn(0)
      return
    }
    if(shape.shape == null) {
      if (!game.showPossibleMoves(card.card)) return
      shape.setShape(card.card.shape || "empty")
      if(card.card.shape.form == "") card.card.shape = "empty"
      card.card.selected = "selected"
    } else {
      if((shape.shape == card.card.shape) || (shape.shape.form == "" && card.card.shape == "empty")) {
        shape.setShape(null)
        card.card.selected = null
        card.card.shape = card.card.shape == "empty" ? { form: '', color: '' } : card.card.shape
        shape.removeSelectedShape()
      } else if(card.card.highlighted) {
        card.card.shape = shape.shape
        setHandledShape(shape.shape)
        shape.setShape(null)
        shape.removeSelectedShape(card)
      }
    }
  }

  return(
    <div className={`${cssx.css.card} ${css[card.card.highlighted]} ${css[card.card.selected]}`} onClick={() => handleClick()}>
      <div className={`${css.value} ${css[card.card.color]}`} >
        {card.card.value}
      </div>
      <div className={css.winzard}>
        <Shape shape={handledShape} cssx={cssx} />
        <img className={cssx.css.winzardImg} src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
      </div>
      <div className={`${css.value} ${css.right} ${css[card?.card?.color]}`}>
        {card.card.value}
      </div>
    </div>
  )
}