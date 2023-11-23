import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Manufacturer = (Contract) => {

  const [tableData, setTableData] = useState([]);

  useEffect(()=>{
    const shipmentArray = async()=>{
      try {
        const data = await Contract.Contract.shipmentlist();
        const formattedData = data.map(row => ({
          shipmentId: Number(row[0]),
          manufacturerDetail: row[1],
          distributorDetail: row[2],
          retailerDetail: row[3]
        }));
        setTableData(formattedData);
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    }
    shipmentArray(); 
  },[])
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
              <th>Manufacturer details</th>
              <th>Distributor details</th>
              <th>Retailer details</th>
              <th>More details</th>

            </tr>
          </thead>
          <tbody>
          {/* <tbody> */}
  {tableData.map((row, index) => (
    <tr key={index}>
      <td>{row.shipmentId}</td>
      <td>{row.manufacturerDetail[2]}</td>
      <td>{row.distributorDetail[2]}</td>
      <td>{row.retailerDetail[2]}</td>
      <td>
    <button><Link to={`/details/${row.shipmentId}`}>Click here </Link></button>
 </td>
    </tr>
  ))}
{/* </tbody> */}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manufacturer;
