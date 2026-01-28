import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = { src: string };

function formatTime(sec: number): string {
    if (!Number.isFinite(sec) || sec < 0) return "00:00";
    const s = Math.floor(sec);
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return hh > 0 ? `${pad(hh)}:${pad(mm)}:${pad(ss)}` : `${pad(mm)}:${pad(ss)}`;
}

export default function VideoPlayer({ src }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);     // seconds
    const [current, setCurrent] = useState(0);       // seconds
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);   // 0~100

    const progress = useMemo(() => {
        if (duration <= 0) return 0;
        return (current / duration) * 100;
    }, [current, duration]);

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

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoaded = () => setDuration(v.duration || 0);
        const onTimeUpdate = () => {
            if (!isSeeking) setCurrent(v.currentTime || 0);
        };
        const onEnded = () => setIsPlaying(false);

        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("timeupdate", onTimeUpdate);
        v.addEventListener("ended", onEnded);

        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("timeupdate", onTimeUpdate);
            v.removeEventListener("ended", onEnded);
        };
    }, [isSeeking]);

    const onSeekStart = () => {
        setIsSeeking(true);
        setSeekValue(progress);
    };

    const onSeekChange = (value: number) => {
        setSeekValue(value);
        if (duration > 0) setCurrent((value / 100) * duration);
    };

    const onSeekCommit = (value: number) => {
        const v = videoRef.current;
        if (!v || duration <= 0) return;
        v.currentTime = (value / 100) * duration;
        setIsSeeking(false);
    };

    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
            <video
                ref={videoRef}
                src={src}
                style={{ width: "100%", borderRadius: 12 }}
                controls={false}
            />

            <div style={{ marginTop: 12 }}>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={isSeeking ? seekValue : progress}
                    onMouseDown={onSeekStart}
                    onTouchStart={onSeekStart}
                    onChange={(e) => onSeekChange(Number(e.target.value))}
                    onMouseUp={(e) => onSeekCommit(Number((e.target as HTMLInputElement).value))}
                    onTouchEnd={(e) => onSeekCommit(Number((e.target as HTMLInputElement).value))}
                    style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span>{formatTime(current)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
            </div>
        </div>
    );
}
