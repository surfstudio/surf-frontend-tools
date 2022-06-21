import { RefCallback, useCallback, useEffect, useRef } from 'react';

const defaultObserverConfig = {
    rootMargin: '0px',
    threshold: 0,
};

type TUseInfiniteScrollProps = {
    onIntersect: () => void;
    options?: IntersectionObserverInit;
    isActive?: boolean;
};

const useInfiniteScroll = ({
    onIntersect,
    options = defaultObserverConfig,
    isActive = true,
}: TUseInfiniteScrollProps): RefCallback<Element> => {
    const observer = useRef<IntersectionObserver | null>();

    const callback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (entries.length > 0 && entries[0].isIntersecting && isActive) onIntersect();
        },
        [onIntersect, isActive]
    );

    useEffect(() => {
        return () => observer.current?.disconnect();
    }, []);

    return useCallback(
        (node: Element) => {
            if (!node) return;
            observer.current?.disconnect();
            observer.current = new IntersectionObserver(callback, options);
            observer.current.observe(node);
        },
        [callback, options]
    );
};

export default useInfiniteScroll;
