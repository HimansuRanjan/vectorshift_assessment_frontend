import { TemplateNode } from "../nodes/TemplateNode";

export const APIReqResNode = ({ id, data }) => (
  <TemplateNode
    id={id}
    data={{
      title: "API Managet",
      description: "Take Url and delivers response with efficient Methods",
      fields: [
        { key: "api", label: "Enter URL", type: "text" },
      ],
      handles: [
        { type: "target", position: 'Left', id: "request"},
        { type: "source", position: 'Right', id: "response" }
    ],
    }}
  />
);
