import React, { useState } from 'react';
import './PDFUploader.css';

export default function PDFUploader({ onSubmit }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a PDF first.");

    const formData = new FormData();
    formData.append('pdf', file);

    const res = await fetch('https://1bc3-34-70-8-126.ngrok-free.app/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    onSubmit(data.questions); // callback with AI-generated questions
  };

  return (
    <div className="pdf-uploader">
      <input type="file" accept="application/pdf" onChange={handleChange} />
      <button onClick={handleUpload}>Upload & Generate Questions</button>
    </div>
  );
}
