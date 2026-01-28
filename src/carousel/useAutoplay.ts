import {useEffect, useRef} from 'react';

type Params = {
    enabled: boolean;
    delayMs: number;
    onTick: () => void;
};

export function useAutoplay({enabled, delayMs, onTick}: Params) {
    const timerRef = useRef<number | null> (null);

    useEffect(() => {
        if (!enabled) return;
        if (delayMs <= 0) return;

        timerRef.current = window.setInterval(() => onTick(), delayMs);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [enabled, delayMs, onTick]);
}