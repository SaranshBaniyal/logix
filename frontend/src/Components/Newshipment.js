import React, { useState } from 'react';
import axios from 'axios'
const NewShipment = (Contract) => {

  const [manunname, setmanuName] = useState('');
  const [manuphn, setmanuphn] = useState('');
  const [manucompany, setmanucomp] = useState('');

const [receiverName, setReceiverName] = useState('');
const [receiverPhone, setReceiverPhone] = useState('');
const [receiverAddress, setReceiverAddress] = useState('');

const [maxTemp, setMaxTemp] = useState(null);
const [minTemp, setMinTemp] = useState(null);
const [maxHumidity, setMaxHumidity] = useState(null);
const [minHumidity, setMinHumidity] = useState(null);
const [payment, setPayment] = useState('');

  const abc = async()=>{
    const response = await axios.post("https://logix-backend.onrender.com/setconditions",{
      "shipment_id": "9000",
      "temperature_upper_limit": 40,
      "temperature_lower_limit": 0,
      "humidity_upper_limit": 80,
      "humidity_lower_limit": 20
      })
      console.log(response)
  }

  // ,Headers={
  //   "Content-Type": "application/json",
  //   "mode" : 'cors',
  // }
  const createShipment = async (e)=>{
    e.preventDefault();
    console.log('====================================')
      console.log('cddd')
      console.log('====================================')
    try {
      const _id = await Contract.Contract.shipmentid();
      await Contract.Contract.createShipment(
        manunname,
        manuphn,
        manucompany,
        receiverAddress,
        receiverName,
        receiverPhone,
        payment,
        'false'
      )
      console.log('====================================');
      console.log(_id);
      console.log('====================================');
      await axios.post("https://logix-backend.onrender.com/setconditions",{
        shipment_id: Number(_id),
        temprature_upper_limit: maxTemp,
        temprature_lower_limit: minTemp,
        humidity_upper_limit: maxHumidity,
        humidity_lower_limit: minHumidity
      })
      
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }



  return (
    <div className="new-shipment-page">
      <div className="left-panel">
        <img src="https://kinsta.com/pt/wp-content/uploads/sites/3/2019/03/kinsta-qr-code.png" alt="QR Code" />
      </div>
      <div className="right-panel">
        <h2>Create New Shipment</h2>
        <form>
          <div className="form-group">
            <label htmlFor="shipment-name">Manufacturer Name:</label>
            <input type="text" id="shipment-name" name="shipmentName" value={manunname} onChange={(e) => setmanuName(e.target.value)} />
          </div>
          <div className="form-12">
          <div className="form-group">
            <label htmlFor="shipment-name">Manufacturer Phn no:</label>
            <input type="text" id="receiver-name" name="receiverName" value={manuphn} onChange={(e) => setmanuphn(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="shipment-name">Manufacturer Company name:</label>
            <input type="text" id="receiver-phone" name="receiverPhone" value={manucompany} onChange={(e) => setmanucomp(e.target.value)} />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="shipment-name">Distribuor Name:</label>
            <input type="text" id="shipment-name" name="distributor" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="receiver-address">Distributor Address:</label>
            <textarea id="receiver-address" name="receiverAddress" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)}></textarea>
          </div>
          
          {/* <div className="form-12"> */}
          <div className="form-group">
            <label htmlFor="shipment-name">Distibutor Phn no:</label>
            <input type="text" id="receiver-name" name="receiverName" value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} />
          </div>
          <div className='form-12'>
          <div className="form-group">
            <label htmlFor="gst-no">Maximum Temp:-</label>
            <input type="text" id="max-temp" name="maxTemp" value={maxTemp} onChange={(e) => setMaxTemp(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="gst-no">Minimum Temp:-</label>
            <input type="text" id="min-temp" name="minTemp" value={minTemp} onChange={(e) => setMinTemp(e.target.value)} />
          </div>
          </div>
          <div className='form-12'>
          <div className="form-group">
            <label htmlFor="gst-no">Maximum Humidity:-</label>
            <input type="text" id="max-humidity" name="maxHumidity" value={maxHumidity} onChange={(e) => setMaxHumidity(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="gst-no">Minimum Humidity:-</label>
            <input type="text" id="min-humidity" name="minHumidity" value={minHumidity} onChange={(e) => setMinHumidity(e.target.value)} />
          </div>
          </div>
          {/* temp -> upper , lower
          humidity -> uper , lower  */}
          <div className="form-group">
            <label htmlFor="payment">Payment:</label>
            <input type="text" id="payment" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)} />
          </div>
          <button type="submit" className="submit-button" onClick={createShipment}>Submit</button>
        </form>
      </div>
      <button onClick={abc}>click</button>
    </div>
  );
};

export default NewShipment;
