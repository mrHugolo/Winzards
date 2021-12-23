import { useHistory } from "react-router-dom"

export const Home = () => {

  const history = useHistory()

  return (
    <div>
      <h1 onClick={() => history.push("/solitaire")}>Solitaire</h1>
    </div>
  )
}