
# Technical Analysis & Documentation

### Requirements:
1. Go (Golang)
2. Node.js

## How to Run the Project

### Automated Installation and Run (Recommended)
1. Install required packages for automation:
   ```bash
   npm install
   ```
2. Install dependencies for both projects:
   ```bash
   npm run install:all
   ```
3. Run both projects:
   ```bash
   npm run dev
   ```

### Install and Run Projects Separately

#### Backend (Go)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the backend server:
   ```bash
   go run main.go
   ```

#### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend server:
   ```bash
   npm run dev
   ```

## How to Run Unit Tests

#### Backend (Go)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run all Go tests:
   ```bash
   go test ./...
   ```

---

## Additional Notes
- For API documentation, consider using Swagger for the backend (see previous instructions).
- For troubleshooting, check logs and error messages in the terminal.

---
