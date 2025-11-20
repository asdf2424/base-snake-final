'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

type Position = { x: number; y: number }
type Direction = { x: number; y: number }

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const directionRef = useRef<Direction>(INITIAL_DIRECTION)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    return newFood
  }, [])

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Duvar çarpışması
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Kendine çarpma
    return body.some((segment) => segment.x === head.x && segment.y === head.y)
  }, [])

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y,
      }

      // Çarpışma kontrolü
      if (checkCollision(newHead, prevSnake)) {
        setGameOver(true)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Yemek yeme kontrolü
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood())
        return newSnake
      }

      // Kuyruğu kısalt
      return newSnake.slice(0, -1)
    })
  }, [food, gameOver, isPaused, gameStarted, checkCollision, generateFood])

  useEffect(() => {
    if (gameStarted && !gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver, isPaused, moveSnake])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted || gameOver) return

    const key = e.key
    const newDirection = { ...directionRef.current }

    switch (key) {
      case 'ArrowUp':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = -1
        }
        break
      case 'ArrowDown':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = 1
        }
        break
      case 'ArrowLeft':
        if (directionRef.current.x === 0) {
          newDirection.x = -1
          newDirection.y = 0
        }
        break
      case 'ArrowRight':
        if (directionRef.current.x === 0) {
          newDirection.x = 1
          newDirection.y = 0
        }
        break
      default:
        return
    }

    directionRef.current = newDirection
    setDirection(newDirection)
  }, [gameStarted, gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood())
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    setGameStarted(true)
  }

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood())
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
    setGameStarted(false)
  }

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused((prev) => !prev)
    }
  }

  const changeDirection = (newDirection: Direction) => {
    if (!gameStarted || gameOver || isPaused) return
    if (
      (newDirection.x !== 0 && directionRef.current.x !== 0) ||
      (newDirection.y !== 0 && directionRef.current.y !== 0)
    ) {
      return
    }
    directionRef.current = newDirection
    setDirection(newDirection)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            🐍 Snake Game
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Score: <span className="text-green-600 dark:text-green-400">{score}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border-4 border-green-500">
          <div
            className="relative bg-gray-900 rounded-lg overflow-hidden"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              margin: '0 auto',
            }}
          >
            {/* Grid */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <div key={i} className="absolute border border-gray-700" style={{
                  top: i * CELL_SIZE,
                  left: 0,
                  right: 0,
                  height: 1,
                }} />
              ))}
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <div key={i} className="absolute border border-gray-700" style={{
                  left: i * CELL_SIZE,
                  top: 0,
                  bottom: 0,
                  width: 1,
                }} />
              ))}
            </div>

            {/* Food */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bg-red-500 rounded-full"
              style={{
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
              }}
            />

            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute rounded ${
                  index === 0
                    ? 'bg-green-400 border-2 border-green-300'
                    : 'bg-green-500'
                }`}
                style={{
                  left: segment.x * CELL_SIZE + (index === 0 ? 1 : 2),
                  top: segment.y * CELL_SIZE + (index === 0 ? 1 : 2),
                  width: CELL_SIZE - (index === 0 ? 2 : 4),
                  height: CELL_SIZE - (index === 0 ? 2 : 4),
                }}
              />
            ))}

            {/* Game Over Overlay */}
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10"
              >
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
                  <p className="text-2xl mb-6">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Start Screen */}
            {!gameStarted && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10"
              >
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Snake Game</h2>
                  <p className="text-lg mb-6">Use arrow keys to play</p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Play className="w-5 h-5" />
                    Start Game
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => changeDirection({ x: 0, y: -1 })}
                className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                disabled={!gameStarted || gameOver || isPaused}
              >
                <ArrowUp className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeDirection({ x: -1, y: 0 })}
                className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                disabled={!gameStarted || gameOver || isPaused}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={togglePause}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                disabled={!gameStarted || gameOver}
              >
                {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </button>
              <button
                onClick={resetGame}
                className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={() => changeDirection({ x: 1, y: 0 })}
                className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                disabled={!gameStarted || gameOver || isPaused}
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeDirection({ x: 0, y: 1 })}
                className="p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                disabled={!gameStarted || gameOver || isPaused}
              >
                <ArrowDown className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Use arrow keys or buttons to control
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

