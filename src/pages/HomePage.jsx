import { useState, useEffect } from "react";
import { Upload, File, Trash2, ExternalLink, FileText } from "lucide-react";

const calculateFileHash = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const sha256Hash = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(sha256Hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export default function HomePage() {
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [savedDocuments, setSavedDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [hoveredDoc, setHoveredDoc] = useState(null);

  const PINATA_API_KEY = "fe3260c6973d4b9d12f7";
  const PINATA_SECRET_API_KEY = "911a5084cfdc9d1ac64bd7be6d50cf3cd44288f944d456666f63b9cab0875b69";

  useEffect(() => {
    fetchSavedDocuments();
  }, []);

  const fetchSavedDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.pinata.cloud/data/pinList?status=pinned", {
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });
      const data = await response.json();
      const pinnedItems = data.rows.map((item) => ({
        cid: item.ipfs_pin_hash,
        name: item.metadata.name,
        type: item.metadata.keyvalues?.type || "Unknown",
        hash: item.metadata.keyvalues?.fileHash || "Unknown",
      }));
      setSavedDocuments(pinnedItems);
    } catch (error) {
      console.error("Error fetching pinned documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        setUploadStatus("No file selected");
        return;
      }

      setUploadStatus(`Selected file: ${file.name}`);
      console.log("File selected:", file);

      setDocument(file);
      const hash = await calculateFileHash(file);
      setFileHash(hash);
      setUploadStatus(`File loaded: ${file.name} (${hash.slice(0, 8)}...)`);
    } catch (error) {
      console.error("Error handling file upload:", error);
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleSaveDocument = async () => {
    if (!document || !documentType) {
      setUploadStatus("Please select a file and document type");
      return;
    }

    setLoading(true);
    setUploadStatus("Uploading to Pinata...");

    try {
      const formData = new FormData();
      formData.append("file", document);

      const metadata = JSON.stringify({
        name: document.name,
        keyvalues: { type: documentType, fileHash },
      });
      formData.append("pinataMetadata", metadata);
      formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
          body: formData,
        }
      );

      const data = await response.json();
      setSavedDocuments((prev) => [
        ...prev,
        {
          file: document,
          type: documentType,
          cid: data.IpfsHash,
          hash: fileHash,
          name: document.name,
        },
      ]);

      setDocument(null);
      setDocumentType("");
      setFileHash("");
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setUploadStatus(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (cid) => {
    setLoading(true);
    try {
      await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
        method: "DELETE",
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      });

      setSavedDocuments((prev) => prev.filter((doc) => doc.cid !== cid));
      setUploadStatus("Document deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      setUploadStatus(`Delete failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0D1117]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative w-72 bg-gray-900/50 backdrop-blur-lg border-r border-gray-800/50 overflow-y-auto">
        <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Documents
          </h2>
        </div>
        <div className="p-2">
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            savedDocuments.map((doc) => (
              <div
                key={doc.cid}
                className="mb-2 p-3 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 relative"
                onMouseEnter={() => setHoveredDoc(doc)}
                onMouseLeave={() => setHoveredDoc(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-200">{doc.name}</span>
                  </div>
                  <span className="px-2 py-1 text-xs bg-gray-700/50 rounded-full text-gray-300">
                    {doc.type}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${doc.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteDocument(doc.cid)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {hoveredDoc?.cid === doc.cid && (
                  <div className="absolute left-full top-0 ml-2 z-50 w-64 p-4 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700">
                    <p className="text-sm font-medium text-gray-200 mb-2">{doc.name}</p>
                    <FileText className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                    <div className="text-xs text-gray-400">
                      <p>Type: {doc.type}</p>
                      <p className="mt-1 font-mono break-all">Hash: {doc.hash.slice(0, 20)}...</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="relative flex-1 p-6">
        <header className="mb-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg rounded-xl border border-gray-800/50">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SafXest
          </h1>
        </header>

        <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800/50 p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-blue-400" />
            Upload Document
          </h2>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="file"
                onChange={handleDocumentUpload}
                className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:border-blue-500/50 transition-all duration-300 text-gray-200"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {uploadStatus && (
              <div className="p-2 text-sm text-cyan-400">
                {uploadStatus}
              </div>
            )}

            {fileHash && (
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <p className="text-sm font-mono text-cyan-400 break-all">
                  <strong>File Hash:</strong> {fileHash}
                </p>
              </div>
            )}

            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 focus:border-blue-500/50 transition-all duration-300 text-gray-200"
            >
              <option value="">Select Document Type</option>
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="Image">Image</option>
            </select>

            <button
              onClick={handleSaveDocument}
              disabled={loading || !document}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Save Document"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}