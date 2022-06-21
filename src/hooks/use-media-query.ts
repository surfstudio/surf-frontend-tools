import { useEffect, useState } from 'react';

const getMatches = (matchQuery: string) => {
    return window.matchMedia(matchQuery).matches;
};

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        const handleChange = () => {
            setMatches(getMatches(query));
        };

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
