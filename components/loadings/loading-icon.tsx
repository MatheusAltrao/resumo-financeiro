import { Loader } from "lucide-react";

interface LoadingIconProps {
  text?: string;
}

export default function LoadingIcon({ text }: LoadingIconProps) {
  return (
    <div>
      <Loader size={20} className="animate-spin" />
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
}
