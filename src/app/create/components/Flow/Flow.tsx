"use client";

import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  OnConnectEnd,
} from "@xyflow/react";
import { useCallback, useRef } from "react";
import styles from "./Flow.module.css";
import { Button } from "@/app/components/button/Button";

import { useRouter } from "next/navigation";
import type { Schema, Node, Edge } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_NODE_WIDTH } from "@/app/constants";

const initialNodes: Node[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

interface FlowProps {
  onCreate: (schema: Schema) => Promise<void>;
}

export const Flow = ({ onCreate }: FlowProps) => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const flowWrapperRef = useRef<HTMLDivElement>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [setEdges],
  );

  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const onHandleCreate = async (): Promise<void> => {
    const schema = {
      nodes,
      edges,
    };

    // Send the schema to the backend or perform any other action
    await onCreate(schema);
  };

  const { screenToFlowPosition } = useReactFlow();

  const onConnectEnd: OnConnectEnd = (event, params): void => {
    const { fromNode } = params;

    const graphPosition = screenToFlowPosition({
      x: (event as MouseEvent).clientX,
      y: (event as MouseEvent).clientY,
    });

    if (!flowWrapperRef.current || !fromNode) {
      return;
    }

    const reactFlowBounds = flowWrapperRef.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    const newNodeId = uuidv4();

    const newNode = {
      id: newNodeId,
      position: {
        x: graphPosition.x - DEFAULT_NODE_WIDTH / 2,
        y: graphPosition.y,
      },
      data: { label: "New Node" },
    };

    const newEdge = {
      id: uuidv4(),
      source: fromNode.id,
      target: newNodeId,
    };
    setNodes((nodesSnapshot) => [...nodesSnapshot, newNode]);
    setEdges((edgesSnapshot) => [...edgesSnapshot, newEdge]);
  };

  return (
    <>
      <div className={styles.flowContainer}>
        <ReactFlow
          ref={flowWrapperRef}
          className={styles.flow}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
          panOnScroll={false}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <footer className={styles.footer}>
        <Button label="Back" onClick={handleBack} />
        <Button label="Save" primary onClick={onHandleCreate} />
      </footer>
    </>
  );
};
