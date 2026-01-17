import { signInAction } from "@/actions/auth/sign-in-action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DropzoneUIFake from "../ui/dropzone-ui-fake";
import { Label } from "../ui/label";
import FormDescription from "./form-descriptrion";

export default function FinanceFormFake() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Envio de Documentos Financeiros</CardTitle>
        <CardDescription>
          <FormDescription />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form action={signInAction}>
          <button type="submit" className="w-full cursor-pointer">
            <div className="space-y-6 pointer-events-none">
              <div className="space-y-2">
                <Label>Documentos</Label>
                <DropzoneUIFake />
              </div>
            </div>
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
