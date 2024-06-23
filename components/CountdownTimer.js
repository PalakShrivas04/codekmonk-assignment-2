import { useState, useEffect } from 'react';
import "../styles/globals.css"

const CountdownTimer = () => {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, time]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Countdown Timer</h1>
      <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
      <div className="space-x-4">
        {!isActive && (
          <button className="btn" onClick={startTimer}>
            Start
          </button>
        )}
        {isActive && !isPaused && (
          <button className="btn" onClick={pauseTimer}>
            Pause
          </button>
        )}
        {isActive && isPaused && (
          <button className="btn" onClick={resumeTimer}>
            Resume
          </button>
        )}
        <button className="btn" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
