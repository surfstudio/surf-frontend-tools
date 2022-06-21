import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window === 'undefined') return initialValue;
            const item = window.localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [storedValue, setValue] as const;
};

export default useLocalStorage;
