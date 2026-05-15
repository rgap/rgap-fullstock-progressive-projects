import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

import { type User } from "@/models/user.model";
import { getCurrentUser, logout } from "@/services/auth.service";

import { Container } from "../../components/ui";
import styles from "./styles.module.css";

export default function Root() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  function handleLogout() {
    logout();
    setCurrentUser(null);
    navigate("/login");
  }

  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <Container>
          <nav className={styles.root__nav}>
            <Link to="/" className={styles.root__logo}>
              Full Stock
            </Link>
            {currentUser ? (
              <div>
                <span>{currentUser.email}</span>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            ) : (
              <Link to="/login">Iniciar sesión</Link>
            )}
          </nav>
        </Container>
      </header>
      <main className={styles.root__main}>
        <Outlet />
      </main>
      <footer className={styles.root__footer}>
        <Container>
          <small className={styles.root__copyright}>
            Todos los derechos reservados © Full Stock
          </small>
        </Container>
      </footer>
    </div>
  );
}
