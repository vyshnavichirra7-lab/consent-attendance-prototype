# Consent-Based Facial Recognition Attendance System

Beginner-friendly React + Flask working prototype. It intentionally does **not** implement real facial recognition: the camera page is a camera-preview demonstration and clicking the button records a demo attendance event. No face image or biometric template is stored. Attendance and registration are stored in SQLite.

## Requirements
- Python 3.10+
- Node.js 18+
- A modern browser (camera access requires localhost or HTTPS)

## Run backend
From the project directory:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Flask API starts at `http://127.0.0.1:5000`. SQLite database is created as `backend/attendance.db` on first run. For first-time setup, open `/api/health` to check the service; database tables initialize when `app.py` runs.

## Run frontend
In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite address printed in the terminal (normally `http://localhost:5173`). Keep both terminals running.

## Try it
1. Register with a name and unique user ID.
2. On the consent page, choose either consent or decline. Declining routes to the no-camera alternative.
3. If consenting, start the camera (or use the alternative option). Complete demo verification to record an event.
4. Open Dashboard to view records. Admin demo login is `admin` / `ChangeMe123!`.

## Prototype limitations and safety
This is a local demonstration, not a production-ready attendance or identity-verification system. Admin login is a simple prototype endpoint; it does not use a secure authenticated session, rate limits, or role-based authorization. Change the demo password and implement proper authentication before any deployment. Use HTTPS, server-side authorization, input validation, backups, audit controls, retention/deletion rules, and a privacy/legal review before handling real attendance or biometric data. Provide a genuine non-biometric alternative. Consent should be informed, voluntary, specific, current, and withdrawal-friendly; privacy regulators recommend assessing impacts, minimizing data, and offering an alternative where people decline. [OAIC facial recognition privacy risk guidance](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/facial-recognition-technology-a-guide-to-assessing-the-privacy-risks)

The built-in Flask server is for local development only, not production deployment. See [Flask development server documentation](https://flask.palletsprojects.com/en/stable/server/).
