import React, { useState } from 'react';
import { extractTextFromPDF } from '../utils/extractTextFromPDF';

export default function UploadPDF({ onExtracted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      onExtracted(text); // Send the extracted text to App.jsx or parent
    } catch (err) {
      console.error(err);
      setError('Failed to extract text from PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Lecture PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {loading && <p>Extracting text...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
