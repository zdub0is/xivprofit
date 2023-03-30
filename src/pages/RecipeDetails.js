import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Table } from "react-bootstrap";
import Loading from "./Loading";
import CustomFooter from "../CustomFooter";

const craftingJobs ={
  8 : "Carpenter",
  9 : "Blacksmith",
  10 : "Armorer",
  11 : "Goldsmith",
  12 : "Leatherworker",
  13 : "Weaver",
  14 : "Alchemist",
  15 : "Culinarian",
}

const worldOptions = 
  { 91 : "Balmung",
  34 : "Brynhildr",
  74 : "Coeurl",
  62 : "Diabolos",
  81 : "Goblin", 
  37 : "Mateus",
  75 : "Malboro",
  41 : "Zalera" }

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe data using the API or any other method
    const fetchRecipeData = async () => {
      const url = `https://xivpi-backend-20.zaoace.repl.co/api/recipetree/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipeData();
  }, [id]);

  if (!recipe) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="mt-2 mb-2">{recipe.Name}</h1>
      {/** Let's make a table of each of the worlds data */}
      <Table bordered hover responsive>
        <thead>
            <tr className="blue white-text">
                <th>World</th>
                <th>Current Average</th>
                <th>Overall Average</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Sale Velocity</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(recipe.marketboard).map((key) => {
                const item = recipe.marketboard[key];
                return (
                    <tr className="table-bg off-white-text data-row">
                        <td>{worldOptions[key]}</td>
                        <td>{item.currentAverage}</td>
                        <td>{item.overallAverage}</td>
                        <td>{item.price}</td>
                        <td>{item.cost}</td>
                        <td>{item.saleVelocity}</td>
                    </tr>
                );
            })}
        </tbody>
      </Table>
      {recipe.Recipes == null ? (
        <h2 className="text-center">No recipes</h2>
      ) : (
        <>
          <h2>Recipes</h2>
          <Tabs defaultActiveKey={Object.keys(recipe.Recipes)[0]} id="recipes">
            {Object.keys(recipe.Recipes).map((key) => {
              const item = recipe.Recipes[key];
              return (
                <Tab eventKey={key} title={craftingJobs[item.job]} className='text-center mt-2'>
                  <h4>Level Required: {item.lvl}</h4>
                  <ul>
                    {item.ingredients.map((ingredient) => {
                      return (
                        <li>
                          {ingredient.quantity} {ingredient.hasRecipe ? (
                            <a href={`/recipe/${ingredient.id}`}>
                              {ingredient.name} *
                            </a>) : ingredient.name}
                        </li>
                      );
                    })}
                  </ul>
                </Tab>
              );
            })}
          </Tabs>
        </>
      )}
      <div className="mt-2 border-top">
      * indicates a craftable item, click on it to open the recipe.
      </div>
          
        <CustomFooter />
    </div>
  );
};

export default RecipeDetails;