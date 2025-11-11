"use client";
import { createFlow } from "../actions/createFlow";
import { Flow } from "@/app/components/Flow/Flow";
import { ReactFlowProvider } from "@xyflow/react";
import type { Schema, Node, Edge } from "@/app/types";

const initialNodes: Node[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

const initialSchema: Schema = {
  nodes: initialNodes,
  edges: initialEdges,
};

export default function Page() {
  return (
    <ReactFlowProvider>
      <Flow onCreate={createFlow} initialSchema={initialSchema} type="create" />
    </ReactFlowProvider>
  );
}
