'use client';

import React, { useState, useEffect } from 'react';
import './CreateSpiralApp.css';
import { useFigmaMessaging } from '../hooks/useFigmaMessaging';

export default function CreateSpiralApp() {

  const [count, setCount] = useState(120);
  const [shape, setShape] = useState<'circle' | 'rectangle' | 'polygon'>('polygon');

  const [figmaSelectedNodes, setFigmaSelectedNodes] = useState([0]);

  const { sendToFigma, onFigmaMessage } = useFigmaMessaging();

  const createSpirals = () => {
    //parent.postMessage({ pluginMessage: { type: 'create-spiral', count, shape } }, '*');
    sendToFigma({ type: 'create-spiral', count, shape });
  };

  useEffect(() => {
    const removeMessageListener = onFigmaMessage((m) => {
      switch (m.type) {
        case 'selectionchange':
          console.log(`Figma says: ${m.message}`);
          console.log(`Figma payload: ${JSON.stringify(m.data??{})}`);
          setFigmaSelectedNodes(m.data?.nodeCount??0);
          break;
        case 'create-spiral':
          console.log(`Figma says: ${m.message}`);
          break;
        default:
          console.log(`Unknown message type received from Figma: ${m.type}`);
      }
    });

    return removeMessageListener;
  }, [onFigmaMessage]);

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
        <button className="button button--primary" onClick={createSpirals}>
          Create shape-spiral
        </button>
      </div>
      <div className="information">
        <br />
        <p>Nodes selected in Figma: {figmaSelectedNodes}</p>
      </div>
    </div>
  );
}
