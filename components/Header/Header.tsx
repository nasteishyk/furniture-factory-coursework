"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import s from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className={s.base}>
      <div className="container">
        <div className={s.alignment}>
          <Link href="/">
            <h2 className={s.title}>Cozy Nest</h2>
          </Link>
          <nav className={s.nav}>
            <Link href="/" className={s.navItem}>
              Home
            </Link>
            <Link href="/chairs" className={s.navItem}>
              Chairs
            </Link>
            <Link href="/sofas" className={s.navItem}>
              Sofas
            </Link>
            <Link href="/desks" className={s.navItem}>
              Desks
            </Link>
            <Link href="/cart" className={s.navItem}>
              Cart
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className={s.navItem}>
                    Admin
                  </Link>
                )}
                <span className={s.navItem}>{user.name}</span>
                <button className={s.navBtn} onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className={s.navItem}>
                Change role
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
