import { useState } from 'react'
import { ImageCarousel } from "./carousel/ImageCarousel";

export default function App() {
    const images = [
        "./images/carousel/1.jpeg",
        "./images/carousel/2.jpeg",
        "./images/carousel/3.jpeg",
        "./images/carousel/4.jpeg",
        "./images/carousel/5.jpeg",
    ];

    return <ImageCarousel images={images} options={{fit: "contain"}}/>
}