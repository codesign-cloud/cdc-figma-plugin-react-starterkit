
export  function createColorfulSpiral(count: number, shape: 'circle' | 'rectangle' | 'polygon') {
    const nodes = [];
    const centerX = figma.viewport.center.x;
    const centerY = figma.viewport.center.y;
    const spiralFactor = 0.5;
    const rotationFactor = 15;

    for (let i = 0; i < count; i++) {
        let node;
        switch (shape) {
            case 'circle':
                node = figma.createEllipse();
                break;
            case 'rectangle':
                node = figma.createRectangle();
                break;
            case 'polygon':
                node = figma.createPolygon();
                (node as PolygonNode).pointCount = 6;
                break;
        }

        const angle = i * rotationFactor;
        const radius = spiralFactor * Math.sqrt(i) * 10;
        const x = centerX + radius * Math.cos(angle * Math.PI / 180);
        const y = centerY + radius * Math.sin(angle * Math.PI / 180);

        node.x = x;
        node.y = y;
        node.resize(30, 30);
        node.fills = [{ type: 'SOLID', color: HSLToRGB(i * 10 % 360, 100, 50) }];
        node.rotation = angle;

        figma.currentPage.appendChild(node);
        nodes.push(node);
    }

    return nodes;
}

function HSLToRGB(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: f(0), g: f(8), b: f(4) };
}
