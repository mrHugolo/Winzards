import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts
import DeckProvider from "./contexts/DeckContext";
import ShapeProvider from "./contexts/ShapeContext";

//pages
import { Home } from "./pages/Home";
import { Solitaire } from "./pages/Solitaire";
import { Wall } from "./pages/Wall";
import { Repello } from "./pages/Repello";


function App() {

  return (
    <div>
      <ShapeProvider>
        <DeckProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/solitaire" component={Solitaire} />
              <Route exact path="/wall" component={Wall} />
              <Route exact path="/repello" component={Repello} />
            </Switch>
          </Router>
        </DeckProvider>
      </ShapeProvider>
    </div>
  );
}

export default App;
