import React from "react";
import CreateSpiralApp from "./Demo/CreateSpiralApp";
import "./App.css";
import SelectionChanges from "./Demo/SelectionChanges";
import AsyncFetchQuoteHttp from "./Demo/AsyncFetchQuoteHttp";

export default function App() {
  return (
    <div className="px-4 py-3 bg-gray-100 h-full w-full">
      {/* Edit here to get started */}
      <>
        {/* ===== DEMO ===== */}
        {/* Create Spiral App */}
        <CreateSpiralApp />
        <hr className="my-3" />
        {/* Selection Changes */}
        <SelectionChanges />
        <hr className="my-3" />
        {/* Async Quote Fetcher*/}
        <AsyncFetchQuoteHttp />
        {/* ===== DEMO ===== */}
      </>
    </div>
  );
}