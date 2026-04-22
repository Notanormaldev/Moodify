import React, { useEffect, useRef, useState } from "react";

export default function Expressionfeature() {
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
  const detectMood = () => {
    const lm = lastResultRef.current;

    if (!lm) {
      setMood("😶 No Face Detected");
      return;
    }

    const getDistance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

    const mouthLeft   = lm[61];
    const mouthRight  = lm[291];
    const mouthTop    = lm[13];
    const mouthBottom = lm[14];
    const eyeTop      = lm[159];
    const eyeBottom   = lm[145];
    const eyebrow     = lm[70];

    const mouthHeight  = getDistance(mouthTop, mouthBottom);
    const mouthWidth   = getDistance(mouthLeft, mouthRight);
    const eyeOpen      = getDistance(eyeTop, eyeBottom);
    const eyebrowDist  = getDistance(eyebrow, eyeTop);
    const cornerY      = (mouthLeft.y + mouthRight.y) / 2;
    const mouthCenterY = (mouthTop.y + mouthBottom.y) / 2;
    const cornerLift   = mouthCenterY - cornerY;
    const ratio        = mouthWidth / (mouthHeight + 0.0001);

    let scores = { happy: 0, sad: 0, surprise: 0, neutral: 0 };

    // 😄 Happy
    if (cornerLift > 0.005)  scores.happy++;
    if (ratio > 3.0)         scores.happy++;
    if (eyeOpen > 0.022)     scores.happy++;

    // 😢 Sad
    // console.log(cornerLift,eyebrowDist,ratio);
    
    if (cornerLift < -0.002) scores.sad++;
    if (eyebrowDist < 0.055) scores.sad++;
    if (ratio < 1.1)         scores.sad++;

    // 😲 Surprise (AND logic)
    const isSurprise = mouthHeight > 0.045 && eyeOpen > 0.022 && eyebrowDist > 0.050;
    if (isSurprise) scores.surprise += 3;

    // 😐 Neutral
    if (Math.abs(cornerLift) < 0.004)        scores.neutral++;
    if (eyeOpen > 0.015 && eyeOpen < 0.025)  scores.neutral++;
    if (ratio > 1.8 && ratio < 3.0)          scores.neutral++;

    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const moodMap = {
      happy:    "😄 Happy",
      sad:      "😢 Sad",
      surprise: "😲 Surprise",
      neutral:  "😐 Neutral",
    };

    const detectedMood = isSurprise ? "😲 Surprise"
      : best[1] >= 2 ? moodMap[best[0]]
      : "😐 Neutral";

    setMood(detectedMood);
    // console.log("Scores:", scores, "| cornerLift:", cornerLift.toFixed(5), "| eyeOpen:", eyeOpen.toFixed(4));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Emotion Detection (MediaPipe)</h2>
      <h1>{mood}</h1>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ border: "2px solid black" }} />
      <br />
      {/* ✅ Ye button apne kisi bhi component mein le ja sako */}
      <button onClick={detectMood} style={{ marginTop: "16px", padding: "10px 24px", fontSize: "16px" }}>
        📸 Detect My Mood
      </button>
    </div>
  );
}