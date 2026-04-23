import React, { useEffect, useRef, useState } from "react";
import { detectMood } from "../../utils/util";
export default function FaceExpression() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mood, setMood] = useState("Click button to detect mood");
  const lastResultRef = useRef(null); // ✅ latest landmarks store karta rehta hai

  useEffect(() => {
    if (!videoRef.current) return;

    const FaceMesh = window.FaceMesh;
    const Camera = window.Camera;

    if (!FaceMesh || !Camera) {
      console.error("MediaPipe CDN not loaded yet");
      return;
    }

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

    const getDistance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

    faceMesh.onResults((results) => {
      if (!canvasRef.current || !results.image) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = 640;
      canvas.height = 480;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
        lastResultRef.current = null; // no face
        return;
      }

      // ✅ Sirf store karo, setMood mat karo
      lastResultRef.current = results.multiFaceLandmarks[0];
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) await faceMesh.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
    return () => camera.stop();
  }, []);

  // ✅ Ye function sirf button click pe chalega

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Emotion Detection (MediaPipe)</h2>
      <h1>{mood}</h1>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ border: "2px solid black" }} />
      <br />
      {/* ✅ Ye button apne kisi bhi component mein le ja sako */}
      <button   onClick={() => {
                const result = detectMood(lastResultRef.current);
                setMood(result);
  }} style={{ marginTop: "16px", padding: "10px 24px", fontSize: "16px" }}>
        📸 Detect My Mood
      </button>
    </div>
  );
}