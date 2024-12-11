import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Home/HomePage";
import FacultyPage from "./Faculty/FacultyPage";
import SignUp from "./student/pages/Signup";
import NavHeader from "./common/Navbar";
import Login from './student/pages/Login';
import Logout from './student/pages/Logout';


import ProtectedRoute from './student/components/ProtectedRoute';
import { AuthProvider } from './student/auth/AuthContext';

import Dashboard from './student/pages/Dashboard';
// import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <NavHeader />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student/*" element={<SignUp />} />
          <Route path="/faculty/*" element={<FacultyPage />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/signup/*" element={<SignUp />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* <Route path="/dashboard/*" element={<ProtectedRoute Component={Dashboard} />} /> */}
          <Route path="/logout/*" element={<ProtectedRoute element={Logout} />}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

















