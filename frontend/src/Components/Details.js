import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function Details(Contract) {
    const id = useParams();
    const [tableData, setTableData] = useState([]);
    const [shipmentData,setShipmentData]=useState("");
    const [manufacturerDetail, setManu] = useState([])
    const [distributorDetail, setdistributor] = useState([])
    const [retailer, setRetailer] = useState([])

    const getshipment = async()=>{
        const data = await Contract.Contract.showshipment(id.id);
        setShipmentData(Number(data[0]));
        setManu(data[1]);
        setdistributor(data[2])
        setRetailer(data[3])
    }
    useEffect(()=>{
        getshipment();

        // setShipmentData(Number(shipmentData))
        
       
    },[])

    console.log('====================================');
        console.log(shipmentData,"==",manufacturerDetail,"===",retailer);
        console.log('====================================');
  return (
    <div className='detailpage'>
        <h1>Shipment ID :- {shipmentData}</h1>
      <div className="detailpageWrapper">
<div className="card" style={{ width: "18rem" }}>
  <img src="https://th.bing.com/th/id/OIP.E_qQ5msHTSjRmXHnHqJvwgHaIh?w=181&h=208&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Manufacturer</h5>
    
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name:- {manufacturerDetail[2]}</li>
    <li className="list-group-item">Company Name:-{manufacturerDetail[3]}</li>
    <li className="list-group-item">Address:- {manufacturerDetail[1]}</li>
  </ul>
  
</div>

<div className="card" style={{ width: "18rem" }}>
  <img src="https://th.bing.com/th/id/OIP.o90E-YvzwbDxUWQ-Yae1cAAAAA?w=198&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Distributor</h5>
    
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name:- {distributorDetail[2]}</li>
    <li className="list-group-item">Company Name:- {distributorDetail[3]}</li>
    <li className="list-group-item">Address:- {distributorDetail[1]}</li>
  </ul>
  
</div>

<div className="card" style={{ width: "18rem" }}>
  <img src="https://th.bing.com/th/id/OIP.gkv2PdTcGnBkrDWCSDdIhgHaFw?w=222&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Retailer</h5>
    
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Name:- {retailer[2]}</li>
    <li className="list-group-item">Company Name:- {retailer[3]}</li>
    <li className="list-group-item">Address:- {retailer[1]}</li>
  </ul>
  
</div>
</div>

      {/* <div className="detailpagewrapper">
        <div className='cb1'>
        <div>
            <h2>Shipment Details</h2>
            <h3>Shipment ID :- {shipmentData}</h3>
        </div>
        <div>
            <h2>Manufacturer details</h2>
            <h3>Manufacturer Address :- {manufacturerDetail[1]}</h3>
            <h3>Manufacturer Name :- {manufacturerDetail[2]}</h3>
            <h3>Manufacturer Company Name :- {manufacturerDetail[3]}</h3>
        </div>
        <div>
            <h2>Distributor details</h2>
            <h3>Distributor Address :- {distributorDetail[1]}</h3>
            <h3>Distributor Name :- {distributorDetail[2]}</h3>
        </div>
        <div>
            <h2>Retailer details</h2>
            <h3>Distributor Address :- {retailer[1]}</h3>
            <h3>Distributor Name :- {retailer[2]}</h3>
        </div>

        </div>
      </div> */}
    </div>
  )
}

export default Details
