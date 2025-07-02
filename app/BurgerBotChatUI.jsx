"use client";
import { useState } from "react";

export default function BurgerBotChatUI() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "🍔 Hi! I'm BurgerBot. What kind of burger would you like today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Show loading indicator
    setMessages((prev) => [...prev, { role: "bot", text: "🤖 Typing..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful burger restaurant assistant named BurgerBot. Keep responses short and fun." },
            ...messages.map((msg) => ({
              role: msg.role === "bot" ? "assistant" : "user",
              content: msg.text,
            })),
            userMessage,
          ],
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: "❌ Sorry, something went wrong!" },
      ]);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "10px", minHeight: "200px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your order..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleSend} style={{ padding: "0.5rem 1rem" }}>
          Send
        </button>
      </div>
    </div>
  );
}