import { useState } from 'react';
import { Table } from 'react-bootstrap';

const ItemsTable = ({ items, worldID }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedItems = items.sort((a, b) => {
    if (sortConfig === null) {
      return 0;
    }
    const { key, direction } = sortConfig;
    const valueA = key === 'marketboard' ? a[key][Object.keys(a[key])[0]] : a[key];
    const valueB = key === 'marketboard' ? b[key][Object.keys(b[key])[0]] : b[key];

    if (valueA < valueB) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (valueA > valueB) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {/* Add onClick handlers to each column header for sorting */}
          <th onClick={() => handleSort('_id')}>ID</th>
          <th onClick={() => handleSort('Name')}>Name</th>
          <th onClick={() => handleSort('Recipes')}>Recipes</th>
          <th onClick={() => handleSort('shopPrice')}>Shop Price</th>
          <th onClick={() => handleSort('shopSellPrice')}>Shop Sell Price</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.currentAverage`)}>Current Average</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.overallAverage`)}>Overall Average</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.price`)}>Lowest Price</th>
          <th onClick={() => handleSort(`marketboard.${worldID}.saleVelocity`)}>Sale Velocity</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => {
          const marketboardData = item.marketboard[Object.keys(item.marketboard)[0]];

          return (
            <tr key={item._id}>
              <td className="align-middle">{item._id}</td>
              <td className="align-middle">{item.Name}</td>
              <td className="align-middle">{item.Recipes === "No recipes" ? "--" : item.Recipes}</td>
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
