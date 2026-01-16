"use client";
import { Trash, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Dropzone, { DropzoneState } from "shadcn-dropzone";
import { Button } from "./button";

interface DropzoneUIProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles?: number;
}

export default function DropzoneUI({ files, setFiles, maxFiles = 3 }: DropzoneUIProps) {
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

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
          // Verifica quantos arquivos podem ser adicionados
          const remainingSlots = maxFiles - files.length;

          if (remainingSlots <= 0) {
            const errorMsg = "Você só pode adicionar três itens";
            setError(errorMsg);
            toast.error(errorMsg);
            setTimeout(() => setError(null), 3000);
            return;
          }

          // Se tentar adicionar mais arquivos do que o permitido, pega apenas os primeiros
          const filesToAdd = acceptedFiles.slice(0, remainingSlots);
          const rejected = acceptedFiles.length - filesToAdd.length;

          if (rejected > 0) {
            const errorMsg = "Você só pode adicionar três itens";
            setError(errorMsg);
            toast.error(errorMsg);
            setTimeout(() => setError(null), 3000);
          } else {
            setError(null);
          }

          filesToAdd.forEach(createPreview);
          setFiles((prev) => [...prev, ...filesToAdd]);
        }}
        disabled={files.length >= maxFiles}
      >
        {(dropzone: DropzoneState) => (
          <div className="flex items-center flex-col gap-1.5 h-75 border-dashed justify-center rounded-lg">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="font-medium">
                {files.length >= maxFiles ? "Limite de arquivos atingido" : "Arraste ou clique aqui para adicionar arquivos"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Utilize preferencialmente arquivos em formato PDF ou CSV ({files.length}/{maxFiles} arquivos)
              </p>
              {error && <p className="text-sm text-red-500 font-medium mt-2">{error}</p>}
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

              <Button variant={"destructive"} size="icon" onClick={() => handleDeleteFile(file)} type="button">
                <Trash className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
