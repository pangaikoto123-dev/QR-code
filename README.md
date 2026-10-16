# QR Attendance PWA

This repository has been updated to a Next.js Progressive Web App (PWA) that implements a basic QR-based attendance flow.

Quick overview of features added
- PWA ready (manifest + next-pwa)
- Teacher authentication with Firebase Auth (email/password)
- Teachers can create "sessions" which generate a random token and a QR code link
- Students scanning the QR open the /attend page where they submit name, grade, section
- Submissions are stored in Firestore under sessions/{sessionId}/attendees
- Teacher dashboard shows sessions and attendee lists

Setup (Firebase and Vercel)
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Email/Password sign-in in Authentication
3. Create a Firestore database (in production mode or test mode as you prefer)
4. Copy Firebase config values and set them in Vercel Environment Variables (or a local .env.local):

NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

Locally, create a `.env.local` with those variables and run:

npm install
npm run dev

Deploying to Vercel
- Import the repo into Vercel and add the same environment variables under Project Settings > Environment Variables.
- Build & Deploy. Vercel will run `next build` and serve the app.

Notes & Next steps
- This is a minimal MVP. For production, consider:
  - Security rules for Firestore to prevent tampering (restrict session writes to session owner, etc.)
  - Expiration for sessions (auto-disable old sessions)
  - Rate-limiting / duplicate submissions checks
  - Email verification for teachers
  - Better UX and design, custom icons

