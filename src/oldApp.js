import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import ItemsTable from './ItemsTable';
import useApiData from './useApiData';

const worldOptions = [
  { id: 34, name: "Brynhildr"},
  { id: 37, name: "Mateus"},
  { id: 41, name: "Zalera"},
  { id: 62, name: "Diabolos"},
  { id: 74, name: "Coeurl"},
  { id: 75, name: "Malboro"},
  { id: 81, name: "Goblin"},
  { id: 91, name: "Balmung"}
]

function App() {
  const [worldID, setWorldID] = useState('34');
  const [filters, setFilters] = useState({
    noRecipe: 'true',
    svgt: 2,
  });

  const { data, loading, error } = useApiData(worldID, filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Container>
      <h1>Items</h1>

      <Form>
        <Form.Group controlId="worldID">
          <Form.Label>World</Form.Label>
          <Form.Control
            as="select"
            name="worldID"
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
        <Form.Group controlId="noRecipe">
          <Form.Check
            type="checkbox"
            label="No recipes"
            name="noRecipe"
            checked={filters.noRecipe === 'true'}
            onChange={(e) => handleFilterChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="id">
          <Form.Label>Item ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={filters.id || ''}
            onChange={(e) => handleFilterChange(e)}
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={filters.name || ''}
            onChange={(e) => handleFilterChange(e)}
          />
        </Form.Group>

        {/* Add more filter inputs as needed */}

      </Form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <ItemsTable items={data} />}
    </Container>
  );
}

export default App;
