// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SortingPage from './components/SortingPage/SortingPage';
// Import other components when ready
// import SortingAlgorithms from './components/SortingAlgorithms';
// import PathfindingAlgorithms from './components/PathfindingAlgorithms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/sorting" element={<SortingPage />} /> 
        {/* <Route path="/pathfinding" element={<PathfindingAlgorithms />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
