// src/pages/Dashboard.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TodoList from '../components/TodoList';
import MarkAttendance from '../components/MarkAttendance';
import AttendanceReport from '../components/AttendanceReport';
import EventsComponent from '../components/EventComponent';
import '../../Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content_wrapper">
      <div className="content">
        <Routes>
          <Route path="todo-list" element={<TodoList />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="events" element={<EventsComponent />} />
          <Route path="todo-list" element={<Navigate to="todo-list" />} />
        </Routes>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;

  


