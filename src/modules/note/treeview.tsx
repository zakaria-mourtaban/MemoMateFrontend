// FileTreeView.tsx
import React, { useRef } from "react";
import { Tree, NodeApi, TreeApi } from "react-arborist";
import {
	FolderOpen,
	Folder,
	File,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import "./styles/treeview.css";

interface FileNode {
  id: string;
  name: string;
  children?: FileNode[];
}

// Define props interface for the component
interface FileTreeViewProps {
  data: FileNode[];
}

type NodeProps = {
  node: NodeApi<FileNode>;
  style: React.CSSProperties;
  dragHandle?: (element: HTMLElement | null) => void;
};

const FileTreeView: React.FC<FileTreeViewProps> = ({ data }) => {
  const treeRef = useRef<TreeApi<FileNode>>(null);

  const Node = React.forwardRef<HTMLDivElement, NodeProps>(({ node, style, dragHandle }, ref) => {
    const isFolder = Boolean(node.data.children);
    
    return (
      <div 
        ref={dragHandle || null}
        className={`tree-node ${node.state.isSelected ? 'selected' : ''}`}
        style={style}
      >
        <button
          className="toggle-button"
          onClick={() => node.toggle()}
          type="button"
        >
          {isFolder && (
            node.isOpen ? 
              <ChevronDown className="icon" /> : 
              <ChevronRight className="icon" />
          )}
        </button>
        
        {isFolder ? (
          node.isOpen ? 
            <FolderOpen className="icon folder" /> :
            <Folder className="icon folder" />
        ) : (
          <File className="icon file" />
        )}
        
        <span className="node-name">{node.data.name}</span>
      </div>
    );
  });

  Node.displayName = 'Node';

  const collapseAll = (): void => {
    if (treeRef.current) {
      treeRef.current.closeAll();
    }
  };

  return (
    <div className="file-tree-container">
      <div className="file-tree-header">
        <h3 className="header-title">File Explorer</h3>
        <button
          onClick={collapseAll}
          className="collapse-button"
          type="button"
        >
          Collapse All
        </button>
      </div>
      <div className="tree-content">
        <Tree<FileNode>
          ref={treeRef}
          initialData={data}
          openByDefault={false}
          width="100%"
          height={400}
          indent={24}
          rowHeight={32}
          padding={8}
        >
          {Node}
        </Tree>
      </div>
    </div>
  );
};

export default FileTreeView;