"use client";
import BurgerBotChatUI from './BurgerBotChatUI';
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
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>🍔 Welcome to BurgerBot-GPT!</h1>
      <BurgerBotChatUI />
    </main>
  );
}