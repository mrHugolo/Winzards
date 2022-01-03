import { createContext, useEffect, useState } from "react";

export const DeckContext = createContext();

export default function DeckProvider(props) {
  const [deck55, setDeck55] = useState([]);
  const [wallDeck, setWallDeck] = useState([])
  const emotions = ["Sad", "Average", "Powerfull"]  

  const createDeck = () => {
    const names = ["Blaze", "Zurf", "Frozt", "Rootz", "Zapp"]
    const colors = ["Red", "Blue", "White", "Green", "Yellow"]
    let cards = []

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
    setDeck55(shuffle(cards))
  };

  const shuffle = (cards) => {
    let i = cards.length
    let shuffledCards = []
    while(i) {
      shuffledCards.push(cards.splice(Math.floor(Math.random() * i--), 1)[0]) //add random card from cards to shuffledCards and remove card from cards until there are no more cards in cards
    }
    return shuffledCards
  }

  const wallShuffle = (cards) => {
    let indexes1 = [0,1,2,3,4,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44]
    let indexes2 = [5,6,7,8,9,15,16,17,18,19,25,26,27,28,29,35,36,37,38,39,45,46,47,48,49]
    let indexes = [indexes1, indexes2]
    let newDeck = []

    for(let i = 0; i < 50; i++) {
      let x = (i >= 0 && i <= 11 ? 0 : (i >= 36 && i <= 49 ? 2 : 1)) 
      let card = cards.splice(cards.indexOf(cards.find(c => c.emotion == emotions[x])), 1)[0]
      card.id = indexes[i % 2].splice(Math.floor(Math.random() * indexes[i % 2].length), 1)[0]
      newDeck.push(card)
    }
    
    return newDeck.filter(c => c.id != undefined).sort((a, b) => a.id > b.id ? 1 : -1)
  }

  useEffect(() => {
    createDeck();
  }, []);

  useEffect(() => {
    if(deck55.length == 55) {
      setWallDeck(wallShuffle(deck55.slice()))
    }
  }, [deck55])

  const values = {
    deck55,
    wallDeck
  };

  return <DeckContext.Provider value={values}>{props.children}</DeckContext.Provider>;
};
