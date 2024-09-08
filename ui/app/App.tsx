import React from "react";
import CreateSpiralApp from "./Demo/CreateSpiralApp";
import "./App.css";
import SelectionChanges from "./Demo/SelectionChanges";

export default function App() {
  return (
    <div className="container">
      {/* Edit here to get started */}
      {/* DEMO: Create Spiral App */}
      <CreateSpiralApp />
      {/* DEMO: Selection Changes */}
      <SelectionChanges />
      {/* /DEMO */}
    </div>
  );
}