import { useEffect, useState } from "react"
import {Shape} from "../components/Shape"

export const Card = ({card, shape, game}) => {
  const [handledShape, setHandledShape] = useState(card.card.shape)

  useEffect(() => {
    if(card.card.shape.form == '') setHandledShape(null) 
  }, [card])

  const imgSrc = (url) => {
    return `/src/pictures/${url}.png`
  }

  const handleShape = () => {
    if(shape.shape == null) {
      if (card.card.shape.form == '' || !showPossibleMoves()) return
      shape.setShape(card.card.shape)
      card.card.selected = true
    } else {
      if(shape.shape == card.card.shape) {
        shape.setShape(null)
        card.card.selected = null
        shape.removeSelectedShape()
      } else if(card.card.highlighted) {
        card.card.shape = shape.shape
        setHandledShape(shape.shape)
        shape.setShape(null)
        shape.removeSelectedShape()
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
    <div className={`card ${card.card.highlighted}`} onClick={() => handleShape()}>     
      <div>
        <div className={`value ${card.card.color}`}>
          {card.card.value}
        </div>          
        <div className="winzard">
          <Shape shape={handledShape}/>
          <img src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
        </div>
        <div className={`value right ${card.card.color}`}>
          {card.card.value}
        </div>
      </div>         
    </div>
  )
}