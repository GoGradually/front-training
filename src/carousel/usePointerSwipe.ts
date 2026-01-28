import {useMemo, useRef, useState} from "react";

type Params = {
    vpWidth: number;
    thresholdMinPx?: number;
    thresholdRatio?: number;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    onDragStateChange?: (dragging: boolean) => void;
};

export function usePointerSwipe({
                                    vpWidth,
                                    thresholdMinPx = 40,
                                    thresholdRatio = 0.15,
                                    onSwipeLeft,
                                    onSwipeRight,
                                    onDragStateChange,
                                }: Params) {
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const startXRef = useRef(0);

    const thresholdPx = useMemo(() => Math.max(thresholdMinPx, vpWidth * thresholdRatio),
        [thresholdMinPx, thresholdRatio, vpWidth]);

    const bind = {
        onPointerDown: (e: React.PointerEvent) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            startXRef.current = e.clientX;
            setDragX(0);
            setIsDragging(true);
            onDragStateChange?.(true);
        },
        onPointerMove: (e: React.PointerEvent) => {
            if (!isDragging) return;
            setDragX(e.clientX - startXRef.current);
        },
        onPointerUp: () => {
            if(!isDragging) return;

            const dx = dragX;

            setIsDragging(false);
            setDragX(0);
            onDragStateChange?.(false);

            if (dx > thresholdPx) onSwipeRight();
            else if (dx < -thresholdPx) onSwipeLeft();
        },
        onPointerCancel: () => {
            if(!isDragging) return;

            setIsDragging(false);
            setDragX(0);
            onDragStateChange?.(false);
        },
    };
    return { bind, isDragging, dragX  };
}