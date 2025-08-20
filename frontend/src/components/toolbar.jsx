import { DraggableNode } from "./subComponents/draggableNode";
import { SubmitButton } from "./submit";

export const PipelineToolbar = () => {
  return (
    <div className="p-3 bg-white border-b border-gray-200">
      <div className="mt-5 flex flex-wrap items-center justify-between">
        {/* Left side - draggable nodes */}
        <div className="flex flex-wrap gap-3">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />

           {/* 5 New Nodes  */}
          <DraggableNode type="image" label="Image" />
          <DraggableNode type="math" label="Math" />
          <DraggableNode type="timer" label="Timer" />
          <DraggableNode type="api" label="API" />
          <DraggableNode type="uid" label="User Id" />

        </div>

        {/* Right side - submit button with margin */}
        <div className="mr-[100px]">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};
