"use server";

import prisma from "@/lib/prisma";
import type { Mindmap } from "@/app/types";

export async function getMindmap(id: string) {
  const mindmap = await prisma.mindmap.findUnique({
    where: { id },
  });

  if (!mindmap) throw new Error("Mindmap not found");

  return {
    ...mindmap,
    schema: JSON.parse(mindmap.schema as string),
  } as Mindmap;
}
