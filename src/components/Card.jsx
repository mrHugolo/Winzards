import { useEffect, useState } from "react"

import css from "../cssModules/Main.module.css"
import {Shape} from "../components/Shape"

export const Card = ({card, shape, game}) => {
  const [handledShape, setHandledShape] = useState(card.card.shape)
  const [cssColor, setCssColor] = useState('')

  useEffect(() => {
    if(card?.card?.shape?.form == '') setHandledShape(null) 
    setCssColor(card?.card?.color)
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
      if (!showPossibleMoves()) return
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

  const showPossibleMoves = () => {
    switch(game.game) {
      case "Solitaire": {
        return game.showPossibleMoves(card.card)
        break;
      }
    }
  }

  return(
    <div className={`${css.card} ${card.card.highlighted && css.highlighted} ${card.card.selected && css.selected}`} onClick={() => handleClick()}>     
      <div className={`${css.value} ${css[cssColor]}`} >
        {card.card.value}
      </div>
      <div className={css.winzard}>
        <Shape shape={handledShape} />
        <img src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
      </div>
      <div className={`${css.value} ${css.right} ${css[cssColor]}`}>
        {card.card.value}
      </div>         
    </div>
  )
}