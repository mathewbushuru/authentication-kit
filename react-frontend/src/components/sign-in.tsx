import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signinFormSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(2, {
      message: "Username must be 2 or more characters long",
    })
    .max(50),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function Signin() {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  function onFormSubmit(values: z.infer<typeof signinFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="usernameOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address or username</FormLabel>
              <FormControl>
                <Input placeholder="matt@test.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
        <p className="text-sm">
          No account?{" "}
          <span
            className="cursor-pointer text-muted-foreground"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </span>
        </p>
      </form>
    </Form>
  );
}

export default Signin;
