import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ItemsTable from "./ItemsTable";
import useApiData from "./useApiData";
import './App.css'

const worldOptions = [
  { id: 91, name: "Balmung" },
  { id: 34, name: "Brynhildr" },
  { id: 74, name: "Coeurl" },
  { id: 62, name: "Diabolos" },
  { id: 81, name: "Goblin" },
  { id: 37, name: "Mateus" },
  { id: 75, name: "Malboro" },
  { id: 41, name: "Zalera" },
];

function App() {
  const [worldID, setWorldID] = useState("91");
  const [noRecipe, setNoRecipe] = useState(false);
  const [hasRecipe, setHasRecipe] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [shopPrice, setShopPrice] = useState("");
  const [shopSellPrice, setShopSellPrice] = useState("");
  const [saleVelocity, setSaleVelocity] = useState("");
  const [fetchData, setFetchData] = useState(true);

  const items = useApiData(
    worldID,
    noRecipe,
    hasRecipe,
    searchName,
    shopPrice,
    shopSellPrice,
    saleVelocity,
    fetchData,
    setFetchData
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchData(true);
  };

  return (
    <Container className="white-text">
      <h1>Item Search</h1>
      <Form onSubmit={handleSubmit} className='my-1'>
        <Form.Group controlId="worldID" className='my-1'>
          <Form.Label>World ID</Form.Label>
          <Form.Control
            as="select"
            value={worldID}
            onChange={(e) => setWorldID(e.target.value)}
          >
            {worldOptions.map((world) => (
              <option key={world.id} value={world.id}>
                {world.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="recipes" className='my-1'>
          <Form.Check
            type="checkbox"
            label="No Recipes"
            checked={noRecipe}
            onChange={(e) => setNoRecipe(e.target.checked)}
            className='form-check-inline'
          />
        <Form.Check
          type="checkbox"
          label="Has Recipe"
          checked={hasRecipe}
          onChange={(e) => setHasRecipe(e.target.checked)}
          className='form-check-inline'
        />
      </Form.Group>

        <Form.Group controlId="searchName" className='my-1'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter item name"
          />
        </Form.Group>

        <Form.Group controlId="shopPrice" className='my-1'>
          <Form.Label>Shop Price Less Than</Form.Label>
          <Form.Control
            type="number"
            value={shopPrice}
            onChange={(e) => setShopPrice(e.target.value)}
            placeholder="Enter shop price"
          />
        </Form.Group>

        <Form.Group controlId="shopSellPrice" className='my-1'>
          <Form.Label>Shop Sell Price Less Than</Form.Label>
          <Form.Control
            type="number"
            value={shopSellPrice}
            onChange={(e) => setShopSellPrice(e.target.value)}
            placeholder="Enter shop sell price"
          />
        </Form.Group>

        <Form.Group controlId="saleVelocity" className='my-1'>
          <Form.Label>Sale Velocity Greater Than</Form.Label>
          <Form.Control
            type="number"
            value={saleVelocity}
            onChange={(e) => setSaleVelocity(e.target.value)}
            placeholder="Enter sale velocity"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="blue off-white-text">
          Search
        </Button>
      </Form>

      <ItemsTable items={items} worldID={worldID} />
    </Container>
  );
}

export default App;

