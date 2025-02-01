import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18
import Popup from "./popup/Popup";

// Create root and render the component
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Popup />);
