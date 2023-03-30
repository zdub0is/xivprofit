
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ItemsTable from "./ItemsTable";
import useApiData from "../useApiData";
import Loading from "./Loading";
import CustomFooter from "../CustomFooter";


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

function Homepage() {
    const [worldID, setWorldID] = useState("91");
  const [noRecipe, setNoRecipe] = useState(false);
  const [hasRecipe, setHasRecipe] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [shopPriceLower, setShopPriceLower] = useState("");
  const [shopPriceUpper, setShopPriceUpper] = useState("");
  const [shopSellPriceLower, setShopSellPriceLower] = useState("");
  const [shopSellPriceUpper, setShopSellPriceUpper] = useState("");
  const [costLower, setCostLower] = useState("");
  const [costUpper, setCostUpper] = useState("");
  const [saleVelocityLower, setSaleVelocityLower] = useState("");
  const [saleVelocityUpper, setSaleVelocityUpper] = useState("");
  const [fetchData, setFetchData] = useState(true);

  const items = useApiData(
    worldID,
    noRecipe,
    hasRecipe,
    searchName,
    shopPriceLower,
    shopPriceUpper,
    shopSellPriceLower,
    shopSellPriceUpper,
    costLower,
    costUpper,
    saleVelocityLower,
    saleVelocityUpper,
    fetchData,
    setFetchData
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFetchData(true);
  };

  return (
    <>
      <h1 className="display-3 mt-2">Item Search</h1>
      <Form onSubmit={handleSubmit} className="my-1">
        <Form.Group
          controlId="worldIDandRecipes"
          className="row justify-content-center align-items-center form-line"
        >
          <div className="col-md-9">
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
          </div>
          <div className="col-md-2">
            <Form.Check
              type="checkbox"
              label="No Recipes"
              checked={noRecipe}
              onChange={(e) => setNoRecipe(e.target.checked)}
              className="form-check-inline"
            />
            <Form.Check
              type="checkbox"
              label="Has Recipe"
              checked={hasRecipe}
              onChange={(e) => setHasRecipe(e.target.checked)}
              className="form-check-inline"
            />
          </div>
        </Form.Group>

        <Form.Group
          controlId="searchName"
          className="my-1 form-line row justify-content-center text-center align-items-center"
        >
          <div className="col-md-1">
            <Form.Label>Name</Form.Label>
          </div>
          <div className="col-md-10">
            <Form.Control
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter item name"
            />
          </div>
        </Form.Group>

        <Form.Group
          controlId="priceAndVelocity"
          className="row justify-content-center align-items-center form-line text-center font-weight-bold"
        >
          <div className="col-md-2">
            <Form.Label>Shop Price Range</Form.Label>
            <Form.Control
              type="number"
              value={shopPriceLower}
              onChange={(e) => setShopPriceLower(e.target.value)}
              placeholder="Lower limit"
            />
            <span className="arrows"> &#708; &#709; </span>
            <Form.Control
              type="number"
              value={shopPriceUpper}
              onChange={(e) => setShopPriceUpper(e.target.value)}
              placeholder="Upper limit"
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Shop Sell Price</Form.Label>
            <Form.Control
              type="number"
              value={shopSellPriceLower}
              onChange={(e) => setShopSellPriceLower(e.target.value)}
              placeholder="Lower limit"
            />
            <span className="arrows"> &#708; &#709; </span>
            <Form.Control
              type="number"
              value={shopSellPriceUpper}
              onChange={(e) => setShopSellPriceUpper(e.target.value)}
              placeholder="Upper limit"
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Cost To Craft</Form.Label>
            <Form.Control
              type="number"
              value={costLower}
              onChange={(e) => setCostLower(e.target.value)}
              placeholder="Lower limit"
            />
            <span className="arrows"> &#708; &#709; </span>
            <Form.Control
              type="number"
              value={costUpper}
              onChange={(e) => setCostUpper(e.target.value)}
              placeholder="Upper limit"
            />
          </div>
          <div className="col-md-2">
            <Form.Label>Sale Velocity Range</Form.Label>
            <Form.Control
              type="number"
              value={saleVelocityLower}
              onChange={(e) => setSaleVelocityLower(e.target.value)}
              placeholder="Lower limit"
            />
            <span className="arrows"> &#708; &#709; </span>
            <Form.Control
              type="number"
              value={saleVelocityUpper}
              onChange={(e) => setSaleVelocityUpper(e.target.value)}
              placeholder="Upper limit"
            />
          </div>
        </Form.Group>

        <div className="text-center form-line">
          <Button
            variant="primary"
            type="submit"
            className="row blue off-white-text justify-content-center"
          >
            Search
          </Button>
        </div>
      </Form>

      {fetchData ? <Loading /> : <ItemsTable items={items} worldID={worldID}/>}
      <CustomFooter />
      </>
  );
}

export default Homepage;