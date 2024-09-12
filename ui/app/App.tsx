import React from "react";
import CreateSpiralApp from "./Demo/CreateSpiralApp";
import "./App.css";
import SelectionChanges from "./Demo/SelectionChanges";
import AsyncFetchQuoteHttp from "./Demo/AsyncFetchQuoteHttp";

export default function App() {
  return (
    <div className="container">
      {/* Edit here to get started */}
      <>
      {/* DEMO */}
      {/* Create Spiral App */}
      <CreateSpiralApp />
      <hr />
      {/* Selection Changes */}
      <h5>Inter-process communication</h5>
      <SelectionChanges />
      <hr />
      {/* Async */}
      <h5>Async</h5>
      <AsyncFetchQuoteHttp />
      {/* /DEMO */}
      </>
    </div>
  );
}