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
import type { Schema } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_NODE_WIDTH } from "@/app/constants";
import type { CreateFlowParams } from "@/app/actions/createFlow";

type FlowProps =
  | {
      type: "create";
      onCreate: (params: CreateFlowParams) => Promise<void>;
      initialSchema: Schema;
      className?: string;
    }
  | {
      type: "save";
      onSave: (schema: Schema, id: string) => Promise<void>;
      initialSchema: Schema;
      id: string;
      className?: string;
    };

export const Flow = (props: FlowProps) => {
  const { initialSchema, type } = props;

  const [nodes, setNodes] = useNodesState(initialSchema.nodes);
  const [edges, setEdges] = useEdgesState(initialSchema.edges);

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

  const onSaveAction = async (): Promise<void> => {
    const schema = {
      nodes,
      edges,
    };

    // Send the schema to the backend or perform any other action
    //
    if (type === "save") {
      await props.onSave(schema, props.id);
    } else if (type === "create") {
      await props.onCreate({
        schema,
        title: "New Flow",
        userId: "michalmlk",
      });
    }
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
      <div className={`${styles.flowContainer} ${props.className}`}>
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
        <Button label="Save" primary onClick={onSaveAction} />
      </footer>
    </>
  );
};
