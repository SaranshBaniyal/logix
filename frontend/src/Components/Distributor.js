import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from "axios";
const Distributor = ({Contract,Address}) => {
  const navigate = useNavigate();
  const [Shipmentid,setShipmentid]=useState([]);
  const [manufacturer,setManufact]=useState("");

  // const result =
  const Call = async ()=>{
    if(Contract , Address){try
    {const result1 = await Contract.showdistributershipment(Address)
      console.log('====================================');
      console.log(result1);
      console.log('====================================');
     setShipmentid(Number(result1))}
     catch(e){
      alert("connect wallet please")
    }
    Manufact();
  }
  }


  const Manufact = async()=>{
    if(Shipmentid){try{const _manufacturer = await Contract.showshipment(Shipmentid);
    console.log (_manufacturer[1])
    setManufact(_manufacturer[1][2]);}catch{
      alert("please wait")
    }}
  }

  const Recived = async()=>{
    //oracle ka call
    await Contract.recievedbydistri(Shipmentid);
    const result = await axios.get(`https://logix-backend.onrender.com/checkconditions?shipment_id=776cd8f0-bec3-48e8-8d2e-ebc83edefc00`)
  }

  useEffect(()=>{
    Call();
  },[])
  return (
    <div className='distributor1'>
      <button onClick={Manufact}> Refresh</button>
      <div className="distributor123">
      <table className="shipment-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Manufacturer Name</th>
              <th>Recieved</th>
              <th>Payment</th>

            </tr>
          </thead>
          {Shipmentid.map(()=>{
            return(
              <tbody>
            <tr>
              <td>{Shipmentid}</td>
              <td>{manufacturer}</td>
              <td><button onClick={Recived}>Recieved</button></td>
              <td><button>Pay Now</button></td>
            </tr>
          </tbody>
            )
          })}
        </table>
        </div>
    </div>
  )
}

export default Distributor