"use client"

import { useState } from "react"
import { Square } from "./square"
import { MoveHistory } from "./move-history"
import { ThemeToggle } from "./theme-toggle"
import confetti from "canvas-confetti"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 })
  const [gameEnded, setGameEnded] = useState(false)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

    // Check if game ended
    const winner = calculateWinner(nextSquares)
    if (winner || nextSquares.every((square) => square !== null)) {
      setGameEnded(true)

      // Update scores
      if (winner) {
        setScores((prev) => ({
          ...prev,
          [winner]: prev[winner as keyof typeof prev] + 1,
        }))

        // Trigger confetti for winner
        triggerConfetti()
      } else if (nextSquares.every((square) => square !== null)) {
        setScores((prev) => ({
          ...prev,
          ties: prev.ties + 1,
        }))
      }
    }
  }

  const jumpTo = (move: number) => {
    setCurrentMove(move)
    if (move < history.length - 1) {
      setGameEnded(false)
    } else {
      const winner = calculateWinner(history[move])
      setGameEnded(!!winner || history[move].every((square) => square !== null))
    }
  }

  const resetGame = () => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setGameEnded(false)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex justify-between w-full">
          <div className="text-lg font-semibold text-primary">
            {!gameEnded ? (
              <span>
                Next player: <span className="text-xl">{xIsNext ? "X" : "O"}</span>
              </span>
            ) : (
              <span>
                {calculateWinner(currentSquares) ? `Winner: ${calculateWinner(currentSquares)}` : "It's a tie!"}
              </span>
            )}
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {currentSquares.map((value, i) => (
            <Square
              key={i}
              value={value}
              onSquareClick={() => {
                if (gameEnded || currentSquares[i]) return
                const nextSquares = currentSquares.slice()
                nextSquares[i] = xIsNext ? "X" : "O"
                handlePlay(nextSquares)
              }}
              highlight={calculateWinner(currentSquares) && calculateWinnerLine(currentSquares)?.includes(i)}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-center">
            <div className="text-sm text-blue-600 dark:text-blue-300">X Score</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">{scores.X}</div>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg text-center">
            <div className="text-sm text-red-600 dark:text-red-300">O Score</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-200">{scores.O}</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600 dark:text-gray-300">Ties</div>
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">{scores.ties}</div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          New Game
        </button>
      </div>

      <div className="flex-1 md:max-w-xs">
        <MoveHistory history={history} currentMove={currentMove} onJumpTo={jumpTo} />
      </div>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateWinnerLine(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]
    }
  }
  return null
}

