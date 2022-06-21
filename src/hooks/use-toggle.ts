import { useCallback, useState } from 'react';

const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState<boolean>(initialValue);

    const handleToggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return [value, handleToggle] as const;
};

export default useToggle;
