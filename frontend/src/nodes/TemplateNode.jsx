import { useState } from "react";
import { Handle, Position } from "reactflow";

/**
 * TemplateNode abstraction for all node types
 *
 * @param id - node id
 * @param data - { title, description, fields, handles }
 *   fields = [{ key, label, type, default }]
 *   handles = [{ type, position, id, style }]
 */

export const TemplateNode = ({ id, data }) => {
  const { title, description, fields = [], handles = [] } = data;

  // state for fields
  const [values, setValues] = useState(
    fields.reduce((acc, f) => {
      acc[f.key] = data[f.key] || f.default || "";
      return acc;
    }, {})
  );

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  // field renderer
  const renderTask = (f) => {
    switch (f.type) {
      case "select":
        return (
          <select
            value={values[f.key]}
            onChange={(e) => handleChange(f.key, e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            {f.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );

      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            placeholder={f.default}
            onChange={(e) => handleChange(f.key, e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-600"
          />
        );

      case "normalText":
        return (
          <textarea
            value={values[f.key]}
            onChange={(e) => handleChange(f.key, e.target.value)}
            placeholder={f.placeholder || "Enter text..."}
            rows={2}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={values[f.key]}
            onChange={(e) => handleChange(f.key, e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        );
      case "Time":
        return (
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={values[f.key] || new Date().toLocaleTimeString()}
              className="w-32 rounded-md border border-gray-300 px-2 py-1 text-sm 
                       bg-gray-100 text-gray-700 font-mono tracking-wide"
            />
            <button
              type="button"
              onClick={() =>
                handleChange(f.key, new Date().toLocaleTimeString())
              }
              className="px-2 py-1 text-xs rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Refresh
            </button>
          </div>
        );

        case "uid":
            return (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={
                    values[f.key] ||
                    Math.random().toString(36).substring(2, 10) // random 8-char UID
                  }
                  className="flex-1 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm 
                             bg-gray-100 text-gray-700 font-mono tracking-wide"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleChange(f.key, Math.random().toString(36).substring(2, 10))
                  }
                  className="shrink-0 px-2 py-1 text-xs rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                >
                  Refresh
                </button>
              </div>
            );
          

      default:
        return (
          <input
            type="text"
            value={values[f.key]}
            onChange={(e) => handleChange(f.key, e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        );
    }
  };

  return (
    <div className="w-56 rounded-xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden">
      {/* Title */}
      <div className="px-3 py-2 bg-indigo-100 border-b border-indigo-200">
        <div className="text-sm font-semibold text-indigo-700">{title}</div>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Fields */}
      <div className="p-3 space-y-3">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              {f.label}
            </label>
            {renderTask(f)}
          </div>
        ))}
      </div>

      {/* Handles */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position === "Right" ? Position.Right : Position.Left}
          id={`${id}-${h.id}`}
          className="!w-4 !h-4 bg-white border border-black rounded-full"
          style={h.style}
        />
      ))}
    </div>
  );
};
