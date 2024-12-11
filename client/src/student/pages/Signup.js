import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import API from '../services/api';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', { username, email, password });
      alert('User created successfully');
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error creating user');
      }
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
      <Link to='/login'>Login</Link>
    </form>


{/* <MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol onSubmit={handleSubmit} md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
        {error && <p className="error">{error}</p>}

        <div className="d-flex flex-row align-items-center mb-4 ">
          <MDBIcon fas icon="user me-3" size='lg'/>
          <MDBInput placeholder="Username" id='form1' type='text' className='w-100' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput placeholder="Email" id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput placeholder="Password" id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <MDBBtn className='mb-4' size='lg' type="submit">Register</MDBBtn>
        <Link className='mb-4' size='lg' to='/login'>Login</Link>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer> */}
</>
  );
}

export default Signup;
