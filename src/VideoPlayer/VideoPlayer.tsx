import React from "react";
import {useRef, useState} from 'react';

type Props = { src: string };

export default function VideoPlayer({src}: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;

        if (v.paused) {
            await v.play();
            setIsPlaying(true);
        } else {
            v.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div
            style={{border: "1px solid #ddd", borderRadius: 12, padding: 12}}
        >
            <video
                ref={videoRef}
                src={src}
                controls={false}
                style={{width: "100%", borderRadius: 12}}
            />
            <div style={{display: "flex", gap: 8, marginTop: 12}}>
                <button onClick={togglePlay}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>

        </div>
    )
}