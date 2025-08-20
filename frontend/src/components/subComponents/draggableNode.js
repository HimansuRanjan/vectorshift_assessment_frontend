// draggableNode.jsx
export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="cursor-grab min-w-[90px] h-[80px] flex flex-col items-center justify-center 
                 rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {/* Icon */}
      {Icon && <Icon className="w-6 h-6 mb-1 text-gray-700" />}

      {/* Label */}
      <span className="text-gray-800 font-medium text-sm">{label}</span>
    </div>
  );
};
