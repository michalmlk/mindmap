import Link from "next/link";
import { getMindmaps } from "../actions/getMindmaps";
import styles from "./page.module.css";

export default async function SavedPage() {
  const mindmaps = await getMindmaps();

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Saved Mindmaps</h1>
        <ul className={styles.list}>
          {mindmaps.map((mindmap) => (
            <li key={mindmap.id} className={styles.listItem}>
              <span>{mindmap.title}</span>
              <Link
                href={`/edit/${mindmap.id}`}
                key={mindmap.id}
                className={styles.link}
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
