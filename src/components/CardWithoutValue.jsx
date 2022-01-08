import { useEffect, useState } from "react"

import css from "../cssModules/Main.module.css"
import { Shape } from "../components/Shape"
import { Arrow } from "../components/Arrow"

export const CardWithoutValue = ({ card, shape, game, player, cssx }) => {
  const [handledShape, setHandledShape] = useState(card.card.shape)

  useEffect(() => {
    if (card?.card?.shape?.form == '') setHandledShape(null)
  }, [card])

  const imgSrc = (url) => {
    return `/src/pictures/${url}.png`
  }

  const handleClick = () => {
    if(game.turn == 0 && card.card.highlighted) {
      card.card.shape = {form: "triangle", color: player.player.shineColor.split("shine")[1].toLowerCase()}
      setHandledShape({ form: "triangle", color: player.player.shineColor.split("shine")[1].toLowerCase() })
      shape.setShape(null)
      shape.removeSelectedShape()
    } 
    // if (shape.shape == null) {
    //   if (!game.showPossibleMoves(card.card)) return
    //   shape.setShape(card.card.shape || "empty")
    //   if (card.card.shape.form == "") card.card.shape = "empty"
    //   card.card.selected = "selected"
    // } else {
    //   if ((shape.shape == card.card.shape) || (shape.shape.form == "" && card.card.shape == "empty")) {
    //     shape.setShape(null)
    //     card.card.selected = null
    //     card.card.shape = card.card.shape == "empty" ? { form: '', color: '' } : card.card.shape
    //     shape.removeSelectedShape()
    //   } else if (card.card.highlighted) {
    //     card.card.shape = shape.shape
    //     setHandledShape(shape.shape)
    //     shape.setShape(null)
    //     shape.removeSelectedShape(card)
    //   }
    // }
  }

  return (
    <div className={`${cssx.css.card} ${card.showShineColor && css[card.card.shineColor]} ${css[card.card.highlighted]} ${css[card.card.selected]}`}
    onClick={() => handleClick()}>
      <Arrow arrow={{ dir: card.card.repel, id: card.card._id }} cssx={cssx}  />
      <div className={cssx.css.winzard}>
        <Shape shape={handledShape} cssx={cssx} />
        <img className={cssx.css.winzardImg} src={imgSrc(`${card.card.name}-${card.card.emotion}`)} />
      </div>
    </div>
  )
}