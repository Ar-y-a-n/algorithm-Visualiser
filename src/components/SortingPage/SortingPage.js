// src/components/SortingPage/SortingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SortingPage.css';

const SortingPage = () => {
  return (
    <div className="sorting-page">
      <header className="sorting-header">
        <h1>Sorting Algorithms</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
      <div className="sorting-content">
        {/* Add sorting algorithm components or visualizations here */}
        <p>Here you can visualize different sorting algorithms.</p>
        {/* Example: <BubbleSort /> */}
      </div>
    </div>
  );
};

export default SortingPage;
