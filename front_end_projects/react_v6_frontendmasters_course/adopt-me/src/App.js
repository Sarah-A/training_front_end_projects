import { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
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
