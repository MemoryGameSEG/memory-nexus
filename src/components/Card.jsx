import React from 'react';
import './Card.css';

export default function Card({ content, isFlipped, onClick }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{content}</div>
      </div>
    </div>
  );
}
