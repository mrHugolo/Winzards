
export const GameOver = (history, points) => {
  history.push("/")
  location.reload()
  alert("Game Over!\nYou got " + points + " points")
}


