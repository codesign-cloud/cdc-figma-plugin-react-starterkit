
export function roundToDecimals(value: number | string, decimals: number = 2): number {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}


export const notifyConfigDefault = { timeout: 3000, error: false, button: { text: "OK", action: () => console.log("Notification closed") } };
