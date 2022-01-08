import css from "../cssModules/Main.module.css"
import { ImArrowUpLeft, ImArrowUp, ImArrowUpRight, ImArrowRight, ImArrowDownRight, ImArrowDown, ImArrowDownLeft, ImArrowLeft } from "react-icons/im"
import { useEffect } from "react"

export const Arrow = ({ arrow, cssx }) => {

  useEffect(() => {
    if(arrow.dir) {
      let element = document.getElementById("Arrow-"+arrow.id)
      let card = document.getElementById("Repello-0")
      
      let w = element.clientWidth
      let h = element.clientHeight
      element.style.marginLeft = (card.clientWidth - w)/2 + "px"
      element.style.marginTop = (card.clientHeight - h) / 2 + "px"
    }
  }, [arrow])

  const chooseArrow = () => {
    switch(arrow.dir) {
      case 1: return <ImArrowUpLeft/>
      case 2: return <ImArrowUp/>
      case 3: return <ImArrowUpRight/>
      case 4: return <ImArrowLeft/>
      case 6: return <ImArrowRight/>
      case 7: return <ImArrowDownLeft/>
      case 8: return <ImArrowDown/>
      case 9: return <ImArrowDownRight/>
    }
  }

  return (
    <div id={`Arrow-${arrow.id}`} className={`${arrow.dir && cssx.css.arrow} ${!arrow.dir && css.hidden}`}>{chooseArrow()}</div>
  )
}