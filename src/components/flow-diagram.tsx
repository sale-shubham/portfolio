import type { FlowNode } from "@/data/profile";

type Box = FlowNode & { x: number; y: number; w: number; h: number; key: string };
type Layout = { width: number; height: number; stages: Box[][] };

const NODE_H = 48;

function horizontal(flow: FlowNode[][]): Layout {
  const width = 720;
  const nodeW = 156;
  const colGap = (width - flow.length * nodeW) / (flow.length - 1);
  const rowGap = 10;
  const height = Math.max(...flow.map((stage) => stage.length * NODE_H + (stage.length - 1) * rowGap));
  const stages = flow.map((stage, c) => {
    const stageH = stage.length * NODE_H + (stage.length - 1) * rowGap;
    const top = (height - stageH) / 2;
    return stage.map((node, r) => ({
      ...node,
      key: `${c}-${r}`,
      x: c * (nodeW + colGap),
      y: top + r * (NODE_H + rowGap),
      w: nodeW,
      h: NODE_H,
    }));
  });
  return { width, height, stages };
}

function vertical(flow: FlowNode[][]): Layout {
  const width = 340;
  const colGap = 8;
  const rowGap = 30;
  const stages = flow.map((stage, r) => {
    const w = (width - (stage.length - 1) * colGap) / stage.length;
    return stage.map((node, c) => ({
      ...node,
      key: `${r}-${c}`,
      x: c * (w + colGap),
      y: r * (NODE_H + rowGap),
      w,
      h: NODE_H,
    }));
  });
  return { width, height: flow.length * NODE_H + (flow.length - 1) * rowGap, stages };
}

function edgePath(from: Box, to: Box, dir: "h" | "v") {
  if (dir === "h") {
    const x1 = from.x + from.w, y1 = from.y + from.h / 2;
    const x2 = to.x - 3, y2 = to.y + to.h / 2;
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  const x1 = from.x + from.w / 2, y1 = from.y + from.h;
  const x2 = to.x + to.w / 2, y2 = to.y - 3;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
}

export function describeFlow(flow: FlowNode[][], label: string) {
  return `${label}: ${flow.map((stage) => stage.map((n) => `${n.title} (${n.detail})`).join(" or ")).join(", then ")}.`;
}

type SvgProps = { flow: FlowNode[][]; dir: "h" | "v"; id: string; label: string; className?: string };

/** One orientation of a project's flow. Animated edges run while an ancestor with `.flow-host` is hovered or focused. */
export function FlowSvg({ flow, dir, id, label, className = "" }: SvgProps) {
  const layout = dir === "h" ? horizontal(flow) : vertical(flow);
  const pad = 2;
  const edges: string[] = [];
  layout.stages.forEach((stage, i) => {
    const next = layout.stages[i + 1];
    if (!next) return;
    for (const from of stage) for (const to of next) edges.push(edgePath(from, to, dir));
  });
  const markerId = `arrow-${id}-${dir}`;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${layout.width + pad * 2} ${layout.height + pad * 2}`}
      className={`flow ${className}`}
      role="img"
      aria-label={describeFlow(flow, label)}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.5 7.5 4 0 7.5z" className="flow-arrow" />
        </marker>
      </defs>
      {edges.map((d, i) => (
        <g key={i}>
          <path d={d} className="flow-edge" markerEnd={`url(#${markerId})`} />
          <path d={d} className="flow-pulse" />
        </g>
      ))}
      {layout.stages.flat().map((node) => (
        <g key={node.key}>
          <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="8" className="flow-node" />
          <text x={node.x + 12} y={node.y + 20} className="flow-title">
            {node.title}
          </text>
          <text x={node.x + 12} y={node.y + 37} className="flow-detail">
            {node.detail}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Horizontal on wider screens, vertical on phones. */
export function FlowDiagram({ id, flow, label }: { id: string; flow: FlowNode[][]; label: string }) {
  return (
    <>
      <FlowSvg flow={flow} dir="h" id={`${id}-wide`} label={label} className="hidden w-full sm:block" />
      <FlowSvg flow={flow} dir="v" id={`${id}-narrow`} label={label} className="mx-auto block w-full max-w-[420px] sm:hidden" />
    </>
  );
}
