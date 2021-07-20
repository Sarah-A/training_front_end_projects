import { createContext } from "react";

// createContext returns an object with:
// - a Provider -this is where you define the context. Everything that can access this, can access the context
// - a Consumer - everywhere that needs to use the context, will define a consumer. or call useContext to access it.
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
