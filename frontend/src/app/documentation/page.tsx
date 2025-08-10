import React from "react";

const DocumentationPage = () => (
  <main className="p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">Technical Documentation</h1>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">How to Run the Project</h2>
      <h3 className="text-xl font-semibold mt-4">Automated</h3>
        <pre className="bg-gray-100 p-2 rounded mb-4 whitespace-pre-wrap">npm install</pre>
        <pre className="bg-gray-100 p-2 rounded mb-4 whitespace-pre-wrap">npm run install:all</pre>
        <pre className="bg-gray-100 p-2 rounded mb-4 whitespace-pre-wrap">npm run dev</pre>
        <h3 className="text-xl font-semibold mt-4">Install and Run Projects Separately</h3>
        <h4 className="text-lg font-semibold mt-2">Backend (Go)</h4>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd backend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go run main.go</pre>
        <h4 className="text-lg font-semibold mt-2">Frontend (Next.js)</h4>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd frontend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm install</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">npm run dev</pre>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">API Documentation</h2>
      <p className="mb-2">View and test all backend endpoints interactively using Swagger UI:</p>
      <a href="/documentation/swagger-ui" className="text-blue-600 underline">Open Swagger UI</a>
    </section>
    <section>
      <h2 className="text-2xl font-semibold mb-2">How to Run Unit Tests</h2>
      <h3 className="text-xl font-semibold mt-4">Backend (Go)</h3>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">cd backend</pre>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go test -v ./tests</pre>
        <p className="mt-2">To run a specific test file:</p>
        <pre className="bg-gray-100 p-2 rounded mb-2 whitespace-pre-wrap">go test -v ./tests/file_name.go</pre>

    </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Additional Notes</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>For API documentation, consider using Swagger for the backend.</li>
          <li>For troubleshooting, check logs and error messages in the terminal.</li>
        </ul>
      </section>
  </main>
);

export default DocumentationPage;
