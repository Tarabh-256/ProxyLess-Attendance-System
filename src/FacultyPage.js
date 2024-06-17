import React, { useState } from 'react';
import axios from 'axios';
// import GenerateKey from './GenerateKey';
import { Link } from 'react-router-dom';
import AttendanceTable from './AttendanceTable';
import styles from './styles/FacultyPage.module.css';

const FacultyPage = () => {
  const [generatedKey, setGeneratedKey] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateKey = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate-key`);
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
      {/* {generatedKey && <p className={styles.key}>Generated Key: {generatedKey}</p>} */}
      <input className={styles.input} type="text" value={generatedKey} />
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <AttendanceTable />
      <Link to="/faculty" className={styles.link}>Refresh</Link>
      <Link to="/" className={styles.link}>Back to Home</Link>

      {/* <Link to="/" className={styles.link}>Back to Home</Link> */}
      
    </div>
    </>
  );
};

export default FacultyPage;
