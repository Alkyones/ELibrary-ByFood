import React from "react";


const DocumentationPage = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-blue-700">ELibrary ByFood Documentation</h1>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">📚 Project Overview</h2>
      <p className="mb-4 text-lg">
        ELibrary ByFood is a full-stack web application for managing, searching, and documenting your book collection. It features a Go backend and a Next.js frontend, with a modern UI and robust API.
      </p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">🛠️ How to Run the Project</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mt-4">Automated Setup (Recommended)</h3>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm install</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm run install:all</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm run dev</pre>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mt-4">Manual Setup</h3>
        <h4 className="text-lg font-semibold mt-2">Backend (Go)</h4>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd backend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go run main.go</pre>
        <h4 className="text-lg font-semibold mt-2">Frontend (Next.js)</h4>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd frontend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm install</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm run dev</pre>
      </div>
      <p className="italic">Make sure both servers are running for full functionality.</p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">🔗 API Documentation (Swagger)</h2>
      <p className="mb-2 text-lg">View and test all backend endpoints interactively using Swagger UI:</p>
      <a href="/documentation/swagger-ui" className="text-blue-600 underline font-semibold">Open Swagger UI</a>
      <p className="mt-2 text-sm text-gray-700">Or visit <span className="font-mono">http://localhost:3000/documentation</span> after starting the project.</p>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">🧪 How to Run & View Backend Tests</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mt-4">Run Backend Tests (Go)</h3>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd backend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go test -v ./tests</pre>
        <p className="mt-2">To run a specific test file:</p>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go test -v ./tests/file_name.go</pre>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mt-4">Test Results Examples</h3>
        <img src="/assets/book_test_pass.png" alt="Book Test Pass" className="mb-2 rounded shadow" />
        <p className="mb-4">Example of a successful backend test for book-related functionality.</p>
        <img src="/assets/url_test_pass.png" alt="URL Test Pass" className="mb-2 rounded shadow" />
        <p>Example of a successful backend test for URL processing.</p>
      </div>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">💡 Additional Notes & Tips</h2>
      <ul className="list-disc ml-6 mb-4 text-lg">
        <li><b>About the Project:</b> ELibrary ByFood is a full-stack web application for managing, searching, and documenting your book collection. It features a Go backend and a Next.js frontend, with a modern UI and robust API.</li>
        <li><b>Accessing Swagger API Docs:</b> After starting both backend and frontend servers, open your browser and go to <span className="font-mono">http://localhost:3000/documentation</span> or <span className="font-mono">http://localhost:8080/api/docs</span> to view and interact with the Swagger UI.</li>
        <li><b>Troubleshooting:</b> If you encounter issues, check the terminal for error messages and logs. Most problems can be resolved by reviewing the output and ensuring all dependencies are installed.</li>
        <li><b>Need Help?</b> For further help, consult the code comments, review the documentation, or reach out to the project maintainers.</li>
      </ul>
    </section>
  </main>
);

export default DocumentationPage;
