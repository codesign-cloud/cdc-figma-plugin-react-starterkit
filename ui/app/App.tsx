'use client';
import React, { useEffect, useState } from 'react';
import { useFigmaMessaging, FigmaMessage } from './hooks/useFigmaMessaging';
import CreateSpiralApp from "./Demo/CreateSpiralApp";
import SelectionChanges from "./Demo/SelectionChanges";
import AsyncFetchQuoteHttp from "./Demo/AsyncFetchQuoteHttp";
import "./App.css";

export default function App() {
  
  const [figmaSelNodeCount, setFigmaSelNodeCount] = useState(0);

  const { onFigmaMessage, sendToFigma } = useFigmaMessaging({
    targetOrigin: 'https://www.figma.com', // * for local testing, less secure
    debounceMs: 300, // 300ms debounce to prevent spamming Figma with messages
  });

  useEffect(() => {
    const removeMessageListener = onFigmaMessage((message: FigmaMessage) => {
      switch (message.type) {
        case 'selectionchange':
          console.log(`Figma says: ${message.message}`);
          console.log(`Figma payload: ${JSON.stringify(message.data ?? {})}`);
          setFigmaSelNodeCount(message.data?.count ?? 0);
          // Dispatch an action or update state here
          break;
        case 'demo-create-spiral':
          console.log(`Figma says: ${message.message}`);
          sendToFigma({ type:'show-notification', message: "Plugin: Figma said spirals have been created"})
          break;

          default:
          console.log(`Unknown message type received from Figma: ${message.type}`);
      }
    });

    return removeMessageListener;
  }, [onFigmaMessage, sendToFigma]);
  
  return (
    <div className="px-4 py-3 bg-gray-100 h-full w-full">
      {/* Edit here to get started */}
        {/* ===== DEMO ===== */}
        {/* Create Spiral App */}
        <CreateSpiralApp sendToFigma={sendToFigma} />
        <hr className="my-3" />
        {/* Selection Changes */}
        <SelectionChanges sendToFigma={sendToFigma} figmaSelectedNodeCount={figmaSelNodeCount} />
        <hr className="my-3" />
        {/* Async Quote Fetcher*/}
        <AsyncFetchQuoteHttp sendToFigma={sendToFigma} />
        {/* ===== DEMO ===== */}
    </div>
  );
}