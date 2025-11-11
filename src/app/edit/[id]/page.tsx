"use client";

import type { Mindmap } from "@/app/types";
import styles from "./page.module.css";
import { Flow } from "@/app/components/Flow/Flow";
import { getMindmap } from "@/app/actions/getMindmap";
import { saveSchema } from "@/app/actions/saveSchema";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Button } from "@/app/components/button/Button";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();

  const [mindmap, setMindmap] = useState<Mindmap | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const mindmap = await getMindmap(id);
      return mindmap;
    }

    fetchData().then((mindmap) => {
      console.log(mindmap);
      setMindmap(mindmap as unknown as Mindmap);
    });
  }, [id]);

  if (!mindmap) {
    return <div>Loading...</div>;
  }

  const handleToggleDetails = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      <ReactFlowProvider>
        {isDetailsOpen && (
          <div className={styles.details}>{/* Details content */}</div>
        )}
        <div className={styles.header}>
          <h2 className={styles.h2}>{mindmap.title}</h2>
          <div className={styles.actions}>
            <button type="button" onClick={handleToggleDetails}>
              Edit details
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <Flow
            type="save"
            initialSchema={mindmap.schema}
            onSave={saveSchema}
            id={mindmap.id}
            className={styles.editFlowContainer}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
