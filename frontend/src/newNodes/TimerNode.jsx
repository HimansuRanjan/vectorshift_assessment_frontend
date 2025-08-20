import { TemplateNode } from "../nodes/TemplateNode";

export const TimerNode = ({ id, data }) => (
  <TemplateNode
    id={id}
    data={{
      title: "Active Timer",
      description: "Gives current time input",
      fields: [
        { key: "calcNo1", label: "Current Time", type: "Time" },

      ],
      handles: [
        { type: "target", position: 'Left', id: "inp"},
        { type: "source", position: 'Right', id: "time" }
    ],
    }}
  />
);
