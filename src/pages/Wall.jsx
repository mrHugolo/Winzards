import { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import css from "../cssModules/Main.module.css"
import wcss from "../cssModules/Wall.module.css"
import { DeckContext } from "../contexts/DeckContext"
import { ShapeContext } from "../contexts/ShapeContext"
import { Card } from "../components/Card"

export const Wall = () => {
  const { deck55 } = useContext(DeckContext)
  const { bag45 } = useContext(ShapeContext)
  const [deck, setDeck] = useState()
  const [shape, setShape] = useState({})
  const [playerTurn, setPlayerTurn] = useState(0)
  const [turn, setTurn] = useState(0)
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [playerTracker, setPlayerTracker] = useState(1)

  const charachterList = [
    {
      src: "./src/pictures/Blaze-Powerfull.png",
      shineColor: "shineRed"
    },
    {
      src: "./src/pictures/Frozt-Powerfull.png",
      shineColor: "shineWhite"
    },
    {
      src: "./src/pictures/Rootz-Powerfull.png",
      shineColor: "shineGreen"
    },
    {
      src: "./src/pictures/Zapp-Powerfull.png",
      shineColor: "shineYellow"
    },
    {
      src: "./src/pictures/Zurf-Powerfull.png",
      shineColor: "shineBlue"
    },
    {
      src: "./src/pictures/Blaze-Average.png",
      shineColor: "shineRed"
    },
    {
      src: "./src/pictures/Frozt-Average.png",
      shineColor: "shineWhite"
    },
    {
      src: "./src/pictures/Rootz-Average.png",
      shineColor: "shineGreen"
    },
    {
      src: "./src/pictures/Zapp-Average.png",
      shineColor: "shineYello"
    },
    {
      src: "./src/pictures/Zurf-Average.png",
      shineColor: "shineBlue"
    },
    {
      src: "./src/pictures/Blaze-Sad.png",
      shineColor: "shineRed"
    },
    {
      src: "./src/pictures/Frozt-Sad.png",
      shineColor: "shineWhite"
    },
    {
      src: "./src/pictures/Rootz-Sad.png",
      shineColor: "shineGreen"
    },
    {
      src: "./src/pictures/Zapp-Sad.png",
      shineColor: "shineYellow"
    },
    {
      src: "./src/pictures/Zurf-Sad.png",
      shineColor: "shineBlue"
    }
  ]

  useEffect(() => {
    setDeck(createBoard(deck55))
  }, [deck55])

  useEffect(() => {
    if(playerTurn == 1) {
      document.getElementById("playerImg1").style.boxShadow = "0 0 0 4px " + p1.shineColor.split('shine')[1]
      document.getElementById("playerImg2").style.boxShadow = null
    }
    if(playerTurn == 2) {
      document.getElementById("playerImg2").style.boxShadow = "0 0 0 4px " + p2.shineColor.split('shine')[1]
      document.getElementById("playerImg1").style.boxShadow = null
    }
  }, [playerTurn])


  const createBoard = (cards) => {
    const bag = bag45.slice()
    cards.forEach((c, i) => {
      c.id = i
      
      // triangles
      if (i == 40 || i == 49) c.shape = { form: "triangle", color: "blue" }
      if (i == 41 || i == 48) c.shape = { form: "triangle", color: "green" }
      if (i == 42 || i == 47) c.shape = { form: "triangle", color: "red" }
      if (i == 43 || i == 46) c.shape = { form: "triangle", color: "yellow" }
      if (i == 44 || i == 45) c.shape = { form: "triangle", color: "white" }

      // squares
      if (i >= 30 && i <= 39) {
        const idx = bag.indexOf(bag.filter(s => s.form == "square")[0])
        c.shape = bag.splice(idx, 1)[0]
      }

      // circles
      if (i >= 10 && i <= 19) {
        const idx = bag.indexOf(bag.filter(s => s.form == "circle")[0])
        c.shape = bag.splice(idx, 1)[0]
      }
    })
    return cards.slice(0, 50)
  }

  const removeSelectedShape = () => {

  }

  const showPossibleMoves = () => {

  }

  const assignCharachter = (char) => {
    if(playerTracker == 1) {
      setP1(char)
      setPlayerTracker(2)
    } else {
      setP2(char)
      document.getElementById("pickPlayerWall").classList.add(css.hide)
      setPlayerTurn(1)
    }
    deck.forEach((c, i) => {
      if ((i % 10 < 5 && playerTracker == 1 || i % 10 >= 5 && playerTracker == 2))c.shineColor = char.shineColor
    })
  }

  return(
    <div>
      <div id="pickPlayerWall" className={wcss.pickPlayer}>
        <span>Player {playerTracker}</span><br/>
        <span>Pick a characther</span><br/>
        <div className={wcss.pickPlayerGrid}>
          {charachterList && charachterList.map(c => (
            <div key={c.src} className={`${wcss.charactherImg} ${css.pointer}`} onClick={() => assignCharachter(c)}>
              <img src={c.src}/>
            </div>
            
          ))}
        </div>
      </div>
      <div className={wcss.wrapper}>
        <div className={wcss.board}>
          {deck?.length == 50 && deck?.map(card => (
            <div className={css.pointer} key={card.id}>
              <Card
                card={{ card, showShineColor: (card.id % 10 < 5 && playerTurn == 1 || card.id % 10 >= 5 && playerTurn == 2) }}
                shape={{ setShape, shape, removeSelectedShape }}
                game={{ game: "Wall", showPossibleMoves }}
                cssx={{ css: wcss }}
              />
            </div>
          ))}
        </div>
        <div id="playerImg1" className={css.playerImg} onClick={() => setPlayerTurn(p => p == 1 ? 2 : 1)}>
          {p1 && (<img src={p1.src} />)}
        </div>
        <div id="playerImg2" className={css.playerImg} onClick={() => setPlayerTurn(p => p == 1 ? 2 : 1)}>
          {p2 && (<img src={p2.src} />)}
        </div>
      </div>
    </div>
  )
}