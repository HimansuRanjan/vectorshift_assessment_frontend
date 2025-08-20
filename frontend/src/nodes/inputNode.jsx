// inputNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <div className="w-56 rounded-xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-indigo-100 border-b border-indigo-200">
        <span className="text-sm font-semibold text-indigo-700">Input</span>
      </div>

      {/* Body */}
      <div className="p-3 space-y-3 text-xs">
        <p className="text-gray-600">
          Pass data of different types into your workflow
        </p>

        {/* Input Name */}
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm 
                     bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Type Selector */}
        <div className="space-y-1">
          <label className="flex items-center text-gray-700 text-xs font-medium">
            Type
          </label>
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm 
                       bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="!w-4 !h-4 bg-white border border-black rounded-full"
      />
    </div>
  );
};
