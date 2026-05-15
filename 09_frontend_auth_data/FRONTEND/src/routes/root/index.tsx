import { Link, Outlet } from "react-router";

import { Container } from "../../components/ui";
import styles from "./styles.module.css";

export default function Root() {
  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <Container>
          <nav className={styles.root__nav}>
            <Link to="/" className={styles.root__logo}>
              Full Stock
            </Link>
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
