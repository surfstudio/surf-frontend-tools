import { decode } from './json';

const isNumber = <T>(val: T | number): val is number => {
    return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
};

const isBoolean = <T>(val: T | boolean): val is boolean => {
    return typeof val === 'boolean';
};

const isString = <T>(val: T | string): val is string => {
    return typeof val === 'string';
};

const isDate = <T>(val: T | Date): val is Date => {
    return Object.prototype.toString.call(val) === '[object Date]';
};

const isDefined = <T>(val: T | undefined | null): val is T => {
    return typeof val !== 'undefined' && val !== null;
};

const isNone = <T>(val: T | undefined | null): val is undefined | null => {
    return !isDefined(val);
};

const isJSON = <T>(val: T) => {
    if (isString(val)) {
        try {
            decode(val);
            return true;
        } catch (e) {
            return false;
        }
    }

    return false;
};

export { isJSON, isDate, isNumber, isString, isBoolean, isDefined, isNone };
