"use server";

import type { Schema } from "@/app/types";
import prisma from "@/lib/prisma";

export async function saveSchema(schema: Schema, id: string): Promise<void> {
  // Implementation to save the mindmap schema

  await prisma.mindmap.update({
    where: { id },
    data: { schema: JSON.stringify(schema) },
  });
}
