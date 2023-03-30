import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Table } from "react-bootstrap";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.Name}</h1>
      {/** Let's make a table of each of the worlds data */}
      <Table bordered hover responsive>
        <thead>
            <tr className="blue white-text">
                <th>World</th>
                <th>Price</th>
                <th>Sell Price</th>
                <th>Cost</th>
                <th>Sale Velocity</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(recipe.marketboard).map((key) => {
                const item = recipe.marketboard[key];
                return (
                    <tr className="table-bg off-white-text data-row">
                        <td>{item.world}</td>
                        <td>{item.price}</td>
                        <td>{item.sellPrice}</td>
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
          <Tabs defaultActiveKey="1" id="recipes">
            {Object.keys(recipe.Recipes).map((key) => {
              const item = recipe.Recipes[key];
              return (
                <Tab eventKey={key} title={item.job}>
                  <h3>{item.job}</h3>
                  <h4>{item.lvl}</h4>
                  <ul>
                    {item.ingredients.map((ingredient) => {
                      return (
                        <li>
                          {ingredient.quantity} {ingredient.name}
                          {ingredient.hasRecipe && (
                            <a href={`/recipe/${ingredient.recipe._id}`}>
                              View Recipe
                            </a>
                          )}
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
    </div>
  );
};

export default RecipeDetails;

// recipe data looks like this
//{
// "_id": "1602",
// "Name": "Bronze Bastard Sword",
// "Recipes": {
//   "3": {
//     "job": 9,
//     "lvl": 2,
//     "ingredients": [
//       {
//         "quantity": 1,
//         "name": "Fire Shard",
//         "hasRecipe": false,
//         "recipe": null
//       },
//       {
//         "quantity": 1,
//         "name": "Earth Shard",
//         "hasRecipe": false,
//         "recipe": null
//       },
//       {
//         "quantity": 1,
//         "name": "Bronze Ingot",
//         "hasRecipe": true,
//         "recipe": {
//           "1": {
//             "job": 9,
//             "lvl": 1,
//             "ingredients": [
//               {
//                 "quantity": 1,
//                 "name": "Fire Shard",
//                 "hasRecipe": false,
//                 "recipe": null
//               },
//               {
//                 "quantity": 2,
//                 "name": "Copper Ore",
//                 "hasRecipe": false,
//                 "recipe": null
//               },
//               {
//                 "quantity": 1,
//                 "name": "Tin Ore",
//                 "hasRecipe": false,
//                 "recipe": null
//               }
//             ]
//           },
//           "170": {
//             "job": 10,
//             "lvl": 1,
//             "ingredients": [
//               {
//                 "quantity": 1,
//                 "name": "Ice Shard",
//                 "hasRecipe": false,
//                 "recipe": null
//               },
//               {
//                 "quantity": 2,
//                 "name": "Copper Ore",
//                 "hasRecipe": false,
//                 "recipe": null
//               },
//               {
//                 "quantity": 1,
//                 "name": "Tin Ore",
//                 "hasRecipe": false,
//                 "recipe": null
//               }
//             ]
//           }
//         }
//       },
//       {
//         "quantity": 1,
//         "name": "Maple Lumber",
//         "hasRecipe": true,
//         "recipe": {
//           "1008": {
//             "job": 8,
//             "lvl": 1,
//             "ingredients": [
//               {
//                 "quantity": 1,
//                 "name": "Wind Shard",
//                 "hasRecipe": false,
//                 "recipe": null
//               },
//               {
//                 "quantity": 3,
//                 "name": "Maple Log",
//                 "hasRecipe": false,
//                 "recipe": null
//               }
//             ]
//           }
//         }
//       },
//       {
//         "quantity": 1,
//         "name": "Bone Chip",
//         "hasRecipe": false,
//         "recipe": null
//       }
//     ]
//   }
// },
// "shopPrice": 151,
// "shopSellPrice": 3,
// "containsUntradeable": false,
// "marketboard": {
//   "34": {
//     "currentAverage": 2099.5,
//     "overallAverage": 1077.6,
//     "price": 1050,
//     "saleVelocity": 1,
//     "cost": 157,
//     "profitMargin": 0.8504761904761905,
//     "shortProfitIndex": 0.8504761904761905
//   },
//   "37": {
//     "currentAverage": 3543.75,
//     "overallAverage": 805.4737,
//     "price": 1050,
//     "saleVelocity": 0.42857143,
//     "cost": 1098,
//     "profitMargin": -0.045714285714285714,
//     "shortProfitIndex": -0.019591836799999998
//   },
//   "41": {
//     "currentAverage": 4875.857,
//     "overallAverage": 1014.2632,
//     "price": 525,
//     "saleVelocity": 1,
//     "cost": 616,
//     "profitMargin": 0.7653333333333333,
//     "shortProfitIndex": 0.5466666786933333
//   },
//   "62": {
//     "currentAverage": 13130250,
//     "overallAverage": 722458.44,
//     "price": 10500,
//     "saleVelocity": 1,
//     "cost": 136,
//     "profitMargin": 0.7409523809523809,
//     "shortProfitIndex": 1.0585034542857144
//   },
//   "74": {
//     "currentAverage": 2101750,
//     "overallAverage": 2331.6843,
//     "price": 5250,
//     "saleVelocity": 1,
//     "cost": 145,
//     "profitMargin": 0.9972380952380953,
//     "shortProfitIndex": 0.8547755230257144
//   },
//   "75": {
//     "price": 735,
//     "overallAverage": 569.3,
//     "saleVelocity": 0.14285715,
//     "currentAverage": 2992.5,
//     "cost": 144,
//     "profitMargin": 0.6563245823389021,
//     "shortProfitIndex": 0.281281964797136
//   },
//   "81": {
//     "currentAverage": 0,
//     "overallAverage": 1493.75,
//     "price": 0,
//     "saleVelocity": 0.14285715,
//     "cost": 156,
//     "profitMargin": -1.9433962264150944,
//     "shortProfitIndex": -1.3881401922641508
//   },
//   "91": {
//     "currentAverage": 1050,
//     "overallAverage": 1302.5,
//     "price": 1050,
//     "saleVelocity": 0.42857143,
//     "cost": 540,
//     "profitMargin": 0.4857142857142857,
//     "shortProfitIndex": 0.20816326599999999
//   }
// }
// }
