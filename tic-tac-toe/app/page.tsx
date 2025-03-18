import Game from "@/components/game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Tic Tac Toe</h1>
      <Game />
    </main>
  )
}

