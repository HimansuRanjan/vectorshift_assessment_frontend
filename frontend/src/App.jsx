import { PipelineToolbar } from "./components/toolbar";
import { PipelineUI } from "./components/ui";

function App() {
  return (
    <div>
      {/* Branding Bar */}
      <div className="px-3 py-3 mx-36 bg-white border-b border-gray-200 flex items-center">
        {/* Logo placeholder (replace with actual logo if available) */}
        <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center text-white font-bold mr-2">
          VS
        </div>
        <span className="text-lg font-semibold text-gray-800 tracking-wide">
          VectorShift Pipeline
        </span>
      </div>

      {/* Toolbar */}
      <PipelineToolbar />

      {/* Main UI */}
      <PipelineUI />
    </div>
  );
}

export default App;
