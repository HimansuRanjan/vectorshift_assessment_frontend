// outputNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Info } from "lucide-react";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <div className="w-56 rounded-xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-indigo-100 border-b border-indigo-200">
        <span className="text-sm font-semibold text-indigo-700">Output</span>
      </div>

      {/* Body */}
      <div className="p-3 space-y-3 text-xs">
        {/* Description */}
        <p className="text-gray-600">
          Output data of different types from your workflow
        </p>

        {/* Output Name */}
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Type Selector */}
        <div className="space-y-1">
          <label className="flex items-center text-gray-700 text-xs font-medium">
            Type
            <Info className="w-3 h-3 ml-1 text-gray-400" />
          </label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>

      {/* Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="!w-4 !h-4 rounded-full bg-transparent border-2 border-indigo-500"
      />
    </div>
  );
};
