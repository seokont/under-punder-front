// DroppableArea.js
import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'DRAGGABLE_ITEM',
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        border: `2px dashed ${isOver ? 'green' : 'gray'}`,
        padding: '16px',
      }}
    >
      Сюда можно перетаскивать элементы
    </div>
  );
};

export default DroppableArea;
