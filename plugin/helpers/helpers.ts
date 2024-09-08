
export function roundToDecimals(value: number | string, decimals: number = 2): number {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}
