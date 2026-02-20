import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 600) {
    const [debounce, setDebounced] = useState(value);
    useEffect(() => {
        const waitTime = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(waitTime);
    }, [value, delay]
);
return debounce;
}