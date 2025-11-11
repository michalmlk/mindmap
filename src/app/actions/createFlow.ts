"use server";

import type { Schema } from "@/app/types";

export const createFlow = async (schema: Schema): Promise<void> => {
  // Send the schema to the backend or perform any other action
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(schema);
      resolve();
    }, 1000);
  });
};
