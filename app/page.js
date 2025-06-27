"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "🍔 Hi! I'm BurgerBot. What kind of burger would you like today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Show "typing..." while waiting for response
    setMessages((prev) => [...newMessages, { role: "bot", text: "..." }]);

    // Later we'll replace this with GPT response
    const reply = "Okay! One moment while I prepare your burger 🍟";

    // Replace "..." with actual reply
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === prev.length - 1 ? { role: "bot", text: reply } : msg
      )
    );
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🍔 Welcome to BurgerBot-GPT!</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "1rem",
          marginTop: "1rem",
          height: "400px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        <input
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "5px 0 0 5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Type your burger order..."
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </main>
  );
}