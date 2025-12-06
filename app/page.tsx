import { Chat } from "@/app/components/chat";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden text-white dark">
      <div className="absolute inset-0 -z-10 h-full w-full bg-grid-pattern"></div>
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 z-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Tanstack AI
          </h1>
          <p className="text-gray-400">Experience the power of AI with a modern interface.</p>
        </div>
        <Chat />
      </main>
    </div>
  );
}
