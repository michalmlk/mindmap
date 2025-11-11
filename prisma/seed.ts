import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const mindmaps = [
  {
    id: "1",
    title: "My First Mindmap",
    createdAt: new Date(),
    createdBy: "michalmlk",
    updatedAt: new Date(),
    schema: {
      nodes: [
        {
          id: "n1",
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: "Node 1",
          },
          measured: {
            width: 150,
            height: 36,
          },
        },
        {
          id: "n2",
          position: {
            x: 0,
            y: 100,
          },
          data: {
            label: "Node 2",
          },
          measured: {
            width: 150,
            height: 36,
          },
        },
        {
          id: "0decd83c-9b7a-4dd2-9b8c-c44e7d377123",
          position: {
            x: -174,
            y: 183.25,
          },
          data: {
            label: "New Node",
          },
          measured: {
            width: 150,
            height: 36,
          },
        },
        {
          id: "1bc881bc-8328-466e-b038-6ea173d6f3ca",
          position: {
            x: 17,
            y: 299.75,
          },
          data: {
            label: "New Node",
          },
          measured: {
            width: 150,
            height: 36,
          },
          selected: true,
          dragging: false,
        },
      ],
      edges: [
        {
          id: "n1-n2",
          source: "n1",
          target: "n2",
        },
        {
          id: "ef3c58b2-9eb3-471a-ac2f-d23839836503",
          source: "n2",
          target: "0decd83c-9b7a-4dd2-9b8c-c44e7d377123",
        },
        {
          id: "788fb64a-c798-487f-97e9-35807ec93091",
          source: "0decd83c-9b7a-4dd2-9b8c-c44e7d377123",
          target: "1bc881bc-8328-466e-b038-6ea173d6f3ca",
        },
      ],
    },
  },
];

export async function main() {
  for (const m of mindmaps) {
    await prisma.mindmap.create({ data: m });
  }
}

main();
