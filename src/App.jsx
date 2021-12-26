import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts
import DeckProvider from "./contexts/DeckContext";
import ShapeProvider, { ShapeContext } from "./contexts/ShapeContext";

//pages
import { Home } from "./pages/Home";
import { Solitaire } from "./pages/Solitaire";
import { Rickardtestar} from "./pages/rickardTestar"

function App() {

  return (
    <div>
      <ShapeProvider>
        <DeckProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/solitaire" component={Solitaire} />
              <Route exact path="/minTest" component={Rickardtestar} />
            </Switch>
          </Router>
        </DeckProvider>
      </ShapeProvider>
    </div>
  );
}

export default App;
