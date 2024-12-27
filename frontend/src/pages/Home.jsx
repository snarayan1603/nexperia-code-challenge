import React from "react";
import { Link as MUILink } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="home-container">
      <h1>Welcome to Nexperia Tech Email Outreach Platform</h1>
      {token ? (
        <div>
          <MUILink component={Link} to="/upload-csv" underline="hover">
            Start a New Campaign
          </MUILink>
        </div>
      ) : (
        <div>
          <MUILink component={Link} to="/login" underline="hover">
            Login
          </MUILink>{" "}
          |{" "}
          <MUILink component={Link} to="/register" underline="hover">
            Register
          </MUILink>
        </div>
      )}
    </div>
  );
};

export default Home;
