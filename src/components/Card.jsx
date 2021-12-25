import { useEffect, useState } from "react"
import {Shape} from "../components/Shape"

export const Card = ({card, shape, game}) => {
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
      setHandledShape(game.newRound)
      game.setNewRound(null)
      shape.removeSelectedShape()
      game.setTurn(0)
      return
    }
    if(shape.shape == null) {
      if (!showPossibleMoves()) return
      shape.setShape(card.card.shape || "empty")
      if(card.card.shape.form == "") card.card.shape = "empty"
      card.card.selected = "selected"
    } else {
      if(shape.shape == card.card.shape) {
        shape.setShape(null)
        card.card.selected = null
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
    <div className={`card ${card.card.highlighted} ${card.card.selected}`} onClick={() => handleClick()}>     
      <div className={`value ${card.card.color}`}>
        {card.card.value}
      </div>
      <div className="winzard">
        <Shape shape={handledShape} />
        <img src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
      </div>
      <div className={`value right ${card.card.color}`}>
        {card.card.value}
      </div>         
    </div>
  )
}