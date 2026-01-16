import { Recebimento } from "@/types/finance-resume";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface IncomeTableProps {
  data: Recebimento[];
}

export default function IncomeTable({ data }: IncomeTableProps) {
  const totalRecebido = data.reduce((sum, item) => sum + item.valor, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>💰 Detalhe de Recebimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((recebimento, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(recebimento.data).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>{recebimento.origem}</TableCell>
                <TableCell>{recebimento.descricao}</TableCell>
                <TableCell className="text-right font-medium text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(recebimento.valor)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell colSpan={3} className="font-bold">
                Total Recebido
              </TableCell>
              <TableCell className="text-right font-bold text-green-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalRecebido)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
