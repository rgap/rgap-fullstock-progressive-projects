import { Link } from "react-router";

import { Button, Container } from "../../components/ui";
import styles from "./styles.module.css";

export default function NotFound() {
  return (
    <Container>
      <section className={styles["not-found"]}>
        <p className={styles["not-found__code"]}>404</p>
        <h1 className={styles["not-found__title"]}>Página no encontrada</h1>
        <p className={styles["not-found__description"]}>
          No pudimos encontrar la página que estás buscando.
        </p>
        <Button asChild size="xl">
          <Link to="/">Regresar al inicio</Link>
        </Button>
      </section>
    </Container>
  );
}
