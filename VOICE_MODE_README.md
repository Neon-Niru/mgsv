MindGuard voice mode update
===========================

What changed
------------
- A spoken welcome is attempted when a user first reaches the dashboard after login/registration.
- A visible “Play voice welcome” button is available if the browser blocks automatic speech.
- Normal AI Chat has Voice replies On/Off (on by default) and a “Speak to MindGuard” microphone input button where supported.
- Speech uses the browser's built-in Speech Synthesis / Speech Recognition APIs. No extra API key or paid voice service is needed.
- Wellness interview logic, duplicate-question protections, scoring, routes, and backend AI files were not edited for this voice feature.

Important browser notes
-----------------------
- Microsoft Edge/Chrome voices vary by installed system voices. This provides a JARVIS-like hands-free experience, not a cloned actor/character voice.
- If the welcome does not speak automatically, click “Play voice welcome”; browsers may block autoplay until a user gesture.
- For microphone input, allow microphone access when the browser asks. If speech recognition is unavailable, typing still works and AI voice replies can still work.

Run on Windows
--------------
1. Extract this ZIP.
2. Backend CMD: cd into `mg_extracted\mindguard-backend`, activate your existing venv (or create one and `pip install -r requirements.txt`), then run `python app.py`.
3. Frontend CMD: cd into `mg_extracted\mindguard-frontend`, run `npm install`, then `npm run dev`.
4. Open the localhost URL printed by Vite.

The frontend `node_modules` and backend virtual environment are intentionally omitted from this ZIP so Windows installs the correct platform-specific dependencies.
