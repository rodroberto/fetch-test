import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import { AuthenticationProvider } from "./lib/contexts/AuthenticationContext";
import { FavoritesProvider } from "./lib/contexts/FavoritesContext";

import "./App.css";

function App() {
  return (
    <AuthenticationProvider>
      <FavoritesProvider>
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </FavoritesProvider>
    </AuthenticationProvider>
  );
}

export default App;
