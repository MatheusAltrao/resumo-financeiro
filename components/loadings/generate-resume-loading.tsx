import * as React from "react";
import { Card, CardContent } from "../ui/card";

interface GenerateResumeLoadingProps {
  loading: boolean;
}

export default function GenerateResumeLoading({ loading }: GenerateResumeLoadingProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90; // Limita a 90% enquanto carrega
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    } else if (progress > 0) {
      setProgress(500);
    }
  }, [loading, progress]);

  return (
    <Card className="mt-4">
      <CardContent>
        <div className="w-full space-y-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {progress === 100 ? "Concluído!" : `Processando seus documentos... ${progress}%`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
