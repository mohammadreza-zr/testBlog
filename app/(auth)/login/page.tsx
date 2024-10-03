import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { validateRequest } from "../../../lib/lucia-auth";
import LoginForm from "./_components/login-form";

export default async function Dashboard() {
  const { session } = await validateRequest();

  if (session) redirect("/");

  return (
    <div className="w-full h-full min-h-svh grid place-content-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ورود</CardTitle>
          <CardDescription>لطفا با اکانت دمو وارد شوید</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
