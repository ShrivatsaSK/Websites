"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  highlight?: boolean
}

export function Square({ value, onSquareClick, highlight = false }: SquareProps) {
  return (
    <motion.button
      className={cn(
        "w-20 h-20 md:w-24 md:h-24 text-4xl font-bold flex items-center justify-center rounded-lg shadow-md transition-colors",
        value === "X" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : "",
        value === "O" ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : "",
        !value ? "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" : "",
        highlight ? "ring-4 ring-yellow-400 dark:ring-yellow-500" : "",
      )}
      onClick={onSquareClick}
      whileHover={{ scale: value ? 1 : 1.05 }}
      whileTap={{ scale: value ? 1 : 0.95 }}
      initial={value ? { scale: 0.8, opacity: 0 } : {}}
      animate={value ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {value}
    </motion.button>
  )
}

