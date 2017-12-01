export function toFixed(precision: number, value: number): string | undefined {
    if (precision <= 0) {
        return undefined;
    }
    const beforeValue = Array(precision - 1).fill("0").join("");

    return String(beforeValue + value).slice(precision * (-1));
}
