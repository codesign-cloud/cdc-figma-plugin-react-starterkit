'use client';

import React, { useState, useEffect } from 'react';
import './CreateSpiralApp.css';
import { useFigmaMessaging } from '../hooks/useFigmaMessaging';

export default function CreateSpiralApp() {

  const [count, setCount] = useState(120);
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'polygon'>('polygon');

  const { sendToFigma, onFigmaMessage } = useFigmaMessaging({
    targetOrigin: 'https://www.figma.com', // * for local testing, less secure
    debounceMs: 300, // 300ms debounce to prevent spamming Figma with messages
  });

  const createSpirals = () => {
    sendToFigma({ type: 'create-spiral', count, shape });
    // Equivalent to: parent.postMessage({ pluginMessage: { type: 'create-spiral', count, shape } }, '*');
  };

  useEffect(() => {
    const removeMessageListener = onFigmaMessage((m) => {
      switch (m.type) {
        case 'create-spiral':
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
    <div>
      <h2>Spiral Generator</h2>
      <p>Create a colorful spiral with a customizable count and shape.</p>
      <table className="table">
        <tbody>
          <tr className="field">
            <td><label>Count: </label></td>
            <td>
              <input
                title="Count"
                type="number"
                value={count}
                min="1"
                max="500"
                onChange={(e) => setCount(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
              />
            </td>
          </tr>
          <tr className="field">
            <td><label>Shape: </label></td>
            <td>
              <select
                title="Shape"
                value={shape}
                onChange={(e) => setShape(e.target.value as any)}
              >
                <option value="circle">Circle</option>
                <option value="rectangle">Rectangle</option>
                <option value="polygon">Polygon</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <br />
        <button className="button button--primary" onClick={createSpirals}>
          Create shape-spiral
        </button>
      </div>
    </div>
  );
}
