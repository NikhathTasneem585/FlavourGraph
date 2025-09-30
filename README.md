<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/126RtLZCsruu2VrKWABSnjmi2e6OK_VG3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Updated Configuration (UI + APIs)

- **Dark Mode:** A theme toggle was added to the header. Tailwind is configured with `darkMode: 'class'`.
- **API Config:**
  - Set `VITE_GEMINI_API_KEY` in `.env.local` to use the Gemini-powered suggestions.
  - Or set `VITE_USE_BACKEND=true` and `VITE_API_BASE_URL=http://localhost:8000` to use the Django backend endpoints:
    - `POST /api/suggestions/` with payload `{ "ingredients": ["Garlic", ...], "algorithm": "greedy" | "backtracking" }`
- The app will automatically use the backend if `VITE_USE_BACKEND=true` **or** if no `VITE_GEMINI_API_KEY` is set.
