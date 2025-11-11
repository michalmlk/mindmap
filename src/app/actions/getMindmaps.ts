"use server";

import type { Mindmap } from "@/app/types";
import prisma from "@/lib/prisma";

export const getMindmaps = async (): Promise<Mindmap[]> => {
  const mindmaps = await prisma.mindmap.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      schema: true,
    },
  });

  if (!mindmaps) {
    throw new Error("No mindmaps found");
  }

  return mindmaps.map((mindmap) => ({
    ...mindmap,
    schema: mindmap.schema ? JSON.parse(JSON.stringify(mindmap.schema)) : {},
  })) as Mindmap[];
};
