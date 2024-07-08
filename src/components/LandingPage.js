// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative" role="main">
      <video autoPlay muted loop id="bg-video" aria-label="Background video">
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-container z-10 text-center" role="presentation">
        <img src="/logojpeg.jpeg" alt="Algo Visuals Logo" className="logo" />
        <h1 className="title">Algo Visuals</h1>
        <p className="description">Algo Visuals is an interactive platform that helps you visualize your code through algorithms.</p>
        <div className="flex space-x-8 mt-8">
          <Link to="/sorting" className="algo-link">
            <div className="algo-card" role="link" tabIndex="0">
              <img src="/sort.png" alt="Sorting Algorithms" className="algo-image" />
              <h2 className="algo-title">Sorting Algorithms</h2>
            </div>
          </Link>
          <Link to="/pathfinding" className="algo-link">
            <div className="algo-card" role="link" tabIndex="0">
              <img src="/path.png" alt="Pathfinding Algorithms" className="algo-image" />
              <h2 className="algo-title">Pathfinding Algorithms</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
