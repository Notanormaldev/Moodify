import React, { useContext, useEffect, useRef, useState } from "react";
import { detectMood } from "../../utils/util";
import { Songcontext } from "../../home/song.context";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const [rawMood, setRawMood] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [detectionStatus, setDetectionStatus] = useState("");
  const lastResultRef = useRef(null);
  const { handleSongGet } = useContext(Songcontext);

  useEffect(() => {
    if (!videoRef.current) return;

    const FaceMesh = window.FaceMesh;
    if (!FaceMesh) {
      console.error("MediaPipe FaceMesh not loaded yet");
      return;
    }

    videoRef.current.muted = true;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        lastResultRef.current = null;
        setDetectionStatus("No face detected yet.");
        return;
      }

      lastResultRef.current = results.multiFaceLandmarks[0];
      setDetectionStatus("Face detected. Ready to play.");
    });

    faceMeshRef.current = faceMesh;
  }, []);

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  const formatMoodText = (value) => {
    if (!value) return "Play song based on your mood";
    const cleaned = value.replace(/^[^a-zA-Z0-9]*(.*)$/s, "$1").trim();
    const mood = cleaned.replace(/^(you are|you|mood is)\s*/i, "").trim();
    return mood ? "Mood detected" : "Play song based on your mood";
  };

  const normalizeMood = (value) => {
    if (!value) return "natural";
    const normalized = value.toLowerCase();
    if (normalized.includes("happy")) return "happy";
    if (normalized.includes("sad")) return "sad";
    if (normalized.includes("surprised")) return "surprised";
    return "natural";
  };

  const initCamera = async () => {
    if (cameraReady) return true;
    if (!videoRef.current) return false;

    const FaceMesh = faceMeshRef.current;
    const Camera = window.Camera;

    if (!FaceMesh || !Camera) {
      setPermissionError("Camera setup failed. Please refresh the page.");
      return false;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionError("Your browser does not support camera access.");
      return false;
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    } catch (error) {
      setPermissionError("Camera permission required to detect mood.");
      return false;
    }

    videoRef.current.srcObject = stream;
    try {
      await videoRef.current.play();
    } catch (error) {
      console.warn("Video play failed", error);
    }

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) await FaceMesh.send({ image: videoRef.current });
      },
      width: 320,
      height: 240,
    });

    cameraRef.current = camera;
    try {
      await camera.start();
    } catch (error) {
      setPermissionError("Failed to start camera. Please allow access.");
      return false;
    }

    setCameraReady(true);
    setDetectionStatus("Looking for your face...");
    return true;
  };

  const handlePlayClick = async () => {
    setPermissionError("");
    const ready = await initCamera();
    if (!ready) return;

    let attempts = 0;
    while (!lastResultRef.current && attempts < 8) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      attempts += 1;
    }

    if (!lastResultRef.current) {
      setPermissionError("No face detected yet. Move closer to the camera and try again.");
      return;
    }

    const result = detectMood(lastResultRef.current);
    const moodKey = normalizeMood(result);
    setRawMood(result);

    if (handleSongGet) {
      await handleSongGet(moodKey);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
        padding: 18,
        borderRadius: 22,
        height: 200,
        background: "rgba(12, 12, 12, 0.78)",
        boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 30, color: "#fff", lineHeight: 1.15 }}>
        {formatMoodText(rawMood)}
      </h1>
      {permissionError && (
        <p style={{ marginTop: 12, color: "#ff7aa6", fontSize: 14 }}>
          {permissionError}
        </p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          left: -9999,
          top: -9999,
        }}
      />
      <button
        onClick={handlePlayClick}
        style={{
          marginTop: 22,
          padding: "12px 32px",
          fontSize: 16,
          borderRadius: 999,
          border: "none",
          background: "#ff2b82",
          color: "#fff",
          cursor: "pointer",
          transition: "transform 120ms ease",
        }}
      >
        Play Mood Song
      </button>
    </div>
  );
}