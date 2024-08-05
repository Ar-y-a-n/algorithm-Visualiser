import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pathfinding.css';

const PathfindingPage = () => {
  const [grid, setGrid] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSearching, setIsSearching] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const createInitialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < 20; row++) { // Increase the number of rows
      const currentRow = [];
      for (let col = 0; col < 40; col++) { // Increase the number of columns
        currentRow.push(createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: false,
      isEnd: false,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row, col) => {
    if (!startNode) {
      const newGrid = getNewGridWithStartNode(grid, row, col);
      setGrid(newGrid);
      setStartNode({ row, col });
    } else if (!endNode) {
      const newGrid = getNewGridWithEndNode(grid, row, col);
      setGrid(newGrid);
      setEndNode({ row, col });
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithStartNode = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getNewGridWithEndNode = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isEnd: true,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // Reverse speed calculation: higher value = faster speed
  const getAnimationDelay = () => {
    const minDelay = 10; // Minimum delay in milliseconds
    const maxDelay = 500; // Maximum delay in milliseconds
    return minDelay + ((maxDelay - minDelay) * (1000 - speed) / 999);
  };

  const animateAlgorithm = (nodesInOrder, nodesInPath) => {
    for (let i = 0; i <= nodesInOrder.length; i++) {
      if (i === nodesInOrder.length) {
        setTimeout(() => {
          animatePath(nodesInPath);
        }, getAnimationDelay() * i);
        return;
      }
      setTimeout(() => {
        const node = nodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, getAnimationDelay() * i);
    }
  };

  const animatePath = (nodesInPath) => {
    for (let i = 0; i < nodesInPath.length; i++) {
      setTimeout(() => {
        const node = nodesInPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
      }, getAnimationDelay() * i);
    }
  };

  const dijkstra = () => {
    if (!startNode || !endNode) return;
    setIsSearching(true);
    const { nodesInOrder, nodesInPath } = dijkstraAlgorithm(grid, startNode, endNode);
    animateAlgorithm(nodesInOrder, nodesInPath);
    setIsSearching(false);
  };

  const dfs = () => {
    if (!startNode || !endNode) return;
    setIsSearching(true);
    const { nodesInOrder, nodesInPath } = depthFirstSearch(grid, startNode, endNode);
    animateAlgorithm(nodesInOrder, nodesInPath);
    setIsSearching(false);
  };

  const resetGrid = () => {
    window.location.reload(); // Refreshes the page to reset the grid
  };

  return (
    <div className="pathfinding-page">
      <header className="pathfinding-header">
        <h1>Pathfinding Algorithms</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
      <div className="pathfinding-controls">
        <button onClick={dijkstra} disabled={isSearching}>Dijkstra</button>
        <button onClick={dfs} disabled={isSearching}>Depth First Search</button>
        <button onClick={resetGrid} disabled={isSearching}>Reset Grid</button>
        <label htmlFor="speedRange">Speed:</label>
        <input
          type="range"
          id="speedRange"
          min="1"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSearching}
        />
        <span>{(1000 - speed).toFixed(0)} ms</span> {/* Display speed in milliseconds */}
      </div>
      <div className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <div
                  key={nodeIdx}
                  id={`node-${row}-${col}`}
                  className={`node ${isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : ''}`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const dijkstraAlgorithm = (grid, startNode, endNode) => {
  const nodesInOrder = [];
  const nodesInPath = [];
  const unvisitedNodes = getAllNodes(grid);
  const startNodeInGrid = grid[startNode.row][startNode.col];
  startNodeInGrid.distance = 0;

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return { nodesInOrder, nodesInPath };

    closestNode.isVisited = true;
    nodesInOrder.push(closestNode);

    if (closestNode === grid[endNode.row][endNode.col]) {
      let currentNode = closestNode;
      while (currentNode !== null) {
        nodesInPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }
      return { nodesInOrder, nodesInPath };
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const depthFirstSearch = (grid, startNode, endNode) => {
  const nodesInOrder = [];
  const nodesInPath = [];
  const stack = [grid[startNode.row][startNode.col]];

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode.isWall || currentNode.isVisited) continue;
    if (currentNode === grid[endNode.row][endNode.col]) {
      let pathNode = currentNode;
      while (pathNode !== null) {
        nodesInPath.unshift(pathNode);
        pathNode = pathNode.previousNode;
      }
      return { nodesInOrder, nodesInPath };
    }

    currentNode.isVisited = true;
    nodesInOrder.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  return { nodesInOrder, nodesInPath };
};

const getAllNodes = (grid) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (nodes) => {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

export default PathfindingPage;
