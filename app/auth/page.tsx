"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import s from "./page.module.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }

    const user = await res.json();
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className={s.container}>
      <h1>Login</h1>
      {error && <p className={s.error}>{error}</p>}
      <input
        className={s.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={s.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={s.btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
