"use client";
import { createFlow } from "../actions/createFlow";
import { Flow } from "./components/Flow/Flow";
import { ReactFlowProvider } from "@xyflow/react";

export default function Page() {
  return (
    <ReactFlowProvider>
      <Flow onCreate={createFlow} />
    </ReactFlowProvider>
  );
}
