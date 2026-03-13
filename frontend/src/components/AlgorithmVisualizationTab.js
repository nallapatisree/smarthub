import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import "./AlgorithmVisualization.css";

export default function AlgorithmVisualizationTab() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [arraySize, setArraySize] = useState(20);
  const [sortingArray, setSortingArray] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Algorithm definitions
  const algorithms = {
    "bubble-sort": {
      name: "Bubble Sort",
      description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order.",
      complexity: { time: "O(n²)", space: "O(1)" },
      color: "#3b82f6"
    },
    "quick-sort": {
      name: "Quick Sort",
      description: "Divides array into partitions using a pivot element and recursively sorts them.",
      complexity: { time: "O(n log n) avg", space: "O(log n)" },
      color: "#8b5cf6"
    },
    "merge-sort": {
      name: "Merge Sort",
      description: "Divides array in half, recursively sorts each half, then merges them back together.",
      complexity: { time: "O(n log n)", space: "O(n)" },
      color: "#10b981"
    },
    "insertion-sort": {
      name: "Insertion Sort",
      description: "Builds the sorted array one item at a time by inserting elements into their correct position.",
      complexity: { time: "O(n²)", space: "O(1)" },
      color: "#f59e0b"
    },
    "selection-sort": {
      name: "Selection Sort",
      description: "Repeatedly finds the minimum element and places it at the beginning.",
      complexity: { time: "O(n²)", space: "O(1)" },
      color: "#ef4444"
    },
    "binary-search": {
      name: "Binary Search",
      description: "Efficiently searches a sorted array by repeatedly dividing search interval in half.",
      complexity: { time: "O(log n)", space: "O(1)" },
      color: "#06b6d4"
    }
  };

  // Initialize array
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setSortingArray(arr);
    setComparisons(0);
    setSwaps(0);
    setHighlightedIndices([]);
    setSortedIndices([]);
  };

  // Bubble Sort Animation
  const bubbleSortAnimation = async () => {
    let arr = [...sortingArray];
    let comps = 0, swp = 0;
    const delay = 101 - speed;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comps++;
        setHighlightedIndices([j, j + 1]);
        setComparisons(comps);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swp++;
          setSwaps(swp);
          setSortingArray([...arr]);
        }

        await new Promise(r => setTimeout(r, delay));
      }
      setSortedIndices([...setSortedIndices(), arr.length - i - 1]);
    }

    setHighlightedIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Insertion Sort Animation
  const insertionSortAnimation = async () => {
    let arr = [...sortingArray];
    let comps = 0, swp = 0;
    const delay = 101 - speed;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        comps++;
        setHighlightedIndices([j, j + 1]);
        setComparisons(comps);
        arr[j + 1] = arr[j];
        swp++;
        setSwaps(swp);
        setSortingArray([...arr]);
        j--;

        await new Promise(r => setTimeout(r, delay));
      }
      arr[j + 1] = key;
      setSortingArray([...arr]);
    }

    setHighlightedIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Selection Sort Animation
  const selectionSortAnimation = async () => {
    let arr = [...sortingArray];
    let comps = 0, swp = 0;
    const delay = 101 - speed;

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        comps++;
        setHighlightedIndices([minIdx, j]);
        setComparisons(comps);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }

        await new Promise(r => setTimeout(r, delay));
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swp++;
        setSwaps(swp);
        setSortingArray([...arr]);
      }
    }

    setHighlightedIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  // Quick Sort Animation
  const quickSortAnimation = async () => {
    let arr = [...sortingArray];
    let comps = 0, swp = 0;
    const delay = 101 - speed;

    const partition = async (low, high) => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comps++;
        setComparisons(comps);
        setHighlightedIndices([j, high]);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swp++;
          setSwaps(swp);
          setSortingArray([...arr]);
        }

        await new Promise(r => setTimeout(r, delay));
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setSortingArray([...arr]);
      return i + 1;
    };

    const quickSort = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
      }
    };

    await quickSort(0, arr.length - 1);
    setHighlightedIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
  };

  const startSorting = async () => {
    setIsAnimating(true);
    setComparisons(0);
    setSwaps(0);
    setSortedIndices([]);

    switch (selectedAlgorithm) {
      case "bubble-sort":
        await bubbleSortAnimation();
        break;
      case "insertion-sort":
        await insertionSortAnimation();
        break;
      case "selection-sort":
        await selectionSortAnimation();
        break;
      case "quick-sort":
        await quickSortAnimation();
        break;
      default:
        break;
    }

    setIsAnimating(false);
  };

  const algorithm = algorithms[selectedAlgorithm];

  return (
    <div className="algorithm-visualization">
      <div className="viz-container">
        {/* Algorithm Selector */}
        <div className="algorithm-selector">
          <h3>Choose Algorithm</h3>
          <div className="algo-buttons">
            {Object.entries(algorithms).map(([key, algo]) => (
              <button
                key={key}
                className={`algo-btn ${selectedAlgorithm === key ? "active" : ""}`}
                onClick={() => {
                  setSelectedAlgorithm(key);
                  generateRandomArray();
                }}
                disabled={isAnimating}
              >
                <span className="algo-color" style={{ backgroundColor: algo.color }}></span>
                {algo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="algo-info-card">
          <div className="info-header">
            <h3>{algorithm.name}</h3>
            <span className="color-indicator" style={{ backgroundColor: algorithm.color }}></span>
          </div>
          <p className="description">{algorithm.description}</p>
          <div className="complexity">
            <div className="complexity-item">
              <span className="label">Time Complexity:</span>
              <span className="value">{algorithm.complexity.time}</span>
            </div>
            <div className="complexity-item">
              <span className="label">Space Complexity:</span>
              <span className="value">{algorithm.complexity.space}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="control-group">
            <label>Array Size: <strong>{arraySize}</strong></label>
            <input
              type="range"
              min="5"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isAnimating}
              className="slider"
            />
          </div>

          <div className="control-group">
            <label>Speed: <strong>{speed}</strong></label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isAnimating}
              className="slider"
            />
          </div>

          <div className="button-group">
            <button
              className="btn-visualize"
              onClick={startSorting}
              disabled={isAnimating}
            >
              {isAnimating ? "Sorting..." : "▶ Visualize"}
            </button>
            <button
              className="btn-reset"
              onClick={generateRandomArray}
              disabled={isAnimating}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-label">Comparisons</span>
            <span className="stat-value">{comparisons}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Swaps</span>
            <span className="stat-value">{swaps}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Array Size</span>
            <span className="stat-value">{arraySize}</span>
          </div>
        </div>

        {/* Visualization */}
        <div className="visualization">
          <div className="bars-container">
            {sortingArray.map((value, idx) => (
              <div
                key={idx}
                className="bar"
                style={{
                  height: `${(value / 100) * 300}px`,
                  backgroundColor: sortedIndices.includes(idx)
                    ? "#10b981"
                    : highlightedIndices.includes(idx)
                    ? algorithm.color
                    : "#e5e7eb",
                  transition: "all 0.1s ease"
                }}
                title={value}
              />
            ))}
          </div>
          <p className="viz-label">Array Elements ({sortingArray.length})</p>
        </div>

        {/* Legend and Explanation */}
        <div className="legend">
          <h4>Color Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#e5e7eb" }}></span>
              <span>Default (Unsorted)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: algorithm.color }}></span>
              <span>Currently Comparing</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#10b981" }}></span>
              <span>Sorted/Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
