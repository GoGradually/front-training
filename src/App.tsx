import { useState } from 'react'
import { ImageCarousel } from "./carousel/ImageCarousel";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import React from "react";

export default function App() {
    return (
        <div>
            <h1>React Video Player</h1>
            <VideoPlayer src="/videos/1.mp4"/>
        </div>
    )
}
