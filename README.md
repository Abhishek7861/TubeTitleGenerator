# Tube Title Generator

An AI-powered web app that helps YouTube creators craft click-worthy titles, SEO-friendly descriptions, tags, hashtags, and thumbnails — all in seconds.

Users sign in with Google, describe their video (topic, audience, tone, keywords, language), pick an AI provider (OpenAI or Gemini), and get back a ranked set of title suggestions, a ready-to-paste description, tag list, hashtags, and thumbnail copy. A separate Thumbnail Studio lets them compose a 16:9 thumbnail with gradient presets, badge, emoji, and download it as a 1280×720 PNG.

## Features

- **Google OAuth 2.0 sign-in** — session-based auth with cookie credentials.
- **Title & description generator** — one call returns:
  - 5+ title variants
  - a highlighted "best" title
  - a full video description
  - SEO tags and hashtags
  - suggested thumbnail overlay text
- **Multi-provider AI** — switch between OpenAI and Google Gemini per request.
- **Customization inputs** — topic, target audience, language (English, Hindi, Spanish, French, German, Portuguese, Japanese), and tone (Engaging, Professional, Casual, Funny, Dramatic, Educational).
- **Thumbnail Studio** — live 16:9 preview with:
  - Headline, subtitle, badge, emoji
  - Text color and alignment (left / center / right)
  - Six gradient background presets
  - One-click PNG download at YouTube's 1280×720 spec
- **Copy-to-clipboard** on every generated title.
- **Polished responsive UI** — sidebar navigation, gradient hero header, Google profile chip.

## Tech stack

**Backend** — Spring Boot 3 (Java 21), Spring Security OAuth2 Client, Maven, Lombok. Talks to OpenAI and Gemini APIs.

**Frontend** — React 18 + Vite, React Router, plain CSS (no UI library).

**Auth** — Google OAuth 2.0 via Spring Security.

## Project structure

```
TubeTitleGenerator/
├── backend/
│   └── TubeTitleGenerator/       # Spring Boot app
│       ├── src/main/java/...
│       │   ├── controller/       # YoutubeController — /api/generate, /api/me
│       │   ├── service/          # YoutubeGeneratorService
│       │   ├── ai/               # AiProviderType + provider clients
│       │   ├── dto/              # GenerateRequest, GenerateResponse
│       │   └── config/           # SecurityConfig (OAuth2 + CORS)
│       ├── src/main/resources/
│       │   └── application.properties
│       └── pom.xml
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx         # Google sign-in
    │   │   └── Dashboard.jsx     # Title generator + Thumbnail studio
    │   ├── App.jsx               # Routes
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## API

`POST /api/generate` — generate titles + metadata

Request:
```json
{
  "topic": "How to bake sourdough bread",
  "audience": "Home bakers, beginners",
  "language": "English",
  "tone": "Engaging",
  "provider": "OPENAI",
  "keywords": ["bread", "sourdough", "recipe"]
}
```

Response:
```json
{
  "titles": ["...", "...", "..."],
  "bestTitle": "...",
  "description": "...",
  "tags": ["...", "..."],
  "hashtags": ["#...", "#..."],
  "thumbnailText": "..."
}
```

`GET /api/me` — returns the signed-in Google user's name, email, and picture.

## Running locally

### Prerequisites
- Java 21+
- Node.js 18+
- Google Cloud OAuth 2.0 Client ID (with `http://localhost:8080/login/oauth2/code/google` as an authorized redirect URI)
- OpenAI and/or Google Gemini API keys

### Backend

```bash
cd backend/TubeTitleGenerator
```

Set the required environment variables (or add them to `application.properties`):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`

Then run:

```bash
./mvnw spring-boot:run
```

Backend runs at `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and expects the backend at `http://localhost:8080`.

## Deploying

Backend is designed to deploy cleanly to Render or any container platform. For production:

1. Bind to the platform's `$PORT` — `server.port=${PORT:8080}`.
2. Add the deployed frontend URL to CORS allowed origins in `SecurityConfig`.
3. Configure cookies for cross-site use — `SameSite=None; Secure`.
4. Update the Google OAuth authorized redirect URI to the deployed backend URL.
5. Set all API keys via the platform's environment variables — never commit them.

Frontend builds to a static bundle (`npm run build`) and can be hosted on Vercel, Netlify, or Render Static.

## License

MIT
