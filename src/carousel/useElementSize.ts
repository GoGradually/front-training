import { useEffect, useState } from "react";

export function useElementSize<T extends HTMLElement>() {
    const [el, setEl] = useState<T | null>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!el) return;

        const ro = new ResizeObserver(() => {
            const rect = el.getBoundingClientRect();
            setWidth(Math.max(0, Math.floor(rect.width)));
        });

        ro.observe(el);

        const rect = el.getBoundingClientRect();
        setWidth(Math.max(0, Math.floor(rect.width)));

        return () => ro.disconnect();
    }, [el]);

    return { setEl, width };
}
