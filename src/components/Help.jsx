import { useEffect, useState } from "react"

import ucss from "../cssModules/Utils.module.css"
import css from "../cssModules/Main.module.css"
import { flipVisibility } from "../utils/Utils"

export const Help = ({ game }) => {
  const [text, setText] = useState([])

  useEffect(() => {
    if (!game?.name) return
    switch (game.name) {
      case "Solitaire": {
        setText([
          [
            "⚫⚫⚫",
            "⚫",
            "⚫.⬜. x5"
          ],
          [
            "⚫⚫⚫",
            "⬜.⚫",
            "⬜.⚫ x5"
          ],
          [
            "⬜.⚫",
            "⚫⚫⚫",
            "⬜.⚫ x5"
          ],
          [
            "⚫⚫",
            "⚫",
            "⚫⚫ x5"
          ],
          [
            "⬜⬜⬜",
            "⚫⚫.⬜",
            "⚫⚫ x4"
          ],
          [
            "⬜.⚫",
            "⬜.⚫",
            "⬜.⚫ x5",
            "⬜.⚫",
            "⬜.⚫"
          ],
          [
            "⬜.⚫",
            "⬜.⚫",
            "⬜.⚫ x4",
            "⬜.⚫"
          ],
          [
            "⬜.⚫",
            "⬜.⚫",
            "⬜.⚫ x3"
          ],
          [
            "⬛⬛ x4",
            "⬛⬛.⬜",
            "⬜⬜⬜"
          ],
          [
            "⬜.⬛ x4",
            "⬜.⬛",
            "⬜.⬛",
            "⬜.⬛"
          ],
          [
            "⬜.⬛ x3",
            "⬜.⬛",
            "⬜.⬛"
          ]
        ])
        break;
      }
    }

  }, [game?.name])

  const replaceFillers = (t) => {
    let arr = t.split(".")
    
    return(
      <div>
        {arr && arr.map((a, i)=> (
          <span key={i+"rf"} className={a.includes("⬜") ? ucss.help : ""}>{a}</span>
        ))}
      </div>
    ) 
    
  }

  return (
    <div className={css.center}>
      <span className={`${css.pointer} ${css.hide1100}`} onClick={() => flipVisibility("Help")}>Shapes:</span><br />
      <div className={`Help ${css.box} ${ucss.utilColor}`}>
        <div className={ucss.helpGrid}>
          {text && text.map((arr, idx) => (
            <div key={idx + "arr"} className={ucss.helpObj}>
              {arr && arr.map((t, i) => (
                <div key={i+"t"}>{replaceFillers(t)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}