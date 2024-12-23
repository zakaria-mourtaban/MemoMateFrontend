import React from 'react';
import './style.css';

const OnDragLine: React.FC = () => {
   return <div className="on-drag-line" />;
};

const Memoized = React.memo(OnDragLine, () => true);

export { Memoized as OnDragLine };