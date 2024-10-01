/* Config */
import { PLUGIN_UI_CONFIG as UiConfig } from './config';
/* Helpers */
import { getNodeProps, notifyConfigDevDefault } from './helpers/helpers';
/* Demo */
import { createColorfulSpiral } from './demo/spiralGenerator';

figma.showUI(__html__, { width: UiConfig.width, height: UiConfig.height });

figma.ui.onmessage = (msg) => {
  switch (msg.type) {

    /* DEMO */
    case 'demo-create-spiral':
      const nodes = createColorfulSpiral(msg.count, msg.shape);
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      figma.ui.postMessage({
        type: 'demo-create-spiral',
        origin: 'figma',
        message: `Created a spiral with ${msg.count} ${msg.shape}s`,
      });
      figma.notify("Figma: Created spiral", notifyConfigDevDefault);
      break;
    case 'demo-insert-quote':
      let quote = msg.quote ?? '';
      const viewportCenter = figma.viewport.center;
      let textNode = figma.createText();
      textNode.x = viewportCenter.x;
      textNode.y = viewportCenter.y;
      figma.viewport.scrollAndZoomIntoView([textNode]);
      /* Load font async */
      figma.loadFontAsync({ family: "Inter", style: "Regular" })
        .then(() => {
          textNode.characters = quote;
          textNode.resize(370, textNode.height);
          textNode.textAutoResize = "HEIGHT";
          figma.currentPage.appendChild(textNode);
          figma.currentPage.selection = [textNode];
          figma.viewport.scrollAndZoomIntoView([textNode]);
          figma.notify("Figma: Inserted quote", notifyConfigDevDefault);
        })
        .catch(err => {
          console.error("Failed to load font:", err);
          figma.notify("Error: Failed to load font async", { error: true });
        });
      break;
    /* /DEMO */

    case 'get-frame-contents-deep':
      /* check if selection has at least one frame */
      if (!figma.currentPage.selection.some(node => node.type === 'FRAME')) {
        figma.notify("Figma: No frame selected", notifyConfigDevDefault);  
        break;
      }
      const frameContents = figma.currentPage.selection
        .filter(node => node.type === 'FRAME')
        .flatMap(frame => {
          const processedNodes = new Set();
          const getChildrenRecursively = (node: SceneNode): any[] => {
            if (processedNodes.has(node.id)) {
              return [];
            }
            processedNodes.add(node.id);
            const nodeProps = getNodeProps(node, 'basic', frame.id);
            if ('children' in node) {
              return [
                nodeProps,
                ...node.children.flatMap(getChildrenRecursively),
              ];
            }
            return [nodeProps];
          };
          return getChildrenRecursively(frame).slice(1); // Exclude the frame itself
        });
      console.log(frameContents);
      figma.notify("Figma: Selection contents sent. Check console for details.");
      figma.ui.postMessage({
        type: 'get-frame-contents-deep',
        origin: 'figma',
        message: frameContents,
      });
      break;

    case 'show-notification':
      if (msg.message) {
        figma.notify(msg.message, notifyConfigDevDefault);
      }
      break;

    default:
      console.error('Received unknown message type:', msg.type);
      alert(`Received unknown message type: ${msg.type}`);
      break;
  }
};

// When any object is selected in Figma, it updates the plugin UI to display the number of selected nodes,
// along with their meta data.
// DOCS: https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  console.log('selection', selection);
  const nodeCount = selection.length;
  const nodeData = selection.map(node => getNodeProps(node, 'full'));
  figma.ui.postMessage({
    type: 'selectionchange',
    origin: 'figma',
    message: `Selected ${nodeCount} nodes`,
    data: {
      count: nodeCount,
      selection: nodeData,
    }
  });
});



// figma.closePlugin();
