export default function FormDescription() {
  return (
    <div>
      <p className="mb-2">Siga os passos abaixo para enviar seus documentos:</p>
      <ol className="list-decimal list-inside space-y-1 text-sm">
        <li>Entre no site ou aplicativo do seu banco</li>
        <li>Procure pela opção "Exportar Extrato" ou "Relatório de Movimentações"</li>
        <li>Faça o download do arquivo em formato CSV</li>
        <li>Arraste o arquivo aqui ou clique para fazer upload</li>
        <li>Receba uma análise completa dos seus dados financeiros</li>
        <li className="text-red-500">Você só pode enviar apenas 2 arquivos por vez</li>
        <li>Aguarde a conclusão do processamento dos seus documentos, pode demorar até alguns minutos</li>
      </ol>
    </div>
  );
}
