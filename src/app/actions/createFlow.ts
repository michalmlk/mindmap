"use server";
import prisma from "@/lib/prisma";

import type { Schema } from "@/app/types";

export interface CreateFlowParams {
  schema: Schema;
  userId: string;
  title: string;
}

export const createFlow = async ({
  schema,
  userId,
  title,
}: CreateFlowParams): Promise<void> => {
  // Send the schema to the backend or perform any other action
  await prisma.mindmap.create({
    data: {
      title: title,
      createdAt: new Date(),
      createdBy: userId,
      updatedAt: new Date(),
      schema: JSON.stringify(schema),
    },
  });
};
