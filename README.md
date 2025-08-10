
## 🚀 Technical Analysis & Requirements
<details open>
   <summary><b>Technical Analysis & Requirements</b></summary>
   <br>
   <p>
      Welcome to <strong>ELibrary ByFood</strong>! This project is a full-stack web application for managing and exploring a digital library. It is built with Go (backend) and Next.js (frontend).
   </p>
   <h4>Requirements</h4>
   <ul>
      <li><strong>Go (Golang)</strong> – for backend API</li>
      <li><strong>Node.js</strong> – for frontend and automation scripts</li>
   </ul>
</details>

## 🛠️ How to Run the Project
<details open>
   <summary><b>How to Run the Project</b></summary>
   <br>
   <p>
      <strong>Quick Start:</strong> Use the automated scripts for a hassle-free setup, or follow the manual steps for more control.
   </p>
   <h4>Automated Installation & Run (Recommended)</h4>
   <ol>
      <li>Install Node.js dependencies:<br><code>npm install</code></li>
      <li>Install dependencies for both backend and frontend:<br><code>npm run install:all</code></li>
      <li>Start both servers:<br><code>npm run dev</code></li>
   </ol>
   <h4>Manual Setup</h4>
   <strong>Backend (Go)</strong>
   <ol>
      <li>Navigate to backend:<br><code>cd backend</code></li>
      <li>Run the backend server:<br><code>go run main.go</code></li>
   </ol>
   <strong>Frontend (Next.js)</strong>
   <ol>
      <li>Navigate to frontend:<br><code>cd frontend</code></li>
      <li>Install dependencies:<br><code>npm install</code></li>
      <li>Run the frontend server:<br><code>npm run dev</code></li>
   </ol>
   <p>
      <em>Note: Make sure both servers are running for full functionality.</em>
   </p>
</details>

---


## 📸 Documentation & Screenshots
<details open>
   <summary><b>Documentation & Screenshots</b></summary>
   <br>
   <p>
      Explore the main features and UI of ELibrary ByFood through these screenshots. Each image highlights a key part of the user experience or development process.
   </p>
   <details open>
      <summary><b>Dashboard</b></summary>
      <br>
      <img src="assets/dashboard.png" alt="Dashboard" />
      <p>The dashboard gives you a quick overview of your library, including stats and navigation links.</p>
      <p>You can also search for books here.</p>
   </details>
   <details open>
      <summary><b>Your Books Page</b></summary>
      <br>
      <img src="assets/your_books_page.png" alt="Your Books Page" />
      <p>See all the books you own, filter by status, and manage your collection easily.</p>
   </details>
   <details open>
      <summary><b>Add New Book</b></summary>
      <br>
      <img src="assets/add_new_book.png" alt="Add New Book" />
      <p>Add a new book to your library with a simple form. Required fields are validated for accuracy.</p>
   </details>
   <details open>
      <summary><b>View Book</b></summary>
      <br>
      <img src="assets/view_book.png" alt="View Book" />
      <p>View detailed information about any book, including author, year, and status.</p>
   </details>
   <details open>
      <summary><b>Filter & Search</b></summary>
      <br>
      <img src="assets/filter_search.png" alt="Filter & Search" />
      <p>Quickly find books using filters for title, author, year, and status.</p>
   </details>
   <details open>
      <summary><b>API Documentation Page</b></summary>
      <br>
      <img src="assets/documentation_page.png" alt="Documentation Page" />
      <p>Access Document page to have a complete overview on technical side.</p>
      <p>You can also navigate to swagger UI from here. </p>
   </details>
   <details open>
      <summary><b>Swagger UI</b></summary>
      <br>
      <img src="assets/swagger.png" alt="Swagger" />
      <p>Swagger UI lets you explore and test the backend API visually.</p>
   </details>
   <details open>
      <summary><b>How to Run Unit Tests & Backend Tests</b></summary>
      <br>
      <p>
         <strong>Backend (Go):</strong> Run automated tests to ensure your backend logic is working as expected.
      </p>
      <ol>
         <li>Navigate to backend:<br><code>cd backend</code></li>
         <li>Run all tests:<br><code>go test -v ./tests</code></li>
         <li>Run a specific test file:<br><code>go test -v ./tests/file_name.go</code></li>
      </ol>
      <p>
         <em>Test output will show which tests passed or failed. For frontend testing, add your preferred framework.</em>
      </p>
      <br>
      <img src="assets/book_test_pass.png" alt="Book Test Pass" />
      <p>Example of a successful backend test for book-related functionality.</p>
      <img src="assets/url_test_pass.png" alt="URL Test Pass" />
      <p>Example of a successful backend test for URL processing.</p>
   </details>
</details>

## Additional Notes & Tips
<details open>
   <summary><b>Additional Notes & Tips</b></summary>
   <br>
   <ul>
      <li><b>About the Project:</b> ELibrary ByFood is a full-stack web application for managing, searching, and documenting your book collection. It features a Go backend and a Next.js frontend, with a modern UI and robust API.</li>
      <li><b>Accessing Swagger API Docs:</b> After starting both backend and frontend servers, open your browser and go to <code>http://localhost:3000/documentation</code> to view and interact with the Swagger UI.</li>
      <li><b>Troubleshooting:</b> If you encounter issues, check the terminal for error messages and logs. Most problems can be resolved by reviewing the output and ensuring all dependencies are installed.</li>
      <li><b>Need Help?</b> For further help, consult the code comments, review the documentation, or reach out to me.</li>
   </ul>
</details>
<details open>
   <summary><b>Git History (On Request)</b></summary>
   <br>
   <p>On request git history from development attached to the read.me</p>
   <img src="assets/git_history.png" alt="Git History" />
</details>
