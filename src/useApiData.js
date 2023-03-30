import { useState, useEffect } from 'react';

const useApiData = (worldID,
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
  setFetchData) => {
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
      if (shopPriceLower) {
        queryParams.push(`splt=${shopPriceLower}`);
      }
      if (shopPriceUpper) {
        queryParams.push(`spgt=${shopPriceUpper}`);
      }
      if (shopSellPriceLower) {
        queryParams.push(`slt=${shopSellPriceLower}`);
      }
      if (shopSellPriceUpper) {
        queryParams.push(`sgt=${shopSellPriceUpper}`);
      }
      if (costLower) {
        queryParams.push(`clt=${costLower}`);
      }
      if (costUpper) {
        queryParams.push(`cgt=${costUpper}`);
      }
      if (saleVelocityLower) {
        queryParams.push(`svlt=${saleVelocityLower}`);
      }
      if (saleVelocityUpper) {
        queryParams.push(`svgt=${saleVelocityUpper}`);
      }

      const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
      const url = `https://xivpi-backend-20.zaoace.repl.co/api/${worldID}${queryString}`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setFetchData(false);
    };

    fetchItems();
  }, [worldID,
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
    setFetchData]);

  return items;
};

export default useApiData;


//let url = `https://xivpi-backend-20.zaoace.repl.co/api/${worldID}?`;

