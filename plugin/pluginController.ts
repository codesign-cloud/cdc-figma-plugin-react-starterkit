
/* Config */
import { PLUGIN_UI_HEIGHT, PLUGIN_UI_WIDTH } from './config';
/* Helpers */
import { notifyConfigDefault, roundToDecimals } from './helpers/helpers';
/* Demo */
import { createColorfulSpiral } from './demo/spiralGenerator';

figma.showUI(__html__, { width: PLUGIN_UI_WIDTH, height: PLUGIN_UI_HEIGHT });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {

    default:
      console.error('Received unknown message type:', msg.type);
      alert(`Received unknown message type: ${msg.type}`);
      break;

    case 'create-spiral':
      const nodes = createColorfulSpiral(msg.count, msg.shape);
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      figma.ui.postMessage({
        type: 'create-spiral',
        message: `Created a spiral with ${msg.count} ${msg.shape}s`,
      });
      figma.notify("Figma: Created spiral", notifyConfigDefault);
      break;

      case 'show-notification':
      if(msg.message) {
        figma.notify(msg.message, notifyConfigDefault);
      }
      break;

  }
};

// When any object is selected in Figma, it updates the plugin UI to display the number of selected nodes,
// along with their meta data.
// DOCS: https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  const nodeCount = selection.length;
  const nodeData = selection.map(node => ({
    id: node.id,
    type: node.type,
    name: node.name,
    width: roundToDecimals(node.width),
    height: roundToDecimals(node.height),
    x: roundToDecimals(node.x,3),
    y: roundToDecimals(node.y, 3),
    rotation: 'rotation' in node ? roundToDecimals(node.rotation) : undefined,
    opacity: 'opacity' in node ? roundToDecimals(node.opacity) : undefined,
  }));
  figma.ui.postMessage({
    type: 'selectionchange',
    message: `Selected ${nodeCount} nodes`,
    data: {
      count: nodeCount,
      selection: nodeData,
    }
  });
});



// figma.closePlugin();
