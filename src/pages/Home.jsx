import { useHistory } from "react-router-dom"
import css from "../cssModules/Main.module.css"

export const Home = () => {

  const history = useHistory()

  return (
    <div>
      <h1 className={css.pointer} onClick={() => history.push("/solitaire")}>Solitaire</h1>
    </div>
  )
}