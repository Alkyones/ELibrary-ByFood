
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
2. Run all tests:
   ```bash
   go test -v ./tests
   ```
3. Alternatively run specific test file:
    ```bash
    go test -v /./tests/file_name
    ```

---

## Additional Notes
- For API documentation, You can explore the swagger. After running the project you can visit Documentation (Api Documentation Section)
- For troubleshooting, check logs and error messages in the terminal.

---
