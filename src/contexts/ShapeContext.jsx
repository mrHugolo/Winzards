import { createContext, useEffect, useState } from "react";

export const ShapeContext = createContext();

export default function ShapeProvider(props) {
  const [bag45, setBag45] = useState([]);

  const createBag45 = () => {
    const forms = ["square", "circle"]
    const colors = ["red", "blue", "white", "green", "yellow"]
    let bag = []

    for (let i = 0; i < 45; i++) {
      bag.push({
        form: forms[i < 20 ? 0 : 1],
        color: colors[i % 5]
      })
    }
    setBag45(shuffle(bag));
  };

  const shuffle = (bag) => {
    let i = bag.length
    let shuffledShapes = []
    while (i) {
      shuffledShapes.push(bag.splice(Math.floor(Math.random() * i--), 1)[0]) //add random shape from bag to shuffledShapes and remove shape from bag until there are no more shapes in bag
    }
    return shuffledShapes
  }

  useEffect(() => {
    createBag45();
  }, []);

  const values = {
    bag45
  };

  return <ShapeContext.Provider value={values}>{props.children}</ShapeContext.Provider>;
};
