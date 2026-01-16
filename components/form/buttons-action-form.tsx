import IconLoading from "../loadings/icon-loading";
import { Button } from "../ui/button";

interface ButtonsActionFormProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isPending: boolean;
}

export default function ButtonsActionForm({ files, setFiles, isPending }: ButtonsActionFormProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Button type="button" variant="outline" onClick={() => setFiles([])} disabled={files.length === 0 || isPending}>
        Limpar Tudo
      </Button>
      <Button type="submit" disabled={files.length === 0 || isPending}>
        {isPending ? <IconLoading text="Enviando..." /> : `Enviar ${files.length} arquivo(s)`}
      </Button>
    </div>
  );
}
