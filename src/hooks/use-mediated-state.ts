import { useCallback, useState } from 'react';

const useMediatedState = <T>(mediator: (newState: T) => T, initialState?: T | (() => T)) => {
    const [state, setMediatedState] = useState<T | undefined>(initialState);

    const setState = useCallback(
        (newState: T) => {
            setMediatedState(mediator(newState));
        },
        [mediator]
    );

    return [state, setState] as const;
};

export default useMediatedState;
