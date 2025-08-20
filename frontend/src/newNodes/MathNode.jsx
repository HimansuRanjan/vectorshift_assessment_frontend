import { TemplateNode } from "../nodes/TemplateNode";

export const MathNode = ({ id, data }) => (
  <TemplateNode
    id={id}
    data={{
      title: "Calculate",
      description: "Custom Node for Mathematical Operations",
      fields: [
        { key: "calcNo1", label: "First Number", type: "number" },
        { key: "operator", type: "select", default: "+", options: ["+", "-", "*", "/", "%"] },
        { key: "calcNo2", label: "Seconf Number", type: "number" },
      ],
      handles: [
        { type: "target", position: 'Left', id: "num1", style: { top: "33%" } },
        { type: "target", position: 'Left', id: "num2", style: { top: "66%" } },
        { type: "source", position: 'Right', id: "ans" }
    ],
    }}
  />
);
