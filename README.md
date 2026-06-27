# EchoVerse AI — Production Setup Guide

**Every Voice Has An Echo.** — Urdu-first AI Voice Content Platform.

---

## ⚠️ Before You Start

After cloning, immediately rotate any API keys that were ever shared outside your team. Use fresh keys everywhere.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Animation | Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| AI/TTS | ElevenLabs, OpenAI GPT-4o |
| Payments | Paddle |
| Mobile | Capacitor (Android) |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## 1. Environment Setup

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

ELEVENLABS_API_KEY=your-elevenlabs-key
OPENAI_API_KEY=your-openai-key
DEEPGRAM_API_KEY=your-deepgram-key

NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-paddle-client-token
PADDLE_API_KEY=your-paddle-api-key
PADDLE_WEBHOOK_SECRET=your-paddle-webhook-secret

NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 2. Database Setup

Run migrations in order against your Supabase project:

```bash
# Option A: Supabase CLI
supabase db push

# Option B: Supabase Dashboard > SQL Editor
# Run: supabase/migrations/001_initial.sql
# Then: supabase/migrations/002_missing_tables.sql
```

---

## 3. Supabase Auth Setup

In Supabase Dashboard:
1. **Authentication → Providers** → Enable Google OAuth
   - Add `https://your-domain.com/auth/callback` to redirect URLs
2. **Authentication → URL Configuration**
   - Site URL: `https://your-domain.com`
   - Redirect URLs: add `https://your-domain.com/auth/callback`

---

## 4. Paddle Setup

1. Create account at paddle.com
2. Create products for Pro, Studio, Enterprise plans
3. Copy price IDs to `.env.local`:
   ```
   NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY=pri_xxx
   NEXT_PUBLIC_PADDLE_PRICE_PRO_ANNUAL=pri_xxx
   NEXT_PUBLIC_PADDLE_PRICE_STUDIO_MONTHLY=pri_xxx
   NEXT_PUBLIC_PADDLE_PRICE_STUDIO_ANNUAL=pri_xxx
   ```
4. Set webhook URL: `https://your-domain.com/api/webhooks/paddle`
5. Subscribe to events: `subscription.created`, `subscription.updated`, `subscription.canceled`, `transaction.completed`

---

## 5. Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 6. Deploy to Vercel

```bash
npx vercel --prod
```

Set all env vars in Vercel dashboard → Settings → Environment Variables.

---

## 7. Android Build

### Prerequisites
- JDK 17+
- Android Studio / SDK (API 34)
- Node.js 20+

### Generate Keystore (first time only)
```bash
keytool -genkey -v -keystore android/app/echoverse.keystore \
  -alias echoverse -keyalg RSA -keysize 2048 -validity 10000
```

### Build
```bash
# 1. Export static Next.js build
npm run build
npx next export  # if using static export for Capacitor

# 2. Sync to Android
npx cap sync android

# 3. Open in Android Studio (recommended)
npx cap open android

# OR build from CLI:
cd android
# Debug APK
./gradlew assembleDebug

# Release APK (set signing props in gradle.properties first)
./gradlew assembleRelease

# Release AAB (for Play Store)
./gradlew bundleRelease
```

Output paths:
- Debug APK: `android/app/build/outputs/apk/debug/`
- Release APK: `android/app/build/outputs/apk/release/`
- Release AAB: `android/app/build/outputs/bundle/release/`

---

## 8. GitHub Actions CI/CD

Set these repository secrets:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ELEVENLABS_API_KEY
OPENAI_API_KEY
PADDLE_API_KEY
PADDLE_WEBHOOK_SECRET
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
ANDROID_KEYSTORE_BASE64   # base64 of your .keystore file
ANDROID_KEY_ALIAS
ANDROID_KEY_PASSWORD
ANDROID_STORE_PASSWORD
```

Workflows:
- `ci.yml` — runs on every push: lint → typecheck → build → deploy
- `android.yml` — builds APK/AAB on main push and version tags

To trigger a release build:
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 9. Security Checklist

- [ ] All API keys in environment variables only — no hardcoding
- [ ] `SUPABASE_SERVICE_ROLE_KEY` only used in server-side routes
- [ ] `ELEVENLABS_API_KEY`, `OPENAI_API_KEY` only used in `/api/*` routes
- [ ] Row Level Security enabled on all Supabase tables
- [ ] Paddle webhook signature verified before processing
- [ ] API keys stored as hashed values — full key shown only once
- [ ] Route protection via Next.js middleware

---

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/generate-speech` | POST | TTS generation via ElevenLabs |
| `/api/voices` | GET | Fetch available voices |
| `/api/clone-voice` | POST | Clone voice via ElevenLabs |
| `/api/ai/generate-script` | POST | Generate script via OpenAI |
| `/api/keys` | GET/POST/DELETE | Manage API keys |
| `/api/checkout` | POST | Create Paddle checkout session |
| `/api/webhooks/paddle` | POST | Handle Paddle payment events |
| `/auth/callback` | GET | Supabase OAuth callback |

---

## Project Structure

```
echoverse-ai/
├── app/
│   ├── (auth)/auth/          # Sign in / sign up
│   ├── (dashboard)/          # All protected app pages
│   │   ├── dashboard/
│   │   ├── voice-studio/
│   │   ├── podcast-studio/
│   │   ├── story-studio/
│   │   ├── audiobook-studio/
│   │   ├── ssml-studio/
│   │   ├── emotion-engine/
│   │   ├── reels-generator/
│   │   ├── video-studio/
│   │   ├── voice-cloning/
│   │   ├── voice-brand-kits/
│   │   ├── projects/
│   │   ├── templates/
│   │   ├── team/
│   │   ├── analytics/
│   │   ├── api-access/
│   │   ├── pricing/
│   │   └── settings/
│   ├── api/                  # Server-side API routes
│   │   ├── generate-speech/
│   │   ├── voices/
│   │   ├── clone-voice/
│   │   ├── ai/generate-script/
│   │   ├── keys/
│   │   ├── checkout/
│   │   └── webhooks/paddle/
│   └── auth/callback/        # OAuth callback
├── components/               # Reusable UI components
├── stores/                   # Zustand state stores
├── lib/                      # Service clients
├── types/                    # TypeScript types
├── supabase/migrations/      # Database migrations
├── android/                  # Capacitor Android project
└── .github/workflows/        # CI/CD pipelines
```
