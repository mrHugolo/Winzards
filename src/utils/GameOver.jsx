
export const GameOver = (history, points, game) => {
  history.push("/")
  location.reload()
  switch(game) {
    case "Solitaire": {
      alert("Game Over!\nYou got " + points + " points")
      break;
    }
    case "Wall": {
      alert("Game Over!\n" + points + " is the winner!")
    }
  }
  
}


