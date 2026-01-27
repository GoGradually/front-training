import { useMemo, useState } from "react";
import type { CarouselOptions } from "./types";
import { mod } from "./utils";
import { useElementSize } from "./useElementSize";
import "./styles.css";

type Props = {
    images: string[];
    options?: CarouselOptions;
};

export function ImageCarousel({ images, options }: Props) {
    const fit = options?.fit ?? "contain";
    const transitionMs = options?.transitionMs ?? 300;

    const n = images.length;
    const [index, setIndex] = useState(0);

    const { setEl, width: vpWidth } = useElementSize<HTMLDivElement>();

    const prev = () => setIndex((i) => mod(i - 1, n));
    const next = () => setIndex((i) => mod(i + 1, n));

    const trackX = useMemo(() => -index * vpWidth, [index, vpWidth]);

    if (n === 0) return <div className="carousel-viewport" />;

    return (
        <div ref={setEl} className="carousel-viewport">
            <div
                className="carousel-track"
                style={{
                    transform: `translate3d(${trackX}px, 0, 0)`,
                    transition: `transform ${transitionMs}ms ease`,
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
