export default function Home() {
  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-gray-400">Ask anything about your system...</p>
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-lg bg-gray-900 p-3 outline-none"
        />
      </div>
    </div>
  );
}
