// textNode.js
import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

const varRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const [leftHandle, setLeftHandle] = useState(false);

  const handleTextChange = (e) => setCurrText(e.target.value);

  useEffect(() => {
    const matches = [...currText.matchAll(varRegex)].map((m) => m[1]); // find potential variables
    //check with inputNodes that it is present or not
    // const validMatches = matches.filter((match) => inputNodes.includes(match));


  }, [currText]);

  return (
    <div className="w-56 rounded-xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-indigo-100 border-b border-indigo-200">
        <span className="text-sm font-semibold text-indigo-700">Text Node</span>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2 text-xs">
        {/* Description */}
        <p className="text-gray-600">Enter or format text for workflow</p>

        {/* Textarea */}
        <textarea
          placeholder="Enter {{input}} to get it"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          className="w-full resize-none overflow-hidden box-border rounded-md border border-gray-300 px-2 py-1 text-sm 
             focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onInput={(e) => {
            e.target.style.height = "auto"; // reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // expand dynamically
          }}
        />
      </div>

      {
      leftHandle && <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        className="!w-4 !h-4 rounded-full bg-transparent border-2 border-indigo-500"
      />
      }

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="!w-4 !h-4 rounded-full bg-transparent border-2 border-indigo-500"
      />
    </div>
  );
};
