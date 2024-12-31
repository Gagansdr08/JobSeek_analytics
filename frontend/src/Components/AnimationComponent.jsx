// import React, { useEffect, useRef } from "react";
// import "./AnimationComponent.css";

// const AnimationComponent = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const drawLines = () => {
//       const container = containerRef.current;
//       const nodes = container.querySelectorAll(".node");
//       container.querySelectorAll(".line").forEach((line) => line.remove());

//       nodes.forEach((node, index) => {
//         const nextNode = nodes[(index + 1) % nodes.length]; // Connect to the next node

//         const line = document.createElement("div");
//         line.classList.add("line");

//         const rect1 = node.getBoundingClientRect();
//         const rect2 = nextNode.getBoundingClientRect();

//         const x1 = rect1.left + rect1.width / 2 - container.offsetLeft;
//         const y1 = rect1.top + rect1.height / 2 - container.offsetTop;
//         const x2 = rect2.left + rect2.width / 2 - container.offsetLeft;
//         const y2 = rect2.top + rect2.height / 2 - container.offsetTop;

//         const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//         const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

//         line.style.width = `${length}px`;
//         line.style.transform = `rotate(${angle}deg)`;
//         line.style.top = `${y1}px`;
//         line.style.left = `${x1}px`;

//         container.appendChild(line);
//       });
//     };

//     drawLines();
//     window.addEventListener("resize", drawLines); // Re-draw on resize

//     return () => window.removeEventListener("resize", drawLines);
//   }, []);

//   return (
//     <div className="animation-container" ref={containerRef}>
//       <div className="node" style={{ top: "20%", left: "40%" }}>👤</div>
//         <div className="node" style={{ top: "50%", left: "30%" }}>💼</div>
//         <div className="node" style={{ top: "70%", left: "60%" }}>🌐</div>
//         <div className="node" style={{ top: "30%", left: "70%" }}>👥</div>
//     </div>
//   );
// };

// export default AnimationComponent;

import React, { useEffect, useRef } from "react";
import "./AnimationComponent.css";

const AnimationComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const drawHexagonalGrid = () => {
      const container = containerRef.current;
      const nodes = [];
      const nodeSize = 50; // Diameter of each node
      const hexHeight = Math.sqrt(4) * nodeSize;
      const hexWidth = 4 * nodeSize;
      const vertSpacing = hexHeight * 1.25;
      const horizSpacing = 1.2 * hexWidth;
      const maxNodes = 12; // Limit to 12 nodes

      // Clear previous nodes and lines
      container.innerHTML = "";

      // Coordinates for a hexagonal grid with 12 nodes
      const hexPositions = [
        [0, 0],
        [1, 0],
        [2, 0],
        [0.5, Math.sqrt(3) / 2],
        [1.5, Math.sqrt(3) / 2],
        [2.5, Math.sqrt(3) / 2],
        [0, Math.sqrt(3)],
        [1, Math.sqrt(3)],
        [2, Math.sqrt(3)],
        [0.5, 1.5 * Math.sqrt(3)],
        [1.5, 1.5 * Math.sqrt(3)],
        [2.5, 1.5 * Math.sqrt(3)],
      ];

      // Center the grid in the container
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const gridOffsetX = (containerWidth - horizSpacing * 2.5) / 2;
      const gridOffsetY = (containerHeight - vertSpacing * 2) / 2;

      // Create nodes based on hexagonal positions
      hexPositions.slice(0, maxNodes).forEach(([x, y]) => {
        const node = document.createElement("div");
        node.classList.add("node");
        node.style.width = `${nodeSize}px`;
        node.style.height = `${nodeSize}px`;
        node.style.left = `${gridOffsetX + x * horizSpacing}px`;
        node.style.top = `${gridOffsetY + y * vertSpacing}px`;
        container.appendChild(node);
        nodes.push(node);
      });

      // Connect nodes with lines
      const connectNodes = (node1, node2) => {
        const line = document.createElement("div");
        line.classList.add("line");

        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - container.offsetLeft;
        const y1 = rect1.top + rect1.height / 2 - container.offsetTop;
        const x2 = rect2.left + rect2.width / 2 - container.offsetLeft;
        const y2 = rect2.top + rect2.height / 2 - container.offsetTop;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;

        container.appendChild(line);
      };

      // Define connections for a hexagonal grid
      const connections = [
        [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
        [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
        [6, 7], [7, 8], [6, 9], [7, 10], [8, 11],
        [9, 10], [10, 11]
      ];

      connections.forEach(([i, j]) => {
        if (nodes[i] && nodes[j]) {
          connectNodes(nodes[i], nodes[j]);
        }
      });
    };

    drawHexagonalGrid();
    window.addEventListener("resize", drawHexagonalGrid);

    return () => window.removeEventListener("resize", drawHexagonalGrid);
  }, []);

  return <div className="animation-container" ref={containerRef}></div>;
};

export default AnimationComponent;
