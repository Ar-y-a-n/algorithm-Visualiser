import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SortingPage.css';

const SortingPage = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10); // Initial array size set to 10
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50); // Initial speed set to 50

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 496) + 5); // Adjusted here
    setArray(newArray);
  };

  // Reverse speed calculation: higher value = faster speed
  const getAnimationDelay = () => {
    const minDelay = 10; // Minimum delay in milliseconds
    const maxDelay = 500; // Maximum delay in milliseconds
    return minDelay + ((maxDelay - minDelay) * (1000 - speed) / 999);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, getAnimationDelay())); // Adjust the speed of the animation
        }
      }
    }
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, getAnimationDelay())); // Adjust the speed of the animation
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setIsSorting(false);
  };

  return (
    <div className="sorting-page">
      <header className="sorting-header">
        <h1>Sorting Algorithms</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
      <div className="sorting-controls">
        <button onClick={resetArray} disabled={isSorting}>Reset Array</button>
        <input
          type="range"
          min="1"
          max="200"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isSorting}
        />
        <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
        <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
      </div>
      <div className="speed-control">
        <label htmlFor="speedRange">Speed:</label>
        <input
          type="range"
          id="speedRange"
          min="1"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
        <span>{(1000 - speed).toFixed(0)} ms</span> {/* Display speed in milliseconds */}
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${100 / array.length}%`, // Adjust the width of the bars
              margin: '0 1px'
            }}
          >
            {arraySize < 10 && <div className="array-number">{value}</div>} {/* Display numbers conditionally */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingPage;
