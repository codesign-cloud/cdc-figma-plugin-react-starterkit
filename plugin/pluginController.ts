import { PLUGIN_UI_HEIGHT, PLUGIN_UI_WIDTH } from './config';

import { createColorfulSpiral } from './demo/spiralGenerator';

figma.showUI(__html__, { width: PLUGIN_UI_WIDTH, height: PLUGIN_UI_HEIGHT });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {

    default:
      console.error('Unknown message type:', msg.type);
      alert(`Unknown message type: ${msg.type}`);
      break;

    case 'create-spiral':
      const nodes = createColorfulSpiral(msg.count, msg.shape);
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      figma.ui.postMessage({
        type: 'create-spiral',
        message: `Created a spiral with ${msg.count} ${msg.shape}s`,
      });
      break;

  }
};

// on select of  any object in figma, the plugin UI should show the number of nodes and their types and names 
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  const nodeCount = selection.length;
  const nodeTypes = [...new Set(selection.map(node => node.type))];
  const nodeNames = selection.map(node => node.name);
  figma.ui.postMessage({
    type: 'selectionchange',
    message: `Selected ${nodeCount} nodes`,
    data: {
      selection: selection,
      nodeCount: nodeCount,
      nodeTypes: nodeTypes,
      nodeNames: nodeNames,
    }
  });
});



// figma.closePlugin();
