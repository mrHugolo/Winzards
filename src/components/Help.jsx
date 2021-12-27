import { useEffect, useState } from "react"
import { flipVisibility } from "../utils/Utils"

export const Help = ({ game }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!game?.name) return
    switch (game.name) {
      case "Solitaire": {
        setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Euismod lacinia at quis risus sed. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero. Vitae congue mauris rhoncus aenean vel elit. Duis ultricies lacus sed turpis. Vel turpis nunc eget lorem dolor sed viverra. Fringilla ut morbi tincidunt augue. Amet purus gravida quis blandit turpis cursus in hac. Fermentum leo vel orci porta non pulvinar. Scelerisque eu ultrices vitae auctor eu augue. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Cras fermentum odio eu feugiat pretium nibh ipsum consequat.")
        break;
      }
    }

  }, [game?.name])

  return (
    <div className="center">
      <span className="pointer hide1400" onClick={() => flipVisibility("Help")}>Shape:</span><br />
      <div className="Help box">
        <span>{text}</span>
      </div>
    </div>
  )
}