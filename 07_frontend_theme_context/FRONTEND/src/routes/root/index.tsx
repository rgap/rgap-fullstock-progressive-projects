import { Link, Outlet } from "react-router";

import { Button, Container } from "../../components/ui";
import { useTheme } from "../../contexts/theme.context";
import styles from "./styles.module.css";

export default function Root() {
  // userTheme es un custom hook que nos permite obtener el tema
  // y el método para cambiarlo
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <Container>
          <nav className={styles.root__nav}>
            <Link to="/" className={styles.root__logo}>
              Full Stock
            </Link>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </Button>
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
