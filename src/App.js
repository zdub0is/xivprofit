
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./App.css";
import RecipeDetails from "./RecipeDetails";
import Homepage from "./Homepage";

function App() {
  
  return (
    <Router>
    <Container className="white-text">
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recipe/:id" component={<RecipeDetails />} />
    </Routes>
    </Container>
    </Router>
  );
}

export default App;
