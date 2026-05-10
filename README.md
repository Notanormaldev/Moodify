<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:16213e&height=200&section=header&text=🎵%20Moodify&fontSize=60&fontColor=a0a0b0&animation=fadeIn&fontAlignY=38&desc=Your%20face%20is%20the%20DJ.&descAlignY=60&descColor=606070" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-moodify-4a4a6a?style=for-the-badge&logoColor=white)](https://moodify-front-dhuh.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Notanormaldev-1a1a2e?style=for-the-badge&logo=github&logoColor=a0a0b0)](https://github.com/Notanormaldev/Moodify)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harsh%20Patel-16213e?style=for-the-badge&logo=linkedin&logoColor=a0a0b0)](https://www.linkedin.com/in/harsh-patel-a77148314)

<br/>

> **Moodify** scans your face in real time using **Google MediaPipe**, detects your emotion,
> and plays music that matches exactly how you feel — powered by a **MERN stack** with
> **Redis token blacklisting** and a **Feature-based React architecture**.

<br/>

![MongoDB](https://img.shields.io/badge/MongoDB-1a1a2e?style=flat-square&logo=mongodb&logoColor=a0a0b0)
![Express](https://img.shields.io/badge/Express-1a1a2e?style=flat-square&logo=express&logoColor=a0a0b0)
![React](https://img.shields.io/badge/React-1a1a2e?style=flat-square&logo=react&logoColor=a0a0b0)
![Node.js](https://img.shields.io/badge/Node.js-1a1a2e?style=flat-square&logo=nodedotjs&logoColor=a0a0b0)
![Redis](https://img.shields.io/badge/Redis-1a1a2e?style=flat-square&logo=redis&logoColor=a0a0b0)
![MediaPipe](https://img.shields.io/badge/MediaPipe-1a1a2e?style=flat-square&logo=google&logoColor=a0a0b0)
![ImageKit](https://img.shields.io/badge/ImageKit-1a1a2e?style=flat-square&logo=imagekit&logoColor=a0a0b0)

</div>

---

## 📸 Screenshots

<table>
<tr>
<td width="50%">
<img src="https://raw.githubusercontent.com/Notanormaldev/Moodify/main/Screenshots/1.register.png" alt="Register Page" width="100%"/>
<p align="center"><sub>Register / Login</sub></p>
</td>
<td width="50%">
<img src="https://raw.githubusercontent.com/Notanormaldev/Moodify/main/Screenshots/2.image.png" alt="Music Player" width="100%"/>
<p align="center"><sub>Music Player — Mood Detected</sub></p>
</td>
</tr>
</table>

---

## 🧭 How to Use

```
① Register or Login
        ↓
② Allow camera access in the browser
        ↓
③ MediaPipe scans your face → emotion detected
   😊 happy  😢 sad  😡 angry  😮 surprised  😐 neutral
        ↓
④ Songs matching your mood load automatically
        ↓
⑤ Control playback → skip / pause / replay
        ↓
⑥ Logout → token blacklisted instantly via Redis
```

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 😊 | **Mood Detection** | Google MediaPipe Face Mesh — runs in-browser, no server needed |
| 🎵 | **Smart Playlist** | Songs auto-fetched based on your detected emotion |
| 🔐 | **JWT Auth** | Access token (short-lived) + Refresh token (long-lived) |
| 🚫 | **Token Blacklist** | Redis invalidates tokens on logout before natural expiry |
| ☁️ | **File Upload** | Songs and media hosted on **ImageKit** via `storage.services.js` |
| 📱 | **Responsive** | Fully mobile-friendly dark UI |

---

## 🏗️ React Feature-Based Architecture (4-Stack)

Moodify's frontend follows a **Feature-Sliced / 4-layer architecture** — each feature owns its full slice of the stack:

```
Feature
  ├── 🌐 api  (Services)    →  Axios calls to the backend
  ├── 🧠 state (Context)    →  React Context / global state
  ├── 🪝 hooks              →  Custom logic (useMoodDetection, usePlayer…)
  └── 🖼️ ui   (Components + Pages)  →  What the user sees
```

```
src/
├── features/
│   ├── auth/                     ← Full auth slice
│   │   ├── components/           🖼️ UI — LoginForm, RegisterForm
│   │   ├── hooks/                🪝 useAuth, useForm
│   │   ├── pages/                🖼️ LoginPage, RegisterPage
│   │   ├── Services/             🌐 auth.api.js (axios calls)
│   │   ├── styles/               CSS/SCSS for auth
│   │   └── auth.context.jsx      🧠 AuthContext (global user state)
│   │
│   ├── home/                     ← Full music/player slice
│   │   ├── components/           🖼️ Player, MoodBadge, SongCard
│   │   ├── hooks/                🪝 useMoodDetection, usePlayer
│   │   ├── pages/                🖼️ HomePage
│   │   ├── services/             🌐 song.api.js (axios calls)
│   │   └── Song.context.jsx      🧠 SongContext (queue, current song)
│   │
│   └── Expression/
│       └── components/
│           └── FaceExpression.jsx  😊 MediaPipe face detection component
│
├── pages/                        Route-level pages
├── Shared/styles/                Global SCSS tokens
├── utils/                        Helpers & constants
├── App.jsx
├── app.routes.jsx                Centralized route definitions
└── main.jsx
```

> This pattern keeps **auth logic in auth**, **music logic in home** — zero feature bleed, easy to scale.

---

## ⚙️ Backend Architecture

```
Backend/src/
├── config/
│   ├── cache.js          →  Redis client setup (token blacklist)
│   └── database.js       →  MongoDB connection
│
├── Controllers/
│   ├── auth.controller.js   →  register, login, getme, logout
│   └── song.controller.js   →  postsong, getsong
│
├── Middleware/
│   ├── auth.middleware.js   →  JWT verify + Redis blacklist check
│   └── upload.middleware.js →  Multer / file upload handler
│
├── Models/
│   ├── auth.model.js        →  User schema
│   ├── blacklist.model.js   →  (Fallback) blacklist schema
│   └── song.model.js        →  Song schema
│
├── Routes/
│   ├── auth.route.js        →  User API routes
│   └── song.route.js        →  Song API routes
│
├── services/
│   └── storage.services.js  →  File/media storage pipeline
│
├── app.js                   →  Express app setup
└── server.js                →  Entry point
```

---

## 📡 API Endpoints

### 👤 User Routes — `/user`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login, receive tokens | ❌ |
| `GET` | `/get-me` | Get logged-in user profile | ✅ |
| `GET` | `/logout` | Logout + blacklist current token | ✅ |

### 🎵 Song Routes — `/song`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/` | Upload a new song (`multipart/form-data`) | ✅ |
| `GET` | `/` | Fetch all songs | ✅ |

---

## 🧠 Google MediaPipeline — Mood Detection

```
Browser
  │
  ├─ MediaPipe Face Mesh (WASM) loads locally
  │
  ├─ Webcam stream → frame-by-frame analysis
  │
  ├─ 468 facial landmarks extracted per frame
  │
  ├─ Landmark geometry → emotion classified
  │     😊 happy · 😢 sad · 😡 angry · 😮 surprised · 😐 neutral
  │
  └─ Detected emotion → POST /song → songs returned → player plays
```

- 🔒 **Private by design** — camera feed never leaves the browser
- ⚡ **Zero latency** — runs on-device via WebAssembly
- 📦 **No GPU server** — works on any laptop or phone

---

## 🚫 Redis Token Blacklist

```js
// auth.controller.js — Logout
const decoded = jwt.decode(token);
const ttl = decoded.exp - Math.floor(Date.now() / 1000); // seconds left
await redisClient.setEx(`blacklist:${token}`, ttl, 'true');

// auth.middleware.js — Every protected request
const isBlacklisted = await redisClient.get(`blacklist:${token}`);
if (isBlacklisted) return res.status(401).json({ message: 'Token revoked' });
```

| Why Redis? | |
|---|---|
| ⚡ Speed | Sub-millisecond lookup on every request |
| ⏱ Auto-expiry | TTL matches token lifetime — no manual cleanup |
| 🔒 Atomic | No race conditions under concurrent logout requests |

---

## 🔑 Environment Variables

**`Backend/.env`**

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/moodify

JWT=your_jwt_secret

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

---

## ☁️ Deployment

| Layer | Platform |
|---|---|
| Frontend (React + Vite) | Render Static Site |
| Backend (Node + Express) | Render Web Service |
| Database | MongoDB Atlas |
| Cache / Blacklist | Redis (Host + Port + Password) |
| Media / Song Files | ImageKit |

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:16213e,100:1a1a2e&height=120&section=footer&fontColor=a0a0b0" width="100%"/>

**Harsh Patel**

[![GitHub](https://img.shields.io/badge/GitHub-Notanormaldev-1a1a2e?style=for-the-badge&logo=github&logoColor=a0a0b0)](https://github.com/Notanormaldev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Harsh%20Patel-16213e?style=for-the-badge&logo=linkedin&logoColor=a0a0b0)](https://www.linkedin.com/in/harsh-patel-a77148314)

*Built with MERN · Google MediaPipe · Redis · ImageKit · Feature-Based Architecture*

</div>
