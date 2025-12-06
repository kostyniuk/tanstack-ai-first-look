import { Chat } from "@/app/components/chat";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold">Tanstack AI First Look 🥳</h1>
        <Chat className="w-full max-w-3xl mt-10" />
      </main>
    </div>
  );
}
