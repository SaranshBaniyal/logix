import React from 'react';

const NewShipment = () => {
  return (
    <div className="new-shipment-page">
      <div className="left-panel">
        <img src="https://kinsta.com/pt/wp-content/uploads/sites/3/2019/03/kinsta-qr-code.png" alt="QR Code" />
      </div>
      <div className="right-panel">
        <h2>Create New Shipment</h2>
        <form>
          <div className="form-group">
            <label htmlFor="shipment-name">Shipment Name:</label>
            <input type="text" id="shipment-name" name="shipmentName" />
          </div>
          <div className="form-12">
          <div className="form-group">
            <label htmlFor="shipment-name">Reciver Name:</label>
            <input type="text" id="reciver-name" name="shipmentName" />
          </div>
          <div className="form-group">
            <label htmlFor="shipment-name">Reciver Phone:</label>
            <input type="text" id="reciver-phn" name="shipmentName" />
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="receiver-address">Receiver Address:</label>
            <textarea id="receiver-address" name="receiverAddress"></textarea>
          </div>
          <div className='form-12'>
          <div className="form-group">
            <label htmlFor="gst-no">Maximum Temp:-</label>
            <input type="text" id="max-temp" name="gstNo" />
          </div>
          <div className="form-group">
            <label htmlFor="gst-no">Minimum Temp:-</label>
            <input type="text" id="min-temp" name="gstNo" />
          </div>
          </div>
          <div className='form-12'>
          <div className="form-group">
            <label htmlFor="gst-no">Maximum Humidity:-</label>
            <input type="text" id="max-humidity" name="gstNo" />
          </div>
          <div className="form-group">
            <label htmlFor="gst-no">Minimum Humidity:-</label>
            <input type="text" id="min-humidity" name="gstNo" />
          </div>
          </div>
          {/* temp -> upper , lower
          humidity -> uper , lower  */}
          <div className="form-group">
            <label htmlFor="payment">Payment:</label>
            <input type="text" id="payment" name="payment" />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewShipment;
