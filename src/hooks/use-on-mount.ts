import { useEffect } from 'react';

const useOnMount = (onMount: () => void) =>
    useEffect(() => {
        onMount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

export default useOnMount;
