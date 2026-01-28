import {useCallback, useMemo, useState} from "react";
import type { CarouselOptions } from "./types";
import { mod } from "./utils";
import { useElementSize } from "./useElementSize";
import "./styles.css";
import {useAutoplay} from "./useAutoplay";
import {usePointerSwipe} from "./usePointerSwipe";

type Props = {
    images: string[];
    options?: CarouselOptions;
};

export function ImageCarousel({ images, options }: Props) {
    const fit = options?.fit ?? "contain";
    const transitionMs = options?.transitionMs ?? 300;
    const autoPlayMs = options?.autoPlayMs ?? 3000;

    const n = images.length;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const { setEl, width: vpWidth } = useElementSize<HTMLDivElement>();

    if (n === 0) return <div className="carousel-viewport" />;

    const prev = () => go(index - 1);
    const next = () => go(index + 1);

    const { bind, isDragging, dragX } = usePointerSwipe({
        vpWidth,
        onSwipeLeft: next,
        onSwipeRight: prev,
        onDragStateChange: (dragging) => setPaused(dragging),
    })

    const go = useCallback((nextIndex: number) => {
        setIndex(()=> mod(nextIndex, n));
    }, [n]);

    useAutoplay({
        enabled: n > 0 && !paused,
        delayMs: autoPlayMs,
        onTick: next
    });

    const trackX = useMemo(() => -index * vpWidth, [index, vpWidth]);



    return (
        <div
            ref={setEl}
            className="carousel-viewport"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => !isDragging && setPaused(false)}
        >
            <div
                className="carousel-track"
                {...bind}
                style={{
                    transform: `translate3d(${trackX}px, 0, 0)`,
                    transition: isDragging ? "none" : `transform ${transitionMs}ms ease`,
                    cursor: isDragging ? "grabbing" : "grab",
                }}
            >
                {images.map((src, i) => (
                    <div key={`${src}-${i}`} className="carousel-slide">
                        <img
                            className="carousel-img"
                            src={src}
                            alt=""
                            draggable={false}
                            style={{ objectFit: fit }}
                        />
                    </div>
                ))}
            </div>

            <button className="carousel-btn left" onClick={prev} aria-label="prev">
                ◀
            </button>
            <button className="carousel-btn right" onClick={next} aria-label="next">
                ▶
            </button>

            <div className="carousel-dots">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                        aria-label={`go-${i}`}
                    />
                ))}
            </div>
        </div>
    );
}
