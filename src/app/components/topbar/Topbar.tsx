"use client";

import Link from "next/link";
import styles from "./Topbar.module.css";
import type { ReactNode } from "react";

interface TopbarItem {
  id: string;
  label: string;
  to: string;
}

const topbarItems: TopbarItem[] = [
  { id: "home", label: "Home", to: "/" },
  { id: "create", label: "Create", to: "/create" },
  { id: "saved", label: "Saved mindmaps", to: "/saved" },
];

export const Topbar = (): ReactNode => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {topbarItems.map((item) => (
          <Link key={item.id} href={item.to} className={styles.item}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
