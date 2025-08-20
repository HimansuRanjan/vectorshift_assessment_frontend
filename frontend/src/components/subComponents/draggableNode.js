// draggableNode.jsx

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`cursor-grab min-w-[90px] h-[70px] flex items-center justify-center flex-col 
        rounded-xl bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="text-gray-800 font-medium text-sm">{label}</span>
    </div>
  );
};
