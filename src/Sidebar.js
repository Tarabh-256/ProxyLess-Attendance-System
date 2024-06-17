import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/student/dashboard/profile">Profile</Link>
        </li>
        <li>
          <Link to="/student/dashboard/attendance">Attendance Records</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
