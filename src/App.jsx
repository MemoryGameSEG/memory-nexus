import React, { useState, useEffect } from 'react';
import GameHUD from './components/GameHUD.jsx';
import Card from './components/Card.jsx';
import ModuleSelector from './components/ModuleSelector.jsx';
import './App.css';
import { playSound, playLoop } from './utils/sound';
import StartScreen from './components/StartScreen.jsx';
import CreditsScreen from './components/CreditsScreen.jsx';

// Import question modules
import module1 from './data/module1.js';
import module2 from './data/module2.js';
import module3 from './data/module3.js';
import module4 from './data/module4.js';
import module5 from './data/module5.js';
import module6 from './data/module6.js';

export default function App() {
  const [step, setStep] = useState("start"); // start | select | game | credits
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [music, setMusic] = useState(null);

  const modules = [module1, module2, module3, module4, module5, module6];

  const prepareCards = (questions) =>
    questions.flatMap((q, i) => [
      { id: i * 2, content: q.question, pairId: i, flipped: false, matched: false },
      { id: i * 2 + 1, content: q.answer, pairId: i, flipped: false, matched: false }
    ]).sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (step === "game" || step === "credits") {
      const m = playLoop('/sounds/bg.mp3');
      setMusic(m);
      setScore(0);
      setSeconds(0);
      return () => m.pause();
    }
  }, [step]);

  useEffect(() => {
    if (step !== "game") return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].pairId === cards[b].pairId && cards[a].id !== cards[b].id) {
        playSound('/sounds/match.mp3');
        setCards(cards =>
          cards.map((card, i) =>
            i === a || i === b ? { ...card, matched: true } : card
          )
        );
        setScore(score => score + 1);
      }

      setTimeout(() => {
        setCards(cards =>
          cards.map((card, i) =>
            i === a || i === b ? { ...card, flipped: false } : card
          )
        );
        setFlipped([]);
      }, 1000);
    }
  }, [flipped]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;
    playSound('/sounds/flip.mp3');
    setCards(cards => cards.map((card, i) =>
      i === index ? { ...card, flipped: true } : card
    ));
    setFlipped([...flipped, index]);
  };

  return (
    <div className="app-container">
      {step === "start" && (
        <StartScreen 
          onNewGame={() => setStep("select")} 
          onCredits={() => setStep("credits")} 
        />
      )}

      {step === "credits" && (
        <CreditsScreen onBack={() => setStep("start")} />
      )}

      {step === "select" && (
        <ModuleSelector
          onSelect={(index) => {
            setCards(prepareCards(modules[index - 1]));
            setStep("game");
          }}
          onBack={() => setStep("start")}
        />
      )}

      {step === "game" && (
        <>
          <div className="hud-with-back">
            <GameHUD score={score} seconds={seconds} />
            <div className="button-group">
              <button className="neon-btn" onClick={() => window.location.reload()}>
                🔙 Quit Game
              </button>
            </div>
          </div>
          <div className="game-area">
            {cards.map((card, i) => (
              <Card
                key={card.id}
                content={card.content}
                isFlipped={card.flipped || card.matched}
                onClick={() => handleCardClick(i)}
              />
            ))}
          </div>
        </>
      )}
    </div> 
  );
}
