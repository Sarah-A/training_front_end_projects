import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./Details";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Router>
        <Switch>
          {/* Switch make sure that the router returns only the 1st path that matches.
              otherwise, it will return (and render) all the paths that match even if there are more than one */}
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <SearchParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  // StrictMode makes sure that we're following React's core team recommended conventions.
  // Usually very recommended to work ONLY in strict mode.
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
