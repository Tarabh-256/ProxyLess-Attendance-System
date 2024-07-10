import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Home/HomePage";
import FacultyPage from "./Faculty/FacultyPage";
import SignUp from "./student/pages/Signup";
import NavHeader from "./common/Navbar";
import Login from './student/pages/Login';


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
          <Route path="/student/*" element={<Login />} />
          <Route path="/faculty/*" element={<FacultyPage />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/signup/*" element={<SignUp />} />
          {/* <ProtectedRoute path="/dashboard/*" component={Dashboard} /> */}
          <Route path="/dashboard/*" element={<ProtectedRoute element={Dashboard} />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

















