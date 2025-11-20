"use client"; // Client Side'da çalışması için zorunlu direktif

import { useState, useEffect, useCallback } from "react";
import { Rocket, RefreshCw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

// Game Settings
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export default function Home() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, 1]); // [x, y]
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Spawn Food
  const spawnFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
    // Ensure food doesn't spawn on the snake
    if (snake.some((segment) => segment[0] === newFood[0] && segment[1] === newFood[1])) {
        spawnFood();
        return;
    }
    setFood(newFood);
  }, [snake]);

  // Reset Game
  const resetGame = () => {
    setSnake([[5, 5]]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    spawnFood();
  };

  // Direction Handler (Prevents 180 degree turns)
  const changeDirection = useCallback((newDir: number[]) => {
    setDirection((currentDir) => {
      // Prevent reversing into self (e.g., can't go up if moving down)
      if (currentDir[0] !== 0 && newDir[0] === -currentDir[0]) return currentDir;
      if (currentDir[1] !== 0 && newDir[1] === -currentDir[1]) return currentDir;
      return newDir;
    });
  }, []);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": changeDirection([0, -1]); break;
        case "ArrowDown": changeDirection([0, 1]); break;
        case "ArrowLeft": changeDirection([-1, 0]); break;
        case "ArrowRight": changeDirection([1, 0]); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prev) => {
        const newHead = [prev[0][0] + direction[0], prev[0][1] + direction[1]];

        // Collision Check (Walls or Self)
        if (
          newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
          prev.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Eat Food?
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 1);
          spawnFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(moveSnake);
  }, [direction, gameOver, isPaused, food, score, highScore, spawnFood]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-2 font-mono select-none">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 flex items-center justify-center gap-2">
          <Rocket className="w-8 h-8" /> BASE SNAKE
        </h1>
        <p className="text-gray-400 text-sm mt-1">Mini App Built on Base</p>
      </div>

      {/* Score Board */}
      <div className="flex gap-4 mb-4 text-lg">
        <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800">
          Score: <span className="text-blue-400 font-bold">{score}</span>
        </div>
        <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          Best: <span className="text-yellow-500 font-bold">{highScore}</span>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-neutral-900 border-4 border-blue-900 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 mx-auto"
        style={{ 
          width: Math.min(GRID_SIZE * CELL_SIZE, 350), 
          height: Math.min(GRID_SIZE * CELL_SIZE, 350)
        }}
      >
        <div style={{ 
           transform: `scale(${Math.min(350 / (GRID_SIZE * CELL_SIZE), 1)})`, 
           transformOrigin: 'top left',
           width: GRID_SIZE * CELL_SIZE,
           height: GRID_SIZE * CELL_SIZE
        }}>
          
          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-20">
              <h2 className="text-3xl font-bold text-red-500 mb-4">GAME OVER!</h2>
              <button 
                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95"
              >
                <RefreshCw className="w-5 h-5" /> Play Again
              </button>
            </div>
          )}

          {/* Snake */}
          {snake.map((segment, i) => (
            <div
              key={i}
              className="absolute bg-blue-500 rounded-sm"
              style={{
                left: segment[0] * CELL_SIZE,
                top: segment[1] * CELL_SIZE,
                width: CELL_SIZE - 1,
                height: CELL_SIZE - 1,
                opacity: i === 0 ? 1 : 0.7
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"
            style={{
              left: food[0] * CELL_SIZE,
              top: food[1] * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
            }}
          />
        </div>
      </div>

      {/* MOBILE CONTROLS (D-PAD) */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <div /> {/* Empty Slot */}
        <button 
          className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center active:bg-blue-600 transition-colors border border-neutral-700"
          onClick={() => changeDirection([0, -1])}
          aria-label="Up"
        >
          <ArrowUp className="w-8 h-8" />
        </button>
        <div /> {/* Empty Slot */}

        <button 
          className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center active:bg-blue-600 transition-colors border border-neutral-700"
          onClick={() => changeDirection([-1, 0])}
          aria-label="Left"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>

        <button 
          className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center active:bg-blue-600 transition-colors border border-neutral-700"
          onClick={() => changeDirection([0, 1])}
          aria-label="Down"
        >
          <ArrowDown className="w-8 h-8" />
        </button>

        <button 
          className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center active:bg-blue-600 transition-colors border border-neutral-700"
          onClick={() => changeDirection([1, 0])}
          aria-label="Right"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
      
      <div className="mt-4 text-gray-600 text-xs">
        Use on-screen buttons or keyboard
      </div>
    </div>
  );
}