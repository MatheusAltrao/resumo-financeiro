interface AnalyzesByIdProps {
  params: {
    id: string;
  };
}

export default async function AnalyzesById({ params }: AnalyzesByIdProps) {
  const { id } = await params;
  return <div className="mx-auto max-w-300 p-2">{id}</div>;
}
