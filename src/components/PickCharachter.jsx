import { charachterList } from "../utils/Utils"
import css from "../cssModules/Main.module.css"
import { useEffect, useState } from "react"

export const PickCharachter = ({game, cssx}) => {
  const [charachters, setCharachters] = useState([])
  const [playerTracker, setPlayerTracker] = useState(1)

  useEffect(() => {
    if(charachterList.length) setCharachters(charachterList)
  }, [charachterList])

  const handleClick = (c) => {
    if(c.taken) return
    setPlayerTracker(p => p+1)
    game.assignCharachter(c)
    charachters.filter(char => char.shineColor == c.shineColor).forEach(it => {
      it.taken = true
    })
  }

  return(
    <div className={`${cssx.css.pickPlayer} ${css.noSelect} ${game.maxPlayers < playerTracker && css.hide}`}>
      <span>Player {playerTracker}</span><br />
      <span>Pick a characther</span><br />
      <div className={cssx.css.pickPlayerGrid}>
        {charachters.length && charachters.map(c => (
          <div key={c.src} className={`${cssx.css.charactherImg} ${css.pointer} ${c.taken && css.taken}`} onClick={() => handleClick(c)}>
            <img src={c.src} />
          </div>
        ))}
      </div>
    </div>
  )
}