import React from 'react';

import './DragableElement.css';

const DraggableElement: React.FC = () => {
   return <div className="draggable-element" />;
};

const Memoized = React.memo(DraggableElement, () => true);

export { Memoized as DraggableElement };