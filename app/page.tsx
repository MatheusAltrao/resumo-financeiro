"use client";
import DropzoneUI from "@/components/ui/dropzone-ui";

export default function Home() {
  return (
    <div className="w-full max-w-200 mx-auto p-2">
      <div>
        <DropzoneUI onDrop={() => {}} />
      </div>
    </div>
  );
}
