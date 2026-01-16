"use client";

import { CategorySummary } from "@/types/finance-resume";
import { Package } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface CategorySummaryTableProps {
  data: CategorySummary[];
}

const getCategoryColor = (index: number) => {
  const colors = [
    { bg: "from-cyan-50 to-cyan-100", border: "border-l-cyan-500", text: "text-cyan-700", icon: "bg-cyan-100 text-cyan-600" },
    { bg: "from-emerald-50 to-emerald-100", border: "border-l-emerald-500", text: "text-emerald-700", icon: "bg-emerald-100 text-emerald-600" },
    { bg: "from-violet-50 to-violet-100", border: "border-l-violet-500", text: "text-violet-700", icon: "bg-violet-100 text-violet-600" },
    { bg: "from-amber-50 to-amber-100", border: "border-l-amber-500", text: "text-amber-700", icon: "bg-amber-100 text-amber-600" },
    { bg: "from-rose-50 to-rose-100", border: "border-l-rose-500", text: "text-rose-700", icon: "bg-rose-100 text-rose-600" },
    { bg: "from-teal-50 to-teal-100", border: "border-l-teal-500", text: "text-teal-700", icon: "bg-teal-100 text-teal-600" },
    { bg: "from-indigo-50 to-indigo-100", border: "border-l-indigo-500", text: "text-indigo-700", icon: "bg-indigo-100 text-indigo-600" },
  ];
  return colors[index % colors.length];
};

export default function CategorySummaryTable({ data }: CategorySummaryTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-cyan-600" />
          Resumo Detalhado por Categoria
        </h3>
        <Accordion type="multiple" className="space-y-3 ">
          {data.map((category, catIndex) => {
            const colorScheme = getCategoryColor(catIndex);
            return (
              <AccordionItem key={catIndex} value={`item-${catIndex}`} className="border-none ">
                <Card className={`overflow-hidden border-l-4 h-full p-0  ${colorScheme.border}`}>
                  <AccordionTrigger className="hover:no-underline cursor-pointer h-full p-8  ">
                    <div className={`flex items-center justify-between w-full pr-4  rounded-lg p-3 -m-3`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full ${colorScheme.icon} flex items-center justify-center`}>
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h4 className={`font-bold text-base ${colorScheme.text}`}>{category.category}</h4>
                          <p className="text-xs text-muted-foreground">{category.expenses.length} transações</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground font-medium">Total</p>
                          <p className={`font-bold text-lg ${colorScheme.text}`}>
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(category.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 pt-2">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Descrição</TableHead>
                            <TableHead className="font-semibold">Data</TableHead>
                            <TableHead className="text-right font-semibold">Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.expenses
                            .sort((a, b) => b.value - a.value)
                            .map((expense, expenseIndex) => (
                              <TableRow key={expenseIndex} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="font-medium">{expense.description}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {expense.date ? new Date(expense.date).toLocaleDateString("pt-BR") : "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="inline-block px-2 py-1 bg-rose-50 text-rose-700 font-semibold rounded text-sm">
                                    {new Intl.NumberFormat("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                    }).format(expense.value)}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
