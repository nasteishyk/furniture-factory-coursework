"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className={s.base}>
      <div className="container">
        <div className={s.alignment}>
          <h2 className={s.title}>Cozy Nest</h2>

          <nav className={s.nav}>
            {isAdmin && (
              <>
                <Link href="/profile" className={s.navItem}>
                  Profile
                </Link>

                <Link className={s.navItem} href="/admin">
                  Admin Panel
                </Link>

                <button onClick={logout} className={s.logoutBtn}>
                  Logout
                </button>
              </>
            )}

            {!isAdmin && (
              <>
                <Link className={s.navItem} href="/">
                  Home
                </Link>
                <Link className={s.navItem} href="/chairs">
                  Chairs
                </Link>
                <Link className={s.navItem} href="/sofas">
                  Sofas
                </Link>
                <Link className={s.navItem} href="/desks">
                  Desks
                </Link>
                <Link className={s.navItem} href="/cart">
                  Cart
                </Link>

                {user ? (
                  <>
                    <Link href="/profile" className={s.navItem}>
                      Profile
                    </Link>
                    <button onClick={logout} className={s.logoutBtn}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link className={s.navItem} href="/auth/login">
                    LOG IN / SIGN IN
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
