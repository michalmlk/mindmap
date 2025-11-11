import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.h1}>Welcome to the Mindmap</h1>
        <p className={styles.p}>
          Mindmap is a tool for creating and sharing mind maps.
        </p>
        <Link href="/create" className={styles.getStarted}>
          Get started
        </Link>
      </div>
    </div>
  );
}
