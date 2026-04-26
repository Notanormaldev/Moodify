import React, { useContext, useEffect, useRef, useState } from "react";
import { Songcontext } from "../song.context";

function Player() {
  const { song, loading } = useContext(Songcontext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentSong = Array.isArray(song) ? song[0] : song;
  const audioSrc = currentSong?.songurl || "";
  const posterSrc = currentSong?.posturl || "";
  const title = currentSong?.title || "No song selected";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const loadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", loadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", loadedMetadata);
    };
  }, [volume, audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioSrc) return;
    setIsPlaying((prev) => !prev);
  };

  const fastForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const rewind = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const changeVolume = (delta) => {
    setVolume((prev) => Math.min(1, Math.max(0, prev + delta)));
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setProgress(nextTime);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const artist = currentSong?.mood ? currentSong.mood.charAt(0).toUpperCase() + currentSong.mood.slice(1) : "Unknown";

  return (
    <div
      className="player-container"
      style={{
        height:200,
        width: "100%",
        maxWidth:620,
        padding: 0,
        borderRadius: 20,
        background: "#fff",
        boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
        overflow: "hidden",
        display: "grid",
      }}
    >
      <div style={{ display: "flex", gap: 0, alignItems: "stretch", minHeight: 120 }}>
        <div style={{ flex: "0 0 35%", minHeight: 120, overflow: "hidden", background: "#eee" }}>
          {posterSrc ? (
            <img
              src={posterSrc}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "#999" }}>
              No Image
            </div>
          )}
        </div>

        <div style={{ flex: 1, padding: 10, display: "grid", gap: 8 }}>
          <div>
            <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.24em", fontSize: 9, color: "#999" }}>
              {artist}
            </p>
            <h2 style={{ margin: "6px 0 0", fontSize: 19, color: "#111", lineHeight: 1.15, letterSpacing: "0.02em" }}>
              {title}
            </h2>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#777" }}>{formatTime(progress)}</span>
              <span style={{ fontSize: 10, color: "#777" }}>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              style={{ width: "100%", accentColor: "#111", height: 3 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              onClick={rewind}
              style={{ width: 38, height: 38, borderRadius: 19, border: "1px solid #ccc", background: "#fafafa", color: "#111", fontSize: 16, cursor: "pointer" }}
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={togglePlay}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                border: "none",
                background: "#111",
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              type="button"
              onClick={fastForward}
              style={{ width: 38, height: 38, borderRadius: 19, border: "1px solid #ccc", background: "#fafafa", color: "#111", fontSize: 16, cursor: "pointer" }}
            >
              ⏭
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 4, opacity: 0.85 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#777", minWidth: 32, textAlign: "right" }}>Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                style={{ width: 120, accentColor: "#111", height: 3, opacity: 0.75 }}
              />
              <span style={{ fontSize: 12, color: "#333", minWidth: 36, textAlign: "right", fontWeight: 600 }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
}

export default Player;
