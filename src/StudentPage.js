import React from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import styles from './styles/StudentPage.module.css';

import AttendanceForm from './AttendanceForm';
import AttendanceTable from './AttendanceTable';


const StudentPage = () => {
  return (
    <>
    <h2 className='App-header text-center shadow-md w-max ml-[40%] shadow-teal-700 font-bold text-teal-700 italic text-[45px]  p-3 mb-5 bg-body rounded my-5'>Student</h2>
    <div className={styles.container}>
      <AttendanceForm />
      <AttendanceTable />
      {/* <Link to="/student/dashboard" className={styles.dashboardLink}>Go to Dashboard</Link> */}
      <Routes>
      <Route>
        <Route path="/student/dashboard" component={StudentDashboard} />
      </Route>
      </Routes>
      <Link to="/student" className={styles.link}>Refresh</Link>
      <Link to="/" className={styles.link}>Back to Home</Link>
    </div>
    </>
  );
};

export default StudentPage;
