
/* Helper to get node properties */
export function getNodeProps(node: SceneNode, type: 'basic' | 'full' = 'basic', parentFrame: string = '') {
    const baseProps = {
        id: node.id,
        type: node.type,
        name: node.name,
        visible: 'visible' in node ? node.visible : undefined,
        parentFrame,
    };

    if (type === 'basic') {
        return baseProps;
    }

    return {
        ...baseProps,
        width: roundToDecimals(node.width),
        height: roundToDecimals(node.height),
        x: roundToDecimals(node.x, 3),
        y: roundToDecimals(node.y, 3),
        rotation: 'rotation' in node ? roundToDecimals(node.rotation) : undefined,
        opacity: 'opacity' in node ? roundToDecimals(node.opacity) : undefined,
    };
}

export function roundToDecimals(value: number | string, decimals: number = 2): number {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}


export const notifyConfigDevDefault = { timeout: 3000, error: false, button: { text: "OK", action: () => console.log("Notification closed") } };
