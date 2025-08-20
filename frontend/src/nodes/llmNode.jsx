// llmNode.js
import { Handle, Position } from "reactflow";

export const LLMNode = ({ id }) => {
  return (
    <div className="w-56 rounded-xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-indigo-100 border-b border-indigo-200">
        <span className="text-sm font-semibold text-indigo-700">
          LLM Node
        </span>
      </div>

      {/* Body */}
      <div className="p-3 text-xs space-y-2">
        <p className="text-gray-600">
          This node handles LLM processing and generates responses.
        </p>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: "33%" }}
        className="!w-4 !h-4 bg-white border border-black rounded-full"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: "66%" }}
        className="!w-4 !h-4 bg-white border border-black rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="!w-4 !h-4 bg-white border border-black rounded-full"
      />
    </div>
  );
};
