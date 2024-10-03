"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { loginAction } from "../_actions/login-action";
import { insertUserSchema, InsertUserSchema } from "../_schema/login-schema";

const LoginForm = () => {
  const form = useForm<InsertUserSchema>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "demo",
      password: "demo",
    },
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      const error = await loginAction(values);
      if (error) {
        if (!error.status && error.error.message) {
          toast.error(error.error.message);
        }
      }
    }),
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <div className="grid gap-2">
                  <Label htmlFor="username">نام کاربری</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="demo"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <div className="grid gap-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="demo"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          ورود
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
