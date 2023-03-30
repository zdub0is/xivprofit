
import { Container } from "react-bootstrap";
import { HashRouter, Route, Routes } from 'react-router-dom';

import "./App.css";
import RecipeDetails from "./RecipeDetails";
import Homepage from "./Homepage";

function App() {
  return (
    <HashRouter>
      <Container className="white-text">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
