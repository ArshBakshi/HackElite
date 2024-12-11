import { useState } from 'react';

function App() {
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [savedDocuments, setSavedDocuments] = useState([]);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const handleSaveDocument = () => {
    if (document && documentType) {
      setSavedDocuments((prev) => [
        ...prev,
        { file: document, type: documentType },
      ]);
      setDocument(null);
      setDocumentType('');
      alert('Document saved successfully!');
    } else {
      alert('Please upload a document and select a type.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-2xl font-bold text-center">Document Management</h1>
      </header>
      <main className="mt-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Upload Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload a Document</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              onChange={handleDocumentUpload}
              className="file-input file-input-bordered w-full"
            />
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">--Select Type--</option>
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="Image">Image</option>
            </select>
            <button
              onClick={handleSaveDocument}
              className="btn btn-primary"
            >
              Save Document
            </button>
          </div>
        </section>

        {/* Retrieve Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Retrieve Saved Documents</h2>
          <div className="space-y-4">
            {savedDocuments.length > 0 ? (
              savedDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Document:</strong> {doc.file.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {doc.type}
                    </p>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      alert(`Retrieved: ${doc.file.name} (${doc.type})`)
                    }
                  >
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No documents saved yet.</p>
            )}
            
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
