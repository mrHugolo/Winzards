import { useEffect, useState } from "react"
import { flipVisibility } from "../utils/Utils"

export const Help = ({ game }) => {
  const [text, setText] = useState([])

  useEffect(() => {
    if (!game?.name) return
    switch (game.name) {
      case "Solitaire": {
        setText([
          [
            "⬛⬛⬛",
            "⬛",
            "⬛.⬜. x5"
          ],
          [
            "⬛⬛⬛",
            "⬜.⬛",
            "⬜.⬛ x5"
          ],
          [
            "⬜.⬛",
            "⬛⬛⬛",
            "⬜.⬛ x5"
          ],
          [
            "⬛⬛",
            "⬛",
            "⬛⬛ x5"
          ],
          [
            "⬜⬜⬜",
            "⬛⬛.⬜",
            "⬛⬛ x4"
          ],
          [
            "⬜.⬛",
            "⬜.⬛",
            "⬜.⬛ x5",
            "⬜.⬛",
            "⬜.⬛"
          ],
          [
            "⬜.⬛",
            "⬜.⬛",
            "⬜.⬛ x4",
            "⬜.⬛"
          ],
          [
            "⬜.⬛",
            "⬜.⬛",
            "⬜.⬛ x3"
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
          <span key={i+"rf"} className={a.includes("⬜") ? "help" : ""}>{a}</span>
        ))}
      </div>
    ) 
    
  }

  return (
    <div className="center">
      <span className="pointer hide1100" onClick={() => flipVisibility("Help")}>Shapes:</span><br />
      <div className="Help box">
        <div className="helpGrid">
          {text && text.map((arr, idx) => (
            <div key={idx+"arr"} className="helpObj">
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