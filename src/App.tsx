import { useState } from 'react'
import { ImageCarousel } from "./carousel/ImageCarousel";

export default function App() {
    const images = [
        "./assets/images/carousel/1.jpeg",
        "./assets/images/carousel/2.jpeg",
        "./assets/images/carousel/3.jpeg",
        "./assets/images/carousel/4.jpeg",
        "./assets/images/carousel/5.jpeg",
    ];

    return <ImageCarousel images={images} options={{fit: "contain"}}/>
}