import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';

const ItemsTable = ({ items, worldID }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedItems = items ? items.sort((a, b) => {
    if (sortConfig === null) {
      return 0;
    }
    const { key, direction } = sortConfig;
    let valueA = key === 'marketboard' ? a[key][Object.keys(a[key])[0]] : a[key];
    let valueB = key === 'marketboard' ? b[key][Object.keys(b[key])[0]] : b[key];

    if (key === 'Name') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (key === 'Recipes') {
        valueA = valueA === "No recipes" ? false : true
        valueB = valueB === "No recipes" ? false : true
    }

    if (valueA < valueB) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (valueA > valueB) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  }) : [{"_id":"2",
  "Name":"Fire Shard",
  "Recipes":"No recipes",
  "shopPrice": 9,
  "shopSellPrice": 9,
  "containsUntradeable":false,
  "marketboard":{
      "34": {
          "currentAverage": 158.22858,
          "overallAverage": 102.47369,
          "price": 88,
          "saleVelocity": 2.857143,
          "profitMargin": 1,
          "shortProfitIndex": 2.857143}
  }}];

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ArrowUp /> : <ArrowDown />;
    }
    return null;
  };

  return (
    <Table bordered hover responsive>
      <thead>
        <tr className='blue white-text'>
          <th onClick={() => handleSort('_id')}>
            ID {getArrow('_id')}
          </th>
          <th onClick={() => handleSort('Name')}>
            Name {getArrow('Name')}
          </th>
          <th onClick={() => handleSort('Recipes')}>
            Craftable? {getArrow('Recipes')}
          </th>
          <th onClick={() => handleSort('shopPrice')}>
            Shop Price {getArrow('shopPrice')}
          </th>
          <th onClick={() => handleSort('shopSellPrice')}>
        Shop Sell Price {getArrow('shopSellPrice')}
      </th>
      <th onClick={() => handleSort(`marketboard.${worldID}.currentAverage`)}>Current Average {getArrow(`marketboard.${worldID}.currentAverage`)}</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.overallAverage`)}>Overall Average {getArrow(`marketboard.${worldID}.overallAverage`)}</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.price`)}>Lowest Price {getArrow(`marketboard.${worldID}.price`)}</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.saleVelocity`)}>Sale Velocity {getArrow(`marketboard.${worldID}.saleVelocity`)}</th>
    </tr>
  </thead>
  <tbody>
    {sortedItems.map((item) => {
      const marketboardData = item.marketboard[Object.keys(item.marketboard)[0]];

      return (
        <tr className="table-bg off-white-text data-row"key={item._id}>
          <td className="align-middle">{item._id}</td>
              <td className="align-middle">{item.Name}</td>
              <td className="align-middle">{item.Recipes === "No recipes" ? "No" : "Yes"}</td>
              <td className="align-middle">{item.shopPrice}</td>
              <td className="align-middle">{item.shopSellPrice}</td>
              <td className="align-middle">{marketboardData.currentAverage.toFixed(2)}</td>
              <td className="align-middle">{marketboardData.overallAverage.toFixed(2)}</td>
              <td className="align-middle">{marketboardData.price}</td>
              <td className="align-middle">{marketboardData.saleVelocity.toFixed(2)}</td>
            </tr>
      );
    })}
  </tbody>
</Table>
);
};

export default ItemsTable;