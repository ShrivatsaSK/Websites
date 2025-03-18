"use client"

import { motion } from "framer-motion"

interface MoveHistoryProps {
  history: (string | null)[][]
  currentMove: number
  onJumpTo: (move: number) => void
}

export function MoveHistory({ history, currentMove, onJumpTo }: MoveHistoryProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4 text-primary">Game History</h2>

      <motion.ol
        className="space-y-2 max-h-[400px] overflow-y-auto pr-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {history.map((_, move) => {
          const description = move === 0 ? "Go to game start" : `Go to move #${move}`

          return (
            <motion.li key={move} variants={item}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  currentMove === move
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => onJumpTo(move)}
              >
                {description}
              </button>
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}

