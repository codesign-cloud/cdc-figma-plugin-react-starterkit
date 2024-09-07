'use client';

import React, { useState } from 'react';
import './CreateSpiralApp.css';

export default function CreateSpiralApp() {

  const [count, setCount] = useState(120);
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'polygon'>('polygon');

  const onCreate = () => {
    parent.postMessage({ pluginMessage: { type: 'create-spiral', count, shape } }, '*');
  };

  React.useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-spiral') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div className="container">
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
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
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
        <button className="button button--primary" onClick={onCreate}>
          Create shape-spiral
        </button>
      </div>
    </div>
  );
}
