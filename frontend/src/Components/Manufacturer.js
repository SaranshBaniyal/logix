import React from 'react';
import { Link } from 'react-router-dom';

const Manufacturer = () => {
  return (
    <div className="manufacturer-page">
      <div className="left-panel">
        <button className="create-shipment-button"><Link to='/new-shipment' style={{textDecoration:"none",color:"white"}}>Create Shipment</Link></button>
      </div>
      <div className="vertical-line"></div>
      <div className="right-panel">
        <h2>Departed Shipments</h2>
        <table className="shipment-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Product</th>
              <th>Destination</th>
              <th>Departure Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your departed shipments and render each row */}
            <tr>
              <td>001</td>
              <td>Product A</td>
              <td>Destination X</td>
              <td>2023-10-25</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Product B</td>
              <td>Destination Y</td>
              <td>2023-10-26</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manufacturer;
