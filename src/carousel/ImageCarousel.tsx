import { useState } from 'react';
import type { CarouselOptions } from "./types";
import "./styles.css"

type Props = {
    images: string[];
    options?: CarouselOptions;
};

export function ImageCarousel({ images, options }: Props) {
    const fix = options?.fit ?? "contain";
    const [index] = useState(0);

    if (images.length === 0) {
        return <div className="carousel-viewport" />;
    }

    return (
        <div className="carousel-viewport">
            <img
                className="carousel-img"
                src={images[index]}
                alt=""
                draggable={false}
                style={{ objectFit: fix }}
            />
        </div>
    );
}