import { useEffect, useState } from "react"
import {Shape} from "../components/Shape"

export const Card = ({card, shape}) => {
  const [handledShape, setHandledShape] = useState(card.card.shape)

  useEffect(() => {
    if(card.card.shape.form == '') setHandledShape(null) 
  }, [card])

  const imgSrc = (url) => {
    return `/src/pictures/${url}.png`
  }

  const handleShape = () => {
    if(shape.shape == null) {
      if(card.card.shape.form == '') return
      shape.setShape(card.card.shape)
      card.card.selected = true
      // showPossibleMoves()
    } else {
      if(shape.shape == card.card.shape) {
        shape.setShape(null)
        card.card.selected = null
      } else if(card.card.shape.form == '') {
        card.card.shape = shape.shape
        setHandledShape(shape.shape)
        shape.setShape(null)
        shape.removeSelectedShape()
      }
    }
  }

  return(
    <div className="card" onClick={() => handleShape()}>     
      <div>
        <div className={`value ${card.card.color}`}>
          {card.card.value}
        </div>          
        <div className="winzard">
          <Shape shape={handledShape}/>
          <img src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
        </div>
        <div className={`value upSideDown ${card.card.color}`}>
          {card.card.value}
        </div>
      </div>         
    </div>
  )
}