// src/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../core/components/navbar';
import TreeViewComponent from './treeview';

// src/types.ts
export interface TreeNode {
	label: string;
	type: 'file' | 'folder';
	children?: TreeNode[];
  }

const Note: React.FC = () => {
  const treeData: TreeNode[] = [
    {
      label: 'Folder 1',
      type: 'folder',
      children: [
        { label: 'File 1', type: 'file' },
        { label: 'File 2', type: 'file' },
        {
          label: 'Subfolder 1',
          type: 'folder',
          children: [{ label: 'File 3', type: 'file' }],
        },
      ],
    },
    { label: 'File 4', type: 'file' },
  ];

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <TreeViewComponent data={treeData} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Note;