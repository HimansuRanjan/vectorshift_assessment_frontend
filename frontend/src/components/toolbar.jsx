import { DraggableNode } from "./subComponents/draggableNode";
import { SubmitButton } from "./submit";

// Import Lucide icons
import { LogIn, Cpu, LogOut, StickyNote, Image as ImageIcon, Sigma, Clock, Globe, IdCard } from "lucide-react";

export const PipelineToolbar = () => {
  return (
    <div className="px-3 py-1 bg-white border-b border-gray-200">
      <div className="mt-5 flex flex-wrap items-center justify-between">
        
        {/* Left side - draggable nodes */}
        <div className="flex flex-wrap gap-3">
          <DraggableNode type="customInput" label="Input" icon={LogIn} />
          <DraggableNode type="llm" label="LLM" icon={Cpu} />
          <DraggableNode type="customOutput" label="Output" icon={LogOut} />
          <DraggableNode type="text" label="Text" icon={StickyNote} />

          {/* 5 New Nodes */}
          <DraggableNode type="image" label="Image" icon={ImageIcon} />
          <DraggableNode type="math" label="Math" icon={Sigma} />
          <DraggableNode type="timer" label="Timer" icon={Clock} />
          <DraggableNode type="api" label="API" icon={Globe} />
          <DraggableNode type="uid" label="User Id" icon={IdCard} />
        </div>

        {/* Right side - submit button */}
        <div className="mr-[100px]">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
};
