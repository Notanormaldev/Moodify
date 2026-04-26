 export const detectMood = (lm) => {
  
    if (!lm) {
     return  "😶 No Face Detected";
     
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
      happy:    "happy",
      sad:      "sad",
      surprise: "surprised",
      neutral:  "natural",
    };

    const detectedMood = isSurprise ? "surprised"
      : best[1] >= 2 ? moodMap[best[0]]
      : "natural";

    return   detectedMood   ;
    // console.log("Scores:", scores, "| cornerLift:", cornerLift.toFixed(5), "| eyeOpen:", eyeOpen.toFixed(4));
  };
