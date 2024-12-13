import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Utility function to calculate file hash
const calculateFileHash = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const sha256Hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(sha256Hash));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

function HomePage() {
  const navigate = useNavigate();

  const PINATA_API_KEY = "fe3260c6973d4b9d12f7";
  const PINATA_SECRET_API_KEY =
    "911a5084cfdc9d1ac64bd7be6d50cf3cd44288f944d456666f63b9cab0875b69";

  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [savedDocuments, setSavedDocuments] = useState([]);

  // Fetch pinned files from Pinata on load
  useEffect(() => {
    const fetchSavedDocuments = async () => {
      try {
        const res = await axios.get(
          "https://api.pinata.cloud/data/pinList?status=pinned",
          {
            headers: {
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
          }
        );
        const pinnedItems = res.data.rows.map((item) => ({
          cid: item.ipfs_pin_hash,
          name: item.metadata.name,
          type: item.metadata.keyvalues?.type || "Unknown",
          hash: item.metadata.keyvalues?.fileHash || "Unknown",
        }));
        setSavedDocuments(pinnedItems);
      } catch (error) {
        console.error("Error fetching pinned documents:", error);
      }
    };

    fetchSavedDocuments();
  }, []);

  // Handle file upload
  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(file);
      const hash = await calculateFileHash(file);
      setFileHash(hash);
    }
  };

  // Handle saving document to Pinata
  const handleSaveDocument = async () => {
    if (document && documentType) {
      try {
        const formData = new FormData();
        formData.append("file", document);

        const metadata = JSON.stringify({
          name: document.name,
          keyvalues: {
            type: documentType,
            fileHash: fileHash,
          },
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
          cidVersion: 1,
        });
        formData.append("pinataOptions", options);

        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
          }
        );

        const cid = res.data.IpfsHash;

        setSavedDocuments((prev) => [
          ...prev,
          {
            file: document,
            type: documentType,
            cid,
            hash: fileHash,
          },
        ]);

        setDocument(null);
        setDocumentType("");
        setFileHash("");
        alert(`Document saved successfully! CID: ${cid}`);
      } catch (error) {
        console.error("Error uploading document to Pinata:", error);
        alert("Failed to upload document to Pinata.");
      }
    } else {
      alert("Please upload a document and select a type.");
    }
  };

  // Handle deleting a document from Pinata
  const handleDeleteDocument = async (cid) => {
    try {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      setSavedDocuments((prev) =>
        prev.filter((document) => document.cid !== cid)
      );
      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete document.");
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
            {fileHash && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-mono break-all">
                  <strong>File Hash (SHA-256):</strong> {fileHash}
                </p>
              </div>
            )}
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
            <button onClick={handleSaveDocument} className="btn btn-primary">
              Save Document
            </button>
          </div>
        </section>

        {/* Retrieve Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Retrieve Saved Documents
          </h2>
          <div className="space-y-4">
            {savedDocuments.length > 0 ? (
              savedDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow flex flex-col space-y-2"
                >
                  <div>
                    <p>
                      <strong>Document:</strong> {doc.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {doc.type}
                    </p>
                    <p>
                      <strong>CID:</strong> {doc.cid}
                    </p>
                    <p className="font-mono text-sm break-all">
                      <strong>File Hash:</strong> {doc.hash}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${doc.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-link"
                    >
                      View on Pinata
                    </a>
                    <button
                      onClick={() => handleDeleteDocument(doc.cid)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
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

export default HomePage;
