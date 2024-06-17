import React from 'react';
import { Router, Routes,Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';
import AttendanceTable from './AttendanceTable';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  return (
    <Router>
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          <Route path="/student/dashboard/profile" component={Profile} />
          <Route path="/student/dashboard/attendance" component={AttendanceTable} />
          {/* <Redirect from="/student/dashboard" to="/student/dashboard/profile" /> */}
        </Routes>
      </div>
    </div>
    </Router>
  );
};

export default StudentDashboard;
