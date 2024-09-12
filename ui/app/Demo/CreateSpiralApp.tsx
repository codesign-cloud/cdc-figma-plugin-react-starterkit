'use client';

import React, { useState, useEffect } from 'react';
import './Demo.css';
import { useFigmaMessaging } from '../hooks/useFigmaMessaging';

export default function CreateSpiralApp() {

  const [count, setCount] = useState(120);
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'polygon'>('polygon');

  const { sendToFigma, onFigmaMessage } = useFigmaMessaging({
    targetOrigin: 'https://www.figma.com', // * for local testing, less secure
    debounceMs: 300, // 300ms debounce to prevent spamming Figma with messages
  });

  const createSpirals = () => {
    sendToFigma({ type: 'demo-create-spiral', count, shape });
    // Equivalent to: parent.postMessage({ pluginMessage: { type: 'demo-create-spiral', count, shape } }, '*');
  };

  useEffect(() => {
    const removeMessageListener = onFigmaMessage((m) => {
      switch (m.type) {
        case 'demo-create-spiral':
          console.log(`Figma says: ${m.message}`);
          sendToFigma({ type:'show-notification', message: "Plugin: Figma said spirals have been created"})
          break;
        default:
          console.log(`Unknown message type received from Figma: ${m.type}`);
      }
    });

    return removeMessageListener;
  }, [onFigmaMessage]);

  return (
    <div className='text-sm'>
      <h3 className="text-xl font-bold">Spiral Generator</h3>
      <p className="text-xs text-gray-500 pt-0 pb-4">Create a colorful spiral with a customizable count and shape.</p>
      <table className="table">
        <tbody>
          <tr>
            <td><label className="text-gray-500 text-sm">Count</label></td>
            <td>
              <input
                title="Count"
                type="number"
                value={count}
                min="1"
                max="500"
                onChange={(e) => setCount(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
                className="text-md w-full p-1 rounded-md"
              />
            </td>
          </tr>
          <tr>
            <td><label className="text-gray-500 text-sm">Shape</label></td>
            <td>
              <select
                title="Shape"
                value={shape}
                onChange={(e) => setShape(e.target.value as any)}
                className="text-md w-full p-1 rounded-md"
              >
                <option value="circle">Circle</option>
                <option value="rectangle">Rectangle</option>
                <option value="polygon">Polygon</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='mt-2'>
        <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-sm" onClick={createSpirals} type="button">
          Create shape-spiral
        </button>
      </div>
    </div>
  );
}
