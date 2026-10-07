'use client';

import { useState } from "react";

export default function ServerMessage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMessage() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/message");

      // kontrollime, kas päring õnnestus
      if (!res.ok) {
        throw new Error("Päring ebaõnnestus");
      }

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setError("Viga: sõnumit ei saanud laadida");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={loadMessage} disabled={loading}>
        Load server message
      </button>
      {loading && <p>Laen...</p>}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
