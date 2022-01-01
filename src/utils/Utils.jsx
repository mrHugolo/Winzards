import css from "../cssModules/Main.module.css"

export const flipVisibility = (clazz) => {
  let e = document.getElementsByClassName(clazz)[0].classList
  e.value.includes(css.hide) ? e.remove(css.hide) : e.add(css.hide)
}

export const charachterList = [
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
    shineColor: "shineYellow"
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

export const findPlayerCard = (color, i, deck, boardLength) => {
  const indexes = indexesAround(i, boardLength)
  return deck.filter(c => c.shape.color == color && c.color == (color.charAt(0).toUpperCase() + color.slice(1)) && c.shape.form == "triangle" && indexes.includes(c.id))[0]
}

export const indexesAround = (i, bl) => {
  let indexes = [i - (bl+1), i - bl, i - (bl-1), i - 1, i + 1, i + (bl-1), i + bl, i + (bl+1)]
  if (i % bl == 0) indexes = [i - bl, i - (bl-1), i + 1, i + bl, i + (bl+1)]
  else if (i % bl == bl-1) indexes = [i - (bl+1), i - bl, i - 1, i + (bl-1), i + bl]
  return indexes
}