import { TemplateNode } from "../nodes/TemplateNode";

export const IdgeneratorNode = ({ id, data }) => (
  <TemplateNode
    id={id}
    data={{
      title: "Random User Id Generator",
      description: "Generates random user Id for Primary Key",
      fields: [
        { key: "uid", label: "User Id", type: "uid" },
        
      ],
      handles: [
        { type: "target", position: 'Left', id: "input" },
        { type: "source", position: 'Right', id: "output" }
    ],
    }}
  />
);
