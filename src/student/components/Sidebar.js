// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard/todo-list">Todo List</Link></li>
        <li><Link to="/dashboard/mark-attendance">Mark Attendance</Link></li>
        <li><Link to="/dashboard/attendance-report">Attendance Report</Link></li>
        <li><Link to="/dashboard/events">Events</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
