import { Loader } from "lucide-react";

interface IconLoadingProps {
  text?: string;
}

export default function IconLoading({ text }: IconLoadingProps) {
  return (
    <div className="flex items-center gap-1">
      <Loader size={20} className="animate-spin" />
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
}
