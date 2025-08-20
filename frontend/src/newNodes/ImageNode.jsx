// imageNode.js

import { TemplateNode } from "../nodes/TemplateNode";

export const ImageNode = ({ id }) => (
    <TemplateNode
      id={id}
      data={{
        title: "Image",
        description: "Sample Image Node to take image input.",
        fields: [
            {key: "imageNo",label: "Image", type: "image", default: "Add Image"}
        ],
        handles: [
          { type: "target", position: 'Left', id: "prompt" },
          { type: "source", position: 'Right', id: "response" },
        ],
      }}
    />
  );
  