import { useState, useEffect } from 'react';

const useApiData = (worldID, noRecipe, hasRecipe, searchName, shopPrice, shopSellPrice, saleVelocity, fetchData, setFetchData) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!fetchData) return;

    const fetchItems = async () => {

      let queryParams = [];

      if (noRecipe && !hasRecipe) {
        queryParams.push(`noRecipe=true`);
      }
      if (hasRecipe && !noRecipe) {
        queryParams.push(`hasRecipe=true`);
      }
      if (searchName) {
        queryParams.push(`name=${encodeURIComponent(searchName)}`);
      }
      if (shopPrice) {
        queryParams.push(`splt=${shopPrice}`);
      }
      if (shopSellPrice) {
        queryParams.push(`slt=${shopSellPrice}`);
      }
      if (saleVelocity) {
        queryParams.push(`svgt=${saleVelocity}`);
      }

      const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
      const url = `https://xivpi-backend-20.zaoace.repl.co/api/${worldID}${queryString}`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setFetchData(false);
    };

    fetchItems();
  }, [worldID, noRecipe, hasRecipe, searchName, shopPrice, shopSellPrice, saleVelocity, fetchData, setFetchData]);

  return items;
};

export default useApiData;


//let url = `https://xivpi-backend-20.zaoace.repl.co/api/${worldID}?`;

