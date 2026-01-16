import { TopGastoPix } from "@/types/finance-resume";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface TopPixExpensesTableProps {
  data: TopGastoPix[];
}

export default function TopPixExpensesTable({ data }: TopPixExpensesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>⚡ Top Gastos via Pix</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posição</TableHead>
              <TableHead>Recebedor</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((pix, index) => (
              <TableRow key={index}>
                <TableCell className="font-bold">#{index + 1}</TableCell>
                <TableCell>{pix.recebedor}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {pix.quantidade}x
                  </span>
                </TableCell>
                <TableCell className="text-right font-bold text-red-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pix.valor)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
