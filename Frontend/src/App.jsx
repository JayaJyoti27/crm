import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard";
import Campaigns from "./Pages/Campaigns";
import AI from "./Pages/AI";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import AuthLayout from "./AuthLayout";
import Uploads from "../Components/Uploads";
import Segments from "./Pages/Segments";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          {/* Add /signup, /forgot-password, etc. here too */}
        </Route>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="upload" element={<Uploads />} />
          <Route path="profile" element={<Profile />} />
          <Route path="ai" element={<AI />} />
          <Route path="segments" element={<Segments />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
