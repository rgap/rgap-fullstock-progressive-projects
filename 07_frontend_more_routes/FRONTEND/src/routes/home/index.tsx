import { Container } from "../../components/ui";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <Container>
      <section className={styles.hero}>
        <h1 className={styles.hero__title}>Bienvenido a Full Stock</h1>
        <p className={styles.hero__text}>
          La tienda de productos para desarrolladores web.
        </p>
      </section>
    </Container>
  );
}
