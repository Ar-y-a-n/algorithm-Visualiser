// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <video autoPlay muted loop id="bg-video" aria-label="Background video">
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-container">
        <h1 className="title">Algo Visuals</h1>
        <p className="description">Algo Visuals is an interactive platform that helps you visualize your code through algorithms.</p>
        <div className="image-links">
          <Link to="/sorting" className="image-link">
            <img src="/maxresdefault.jpg" alt="Sorting Algorithms" className="algo-image" />
          </Link>
          <Link to="/pathfinding" className="image-link">
            <img src="/path.jpeg" alt="Pathfinding Algorithms" className="algo-image" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
