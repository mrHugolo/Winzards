import { useEffect, useState } from "react"

import css from "../cssModules/Main.module.css"
import ucss from "../cssModules/Utils.module.css"
import { flipVisibility } from "../utils/Utils"

export const Rules = ({game}) => {
  const [text, setText] = useState([])

  useEffect(() => {
    if(!game?.name) return
    switch(game.name) {
      case "Solitaire": {
        setText(["Gameplay: Move your markers (squares and circles) to create shapes and get points.",
        "Turn: Make 3 moves in each turn. Before next turn you will be asked to place a new marker on a medioker card.",
        "Move: In a move you can switch place of two cards, move a pawn or move a marker with the help of a pawn. To move a marker, the pawn, marker and card must have same color.",
        "Card: The card emotion will give you diffrent options for your move. (While playing, click a card, pawn or marker for options).",
          "-Powerful(9-11): May switch place with any other empty card. Helps pawn to throw a marker to any empty card. Lets pawn jump to any other empty card.",
          "-Medioker(4-8): May switch place with an empty neighbour card. Helps pawn to move a marker to an empty neigbour card. Lets pawn move to an empty neigbour card.",
          "-Sad(1-3): Lets pawn move one step closer to the center."])
        break;
      }
    }

  }, [game?.name])

  const boldifyFirstWord = (t) =>{
    let arr = t.split(":")
    return <p><span className={css.fontSizeBig}>{arr[0]}</span>:{arr[1]}</p>
  }

  return(
    <div className={css.center}>
      <span className={`${css.pointer} ${css.hide1100}`} onClick={() => flipVisibility("Rules")}>Rules:</span><br/>
      <div className={`Rules ${css.box} ${ucss.utilColor}`}>
        <div>
          {text.length && text.map((t, i) =>(
            <div className={css.fontSizeSmall} key={i+"r"}>{boldifyFirstWord(t)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}