import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AttendanceForm from './AttendanceForm';
import HomePage from "./HomePage";
import FacultyPage from "./FacultyPage";
import StudentPage from "./StudentPage";
import "leaflet/dist/leaflet.css";
import BrandExample from "./common/Navbar";

function App() {
  return (
    <Router>
      <BrandExample />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faculty/*" element={<FacultyPage />} />
          <Route path="/student/*" element={<StudentPage />} />
        </Routes>
    </Router>
  );
}

export default App;
