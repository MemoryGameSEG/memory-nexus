import React from 'react';
import './GameHUD.css';

export default function GameHUD({ score, seconds }) {
  const formatTime = s => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="game-hud">
      <div className="hud-item"> Time: {formatTime(seconds)}</div>
      <div className="hud-item"> Score: {score}</div>
    </div>
  );
}
