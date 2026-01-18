import { Loader } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div>
        <Loader size={32} className="animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
