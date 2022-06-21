const minMax = (min: number, max: number, value: number): number => {
    return Math.max(Math.min(max, value), min);
};

const summation = (values: number[]) => {
    let s = 0;

    for (let i = 0; i < values.length; i += 1) {
        s += values[i];
    }

    return s;
};

const average = (values: number[]) => {
    return summation(values) / values.length;
};

const nearest = (n: number, a: number, b: number) => {
    return Math.abs(n - a) <= Math.abs(n - b) ? a : b;
};

export { minMax, summation, average, nearest };
