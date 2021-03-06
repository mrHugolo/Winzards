import { createContext, useEffect, useState } from "react";

export const DeckContext = createContext();

export default function DeckProvider(props) {
  const [deck55, setDeck55] = useState([]);

  const createDeck = () => {
    const names = ["Blaze", "Zurf", "Frozt", "Rootz", "Zapp"]
    const colors = ["Red", "Blue", "White", "Green", "Yellow"]
    const emotions = ["Sad", "Average", "Powerfull"]
    let cards = []

    const tempForms = ["square", "circle", "triangle"]
    const tempColors = ["green", "red", "blue"]

    for(let i = 0; i < 55; i++) {
      let v = i % 11 + 1
      
      cards.push({
        name: names[i % 5],
        color: colors[i % 5],
        emotion: emotions[v <= 3 ? 0 : v >= 9 ? 2 : 1],
        value: v,
        shape: {
          form: '',
          color: ''
        }
      })
    }
    setDeck55(shuffle(cards));
  };

  const shuffle = (cards) => {
    let i = cards.length
    let shuffledCards = []
    while(i) {
      shuffledCards.push(cards.splice(Math.floor(Math.random() * i--), 1)[0]) //add random card from cards to shuffledCards and remove card from cards until there are no more cards in cards
    }
    return shuffledCards
  }

  useEffect(() => {
    createDeck();
  }, []);

  const values = {
    deck55
  };

  return <DeckContext.Provider value={values}>{props.children}</DeckContext.Provider>;
};
