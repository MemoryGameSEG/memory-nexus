// src/components/ModuleSelector.jsx
import React from 'react';
import './StartScreen.css';

export default function ModuleSelector({ onSelect, onBack }) {
  return (
    <div className="start-screen">
      <h1 className="glow-title">Choose a Module</h1>
      <div className="button-group">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={num} onClick={() => onSelect(num)}>
            Module {num}
          </button>
        ))}
      </div>
      <div className="button-group">
        <button className="neon-btn" onClick={onBack}>⟵ Back</button>
      </div>
    </div>
  );
}
