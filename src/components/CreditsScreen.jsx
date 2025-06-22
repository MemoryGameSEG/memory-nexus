// src/components/CreditsScreen.jsx
import React from 'react';
import './StartScreen.css';

export default function CreditsScreen({ onBack }) {
  return (
    <div className="start-screen">
      <h1 className="glow-title">Credits</h1>
      <div className="credits-text">
        <p>🧠 Game Design: Ralph and Justin</p>
        <p>💻 Programming: Ralph and Justin</p>
        <p>🎵 Sound FX: Zapsplat & FreeSound</p>
        <p>📚 Content: University of Ottawa – SEG3525</p>
        <p>✨ Built with React, Vite & Passion</p>
      </div>
      <div className="button-group">
        <button className="neon-btn" onClick={onBack}>⟵ Back</button>
      </div>
    </div>
  );
}
