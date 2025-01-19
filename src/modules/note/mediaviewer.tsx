import React, { useEffect, useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { renderAsync } from "docx-preview";
import "docx-preview/dist/docx-preview.css";

interface MediaViewerProps {
  file: {
    id: string;
    name: string;
    url: string;
  };
}

const MediaViewer: React.FC<MediaViewerProps> = ({ file }) => {
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  const getFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    return extension || "";
  };

  const fileType = getFileType(file.name);

  useEffect(() => {
    if (fileType === "docx" && file.url && docxContainerRef.current) {
      // Render DOCX file using docx-preview
      fetch(file.url)
        .then((response) => response.blob())
        .then((blob) => renderAsync(blob, docxContainerRef.current!))
        .catch((error) => {
          console.error("Failed to load DOCX file:", error);
        });
    }
  }, [fileType, file.url]);

  if (!file.url) {
    return <div>No file selected or file URL missing.</div>;
  }

  switch (fileType) {
    case "pdf":
      return (
        <div className="media-viewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={file.url} />
          </Worker>
        </div>
      );

    case "docx":
      return (
        <div className="media-viewer">
          <div ref={docxContainerRef} className="media-docx"></div>
        </div>
      );

    default:
      return (
        <div className="media-viewer">
          <p>Unsupported file type: {fileType}</p>
        </div>
      );
  }
};

export default MediaViewer;
