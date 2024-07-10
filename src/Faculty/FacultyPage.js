import React, { useState } from 'react';
// import axios from 'axios';
import API from '../student/services/api';
import { Link } from 'react-router-dom';
import styles from './FacultyStyle/FacultyPage.module.css';

function refreshPage() {
  setTimeout(()=>{
      window.location.reload(false);
  }, 500);
  console.log('page to reload')
};

const FacultyPage = () => {
  const [generatedKey, setGeneratedKey] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateKey = async () => {
    try {
      const response = await API.post('/generate-key');
      // const response = await API.post(`${process.env.REACT_APP_BACKEND_URL}/generate-key`);
      setGeneratedKey(response.data.key);
      setMessage('Key generated successfully');
    } catch (error) {
      setMessage('Error generating address key');
    }
  };

  return (
    <>
      <h2 className='App-header text-center shadow-md w-max ml-[40%] shadow-teal-700 font-bold text-teal-700 italic text-[45px]  p-3 mb-5 bg-body rounded my-5'>Faculty</h2>
    <div className={styles.container}>
      <div className={styles.btnflex}>
      <button className={styles.button} onClick={handleGenerateKey}>Generate Address Key</button>
      <input className={styles.input} type="text" value={generatedKey} />
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <Link to="" onClick={refreshPage} className={styles.link}>Refresh</Link>
      <Link to="/" className={styles.link}>Back to Home</Link>      
    </div>
    </>
  );
};

export default FacultyPage;
