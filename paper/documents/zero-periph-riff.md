# 📠 PROJECT: THE ZERO-PERIPHERAL RIFF
**Status:** RFC (Request for Comment) | **Draft:** v0.1
**Objective:** Define the architecture for a "Voice-to-E-ink" loop that requires NO laptop and NO phone interaction.

---

## 1. THE CORE CONCEPT
We are building a "Living Document" system. The goal is to separate **Capture** (Low Fidelity) from **Refinement** (High Fidelity).

**The User Story:**
1.  User reads a PDF on Boox Go 10.3.
2.  User draws a "Broadcast Glyph" `•))` next to a paragraph.
3.  User speaks a "Riff" (Voice Memo).
4.  User closes the tablet.
5.  The System (Cloud) processes the audio + visual location.
6.  The System updates the original Markdown file and regenerates the PDF.
7.  The new PDF silently replaces the old one on the Boox.

---

## 2. THE CONSTRAINTS (The "Boox-Only" Rule)
* **No Mac Required:** The pipeline must run entirely in the cloud.
* **No Phone Trigger:** The recording must happen on the Boox (via Otter/Notes).
* **Zero-Touch Sync:** The user should not have to manually "export" or "upload." It must rely on background folder syncing (Google Drive/Dropbox).

---

## 3. ARCHITECTURE CAGE MATCH: RAILWAY vs. VERCEL
*We need a cloud brain to listen for new audio files and run the "Refiner" script. Which engine should we choose?*

### OPTION A: VERCEL (The "Serverless" Sniper)
**The Vibe:** Fast, lightweight, event-driven.
* **Pros:**
    * Free tier is generous for personal use.
    * "Scale to Zero" (No cost when you aren't riffing).
    * Excellent integration with GitHub for "Git-to-Deploy."
* **Cons:**
    * **Timeout Limits:** Vercel functions time out after 10-60 seconds. Processing a 5-minute audio rant might kill the process before it finishes.
    * **Stateless:** Harder to keep a "memory" of previous riffs without an external database.

### OPTION B: RAILWAY (The "Persistent" Tank)
**The Vibe:** Always-on, robust, Docker-based.
* **Pros:**
    * **No Timeouts:** You can run a script for 20 minutes if you need to transcribe a whole lecture.
    * **Background Workers:** Perfect for "watching" a Google Drive folder for changes (Polling).
    * **Native Docker:** If we need a specific Python library for PDF generation (ReportLab), Railway handles custom environments better.
* **Cons:**
    * Cost: It effectively costs ~$5/month once you leave the trial, because the server is "always on."

### [ DECISION POINT ]
*(Circle your choice below and Riff on why)*

[ ] **TEAM VERCEL** (I want it free and fast, I'll keep my rants short.)

[ ] **TEAM RAILWAY** (I want power and long audio processing, $5 is fine.)

---

## 4. THE "AUTONOMOUS" LOOP (How it works)
*Critique this workflow logic:*

1.  **Ingest:** `Make.com` watches `Google Drive/Boox/Recordings`.
2.  **Trigger:** New file detected -> Send to [CHOSEN PLATFORM].
3.  **Transcribe:** Platform sends Audio to **OpenAI Whisper** or **Gemini 1.5 Flash**.
4.  **Reason:** Platform sends Transcript + Old Markdown to **Gemini 1.5 Pro**.
    * *Prompt:* "Update the article based on this rant."
5.  **Render:** Platform generates `v0.2.pdf`.
6.  **Deploy:** Platform overwrites the file in `Google Drive/Boox`.

---

## 5. OPEN QUESTIONS (Riff Zone)
* *How do we handle the "Visual Location" without a custom app?* (Can Gemini "see" the scribble on the PDF if we just upload the PDF page as an image?)
* *Should we use a "Magic Word" in the audio to target sections instead of relying on visual circling?* (e.g., "Computer, update Section 3...")

*(Draw a `•))` here and explain how you want the targeting to work.)*
