import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts
import DeckProvider from "./contexts/DeckContext";

//pages
import { Home } from "./pages/Home";
import { Solitaire } from "./pages/Solitaire";


function App() {

  return (
    <div>
      <DeckProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/solitaire" component={Solitaire} />
          </Switch>
        </Router>
      </DeckProvider>
    </div>
  );
}

export default App;
