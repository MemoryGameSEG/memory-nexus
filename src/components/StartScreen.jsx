// src/components/StartScreen.jsx
import React from 'react';
import './StartScreen.css';

export default function StartScreen({ onNewGame, onCredits }) {
  return (
    <div className="start-screen">
      <h1 className="glow-title">Memory Nexus</h1>
      <div className="button-group">
        <button className="neon-btn" onClick={onNewGame}>
           New Game
        </button>
        <button className="neon-btn" disabled>
           Saved Games
        </button>
        <button className="neon-btn" onClick={onCredits}>
           Credits
        </button>
      </div>
    </div>
  );
}
