import React, { useState } from 'react'

const Signupmnanu = (Contract) => {
  const [name, setname] = useState("")
  const [phno, setphno] = useState("")
  const [companyname, setcompanyname] = useState("")
  const regManu = async ()=>{
    await Contract.Contract.registerManufacturer(
      name , phno , companyname
    )
  }
  return (
    <div className="signup-container">
        <div className='signuwrapper'>
                  <h2>Signup</h2>
      <form>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required onChange={(e)=>{setname(e.target.value)}} />
        </div>

        {/* <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />
        </div> */}

        <div className="input-group">
          <label htmlFor="phone">Phone No:</label>
          <input type="tel" id="phone" name="phone" required onChange={(e)=>{setphno(e.target.value)}}/>
        </div>

        <div className="input-group">
          <label htmlFor="company">Company Name:</label>
          <input type="text" id="company" name="company" required onChange={(e)=>{setcompanyname(e.target.value)}}/>
        </div>

        <button type="submit" className='submit-button' onClick={regManu}>Submit</button>
      </form>
      </div>

    </div>
  )
}

export default Signupmnanu
