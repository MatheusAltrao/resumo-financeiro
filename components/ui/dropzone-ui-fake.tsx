"use client";
import { Upload } from "lucide-react";
import Dropzone, { DropzoneState } from "shadcn-dropzone";

export default function DropzoneUIFake() {
  return (
    <Dropzone disabled={true}>
      {(dropzone: DropzoneState) => (
        <div className="flex items-center flex-col gap-1.5 h-75 border-dashed justify-center rounded-lg">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="font-medium">Arraste ou clique aqui para adicionar arquivos</h2>
            <p className="text-sm text-muted-foreground">Utilize arquivos em formato CSV arquivos</p>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
