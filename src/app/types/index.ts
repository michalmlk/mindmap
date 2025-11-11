export interface Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label?: string;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Schema {
  nodes: Node[];
  edges: Edge[];
}

export interface Mindmap {
  id: string;
  title: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  schema: Schema;
}
