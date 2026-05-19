# Commit-Happens-2026
# Project : The Digital Safety Vault

### Cross-Platform Evidence Preservation Utility
**Category:** Digital Safety & Legal Tech



##  The Problem & Core Concept
When victims of cyberbullying or online harassment attempt to take legal or disciplinary action, their evidence is often deleted by the perpetrator, or standard screenshots are rejected by authorities because they lack metadata and can be easily altered or faked.

**The Digital Safety Vault** instantly captures online harassment, links it to unalterable metadata, runs it through a cryptographic engine to create a "tamper-proof digital seal," and compiles it into an official, structured legal report ready for law enforcement or university authorities.



##  Technical Workflow

```plaintext
[Frontend Channels]                                   [Backend Core Engine]

1A. Desktop Extension (Scrapes Text & URL)   ───┐
                                                ├───> POST /api/evidence ───> 2. Generate SHA-256 Hash
1B. Mobile Web Form (Manual Text & Upload)   ───┘                             │
                                                                              v
4. User Downloads Official PDF Report <─── 3. Compile PDF Document <─── Store Data in Local Vault
```

1. **Ingestion:** The user triggers a capture via the Chrome Extension (automated text/URL scraping) or the Mobile Web Form (manual text & image upload).
2. **Transmission:** The frontend packages the data into a JSON payload and transmits it to our backend via an HTTP `POST` request to `/api/evidence`.
3. **Hashing:** The backend merges the fields and calculates a unique SHA-256 cryptographic hash:
   $$\text{Package} = \text{URL} + \text{Timestamp} + \text{Evidence Text}$$
   If a single character of the evidence text is altered later, the hash breaks, immediately proving tampering.
4. **Document Generation:** The backend compiles the verified metadata, raw logs, and the unique validation hash into a formal, tamper-evident PDF report stored in a secure local directory.



##  Tech Stack

* **Extension Frontend:** Vanilla JavaScript, HTML5, CSS3 (Chrome Extension Manifest V3 API)
* **Mobile Frontend Portal:** HTML5, CSS3, JavaScript
* **Backend Server Engine:** Node.js, Express
* **Core Libraries:** `crypto` (native hashing), `pdfkit` (PDF generation), `cors`



##  Project Structure :

### Step 1: Main Project Folder
```plaintext
digital-safety-vault/
```

### Step 2: Root Configuration Files
```plaintext
digital-safety-vault/
├── README.md
└── .gitignore
```

### Step 3: Extension Directory
```plaintext
digital-safety-vault/
├── README.md
├── .gitignore
└── extension/
```

### Step 4: Mobile Portal Directory
```plaintext
digital-safety-vault/
├── README.md
├── .gitignore
├── extension/
└── mobile-portal/
```

### Step 5: Backend & Storage Directory
```plaintext
digital-safety-vault/
├── README.md
├── .gitignore
├── extension/
├── mobile-portal/
└── backend/
    └── vault/
```



##  Getting Started

Follow these steps to run the backend engine and connect the frontends locally.

### 1. Set Up the Backend Server
Navigate to the backend directory, install the required packages, and launch the server:

```bash
cd backend
npm install express cors pdfkit
node server.js
```
*The backend server will run on `http://localhost:5000`.*

### 2. Install the Chrome Extension
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the `extension/` folder from this project repository.

### 3. Open the Mobile Gateway Portal
Open the `mobile-portal/index.html` file in any modern web browser to interact with the responsive mobile web interface.



##  API Data Exchange

When data is sent from either frontend channel to `POST http://localhost:5000/api/evidence`, it uses the following structure:

```json
{
  "url": "[https://example.com/harassment-source](https://example.com/harassment-source)",
  "timestamp": "2026-05-19T13:58:35Z",
  "evidenceText": "UserXyz sent intimidating messages on this public forum."
}
```

The server processes the package and responds with:
```json
{
  "status": "success",
  "hash": "8f3c3a9d82129c97b8bb5d81b85521b4a49646b149b934ca495991b7852b855f",
  "downloadUrl": "http://localhost:5000/vault/report-1716127115.pdf"
}
```
