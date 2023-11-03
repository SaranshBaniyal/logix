import React from 'react'

const Signup = () => {
  return (
    <div className="signup-container">
        <div className='signuwrapper'>
                  <h2>Signup</h2>
      <form>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone No:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div className="input-group">
          <label htmlFor="company">Company Name:</label>
          <input type="text" id="company" name="company" required />
        </div>

        <button type="submit" className='submit-button'>Submit</button>
      </form>
      </div>

    </div>
  )
}

export default Signup
