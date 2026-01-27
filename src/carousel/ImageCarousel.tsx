import {useState} from 'react';
import type {CarouselOptions} from "./types";
import {mod} from "./utils";
import "./styles.css"

type Props = {
    images: string[];
    options?: CarouselOptions;
};

export function ImageCarousel({images, options}: Props) {
    const fix = options?.fit ?? "contain";
    const n = images.length;

    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => mod(i - 1, n));
    const next = () => setIndex((i) => mod(i + 1, n));

    if (images.length === 0) {
        return <div className="carousel-viewport"/>;
    }

    return (
        <div className="carousel-viewport">
            <img
                className="carousel-img"
                src={images[index]}
                alt=""
                draggable={false}
                style={{objectFit: fix}}
            />
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