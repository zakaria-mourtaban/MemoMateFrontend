import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import Node from "./node";
import "./styles/treeview.css";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  FilePlus2,
  FolderPlus,
  Upload,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCollapsed } from "../../store/store";
import axios from "axios";
import { apiCall, getTokenFromCookie } from "../core/utils/api";

interface FileNode {
  id: string;
  name: string;
  children?: FileNode[];
}

interface FileTreeViewProps {
  data: FileNode[];
}

const FileTreeView: React.FC<FileTreeViewProps> = ({ data }) => {
  const treeRef = useRef<TreeApi<FileNode>>(null);
  const collapsed = useSelector((state: RootState) => state.treeView.collapsed);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const current = useSelector((state: RootState) => state.workspaceApi.current);
  Node.displayName = "Node";

  const alterAll = (): void => {
    if (collapsed === false) treeRef.current.closeAll();
    else treeRef.current.openAll();
    dispatch(setCollapsed(!collapsed));
  };

  const handleFileUpload = async (workspaceId: string) => {
	try {
	  const formData = new FormData();
	  const fileInput = document.createElement("input");
	  fileInput.type = "file";
	  fileInput.accept = ".pdf,.docx,.excalidraw,.txt";
  
	  const fileSelected = new Promise<File>((resolve, reject) => {
		fileInput.onchange = (event: Event) => {
		  const target = event.target as HTMLInputElement;
		  const selectedFile = target.files?.[0];
		  if (selectedFile) {
			resolve(selectedFile);
		  } else {
			reject(new Error('No file selected'));
		  }
		};
  
		fileInput.oncancel = () => {
		  reject(new Error('File selection cancelled'));
		};
	  });
  
	  fileInput.click();
	  const file = await fileSelected;
	  
	  formData.append('file', file);
	  formData.append('name', file.name);
  
	  console.log('FormData entries:');
	  for (const pair of formData.entries()) {
		console.log(pair[0], pair[1]);
	  }
  	const token = getTokenFromCookie();
	  const response = await axios({
		method: 'POST',
		url: `http://localhost:5000/api/workspace/${workspaceId}/add`,
		data: formData,
		headers: {
		  Authorization: `Bearer ${token}`,
		  // Don't set Content-Type, let axios set it automatically for FormData
		}
	  });
  
	  return response;
	} catch (error) {
	  console.error("Error uploading file:", error);
	  throw error;
	}
  };
  return (
    <div className="file-tree-container">
      <div className="file-actions">
        <button>
          <FilePlus2 size={25} />
        </button>
        <button>
          <FolderPlus size={25} />
        </button>
        <button onClick={alterAll}>
          {collapsed ? (
            <ChevronsUpDown size={25} />
          ) : (
            <ChevronsDownUp size={25} />
          )}
        </button>
        <button
          onClick={() => {
            handleFileUpload(current._id);
          }}>
          <Upload />
        </button>
      </div>
      <div className="tree-content">
        <Tree<FileNode>
          ref={treeRef}
          data={data}
          openByDefault={false}
          width="100%"
          height={400}
          indent={24}
          rowHeight={32}
          padding={8}>
          {Node}
        </Tree>
      </div>
    </div>
  );
};

export default FileTreeView;
