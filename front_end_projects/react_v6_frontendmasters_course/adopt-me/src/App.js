import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Molly" animal="Dog" breed="Stumpy Tail" />
      <Pet name="Sandy" animal="Dog" breed="Golden" />
      <Pet name="Kaily" animal="Bird" breed="Galla" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
