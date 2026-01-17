import IconLoading from "../loadings/icon-loading";
import { Button } from "../ui/button";

interface ButtonsActionFormProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isPending: boolean;
  credits: number;
}

export default function ButtonsActionForm({ files, setFiles, isPending, credits }: ButtonsActionFormProps) {
  const hasNoCredits = credits <= 0;

  if (hasNoCredits) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Button type="submit">Comprar créditos para Análise</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button type="submit" disabled={files.length === 0 || isPending}>
        {isPending ? <IconLoading text="Enviando..." /> : `Enviar ${files.length} arquivo(s)`}
      </Button>
    </div>
  );
}
