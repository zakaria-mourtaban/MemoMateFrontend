// src/TreeView.tsx
import React, { useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import './styles/treeview.css';

interface TreeNode {
  label: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
}

const TreeViewComponent: React.FC<{ data: TreeNode[] }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <TreeView
        key={node.label}
        nodeLabel={node.label}
        defaultCollapsed={node.type === 'folder'}
        collapsed={!isOpen}
      >
        {node.children && renderTree(node.children)}
      </TreeView>
    ));
  };

  return (
    <div className="tree-view-container">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Collapse' : 'Expand'}
      </button>
      <div className={`tree-view ${isOpen ? 'open' : 'closed'}`}>
        {renderTree(data)}
      </div>
    </div>
  );
};

export default TreeViewComponent;