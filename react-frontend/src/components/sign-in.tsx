import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/api/auth";
import { type LoginRequestType } from "@/api/types";
import { useAppDispatch } from "@/hooks/redux";
import { useToast } from "@/hooks/use-toast";
import { setCredentials } from "@/store/features/auth-slice";

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
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [loginTrigger, { isLoading }] = useLoginMutation();

  async function onFormSubmit(formData: z.infer<typeof signinFormSchema>) {
    const { usernameOrEmail: email, password } = formData;
    const loginData: LoginRequestType = { email, password };
    try {
      const loginResponse = await loginTrigger(loginData).unwrap();
      console.log(loginResponse);
      dispatch(
        setCredentials({
          user: loginResponse.userData,
          token: loginResponse.jwtToken,
        }),
      );
      navigate("/api-playground");
    } catch (err: any) {
      console.log("An error occurred while logging in.");
      console.error(err);
      toast({
        title: "Something went wrong",
        description: err?.data?.errorMessage,
        variant: "destructive",
      });
    }
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
        <Button type="submit" disabled={isLoading}>
          Sign in
        </Button>
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
