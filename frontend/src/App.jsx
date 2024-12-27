// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UploadCSV from "./components/Campaign/UploadCSV";
import TemplateEditor from "./components/Campaign/TemplateEditor";
import AISuggestions from "./components/Campaign/AISuggestions";
import CampaignDashboard from "./components/Dashboard/CampaignDashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Auth/Logout";
import DarkThemeLayout from "./components/layout/Layout";
import Campaign from "./pages/Campaign";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Optional Navigation Bar */}
        <nav>
          {/* <Link to="/">Home</Link> */}
          {localStorage.getItem("token") && (
            <>
              <Link to="/upload-csv">Upload CSV</Link>
              <Link to="/templates">Templates</Link>
              <Link to="/ai-suggestions">AI Suggestions</Link>
              <Logout />
            </>
          )}
        </nav>

        <Routes>
          <Route element={<DarkThemeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/upload-csv" element={<UploadCSV />} />
              <Route path="/templates" element={<TemplateEditor />} />
              <Route path="/ai-suggestions" element={<AISuggestions />} />
              <Route path="/campaign" element={<Campaign />} />

              <Route
                path="/campaign/:campaignId"
                element={<CampaignDashboard />}
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
