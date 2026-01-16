import { ResumoPorCategoria } from "@/types/finance-resume";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface CategorySummaryTableProps {
  data: ResumoPorCategoria[];
}

export default function CategorySummaryTable({ data }: CategorySummaryTableProps) {
  return (
    <div className="space-y-4">
      {data.map((categoria, catIndex) => (
        <Card key={catIndex}>
          <CardHeader>
            <CardTitle className="text-lg">
              🧾 {categoria.categoria} - Total:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(categoria.total)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoria.gastos.map((gasto, gastoIndex) => (
                  <TableRow key={gastoIndex}>
                    <TableCell>{gasto.descricao}</TableCell>
                    <TableCell>{gasto.data ? new Date(gasto.data).toLocaleDateString("pt-BR") : "-"}</TableCell>
                    <TableCell className="text-right font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(gasto.valor)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
