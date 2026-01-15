"use client";
import { Trash, Upload } from "lucide-react";
import { useState } from "react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";
import { Button } from "./button";

interface DropzoneUIProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export default function DropzoneUI({ onDrop }: DropzoneUIProps) {
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [files, setFiles] = useState<File[]>([]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const createPreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [file.name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = (fileToDelete: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    setPreviews((prevPreviews) => {
      const updatedPreviews = { ...prevPreviews };
      delete updatedPreviews[fileToDelete.name];
      return updatedPreviews;
    });
  };

  return (
    <>
      <Dropzone
        onDrop={(acceptedFiles: File[]) => {
          acceptedFiles.forEach(createPreview);
          setFiles((prev) => [...prev, ...acceptedFiles]);
          onDrop(acceptedFiles);
        }}
      >
        {(dropzone: DropzoneState) => (
          <div className="flex items-center flex-col gap-1.5 h-75 border-dashed justify-center rounded-lg">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="font-medium">Arraste ou clique aqui para adicionar arquivos</h2>
              <p className="text-sm text-muted-foreground">Utilize preferencialmente arquivos em formato PDF ou CSV</p>
            </div>
          </div>
        )}
      </Dropzone>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-white/50">
              <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                {file.type.startsWith("image/") && previews[file.name] ? (
                  <img src={previews[file.name]} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-gray-500 text-center px-1">{file.type.split("/")[1]?.toUpperCase() || "FILE"}</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type || "Unknown type"} • {formatFileSize(file.size)}
                </p>
              </div>

              <Button variant={"destructive"} onClick={() => handleDeleteFile(file)}>
                <Trash />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
