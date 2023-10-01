import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useSignupMutation } from "@/api/auth";
import { type SignupRequestType } from "@/api/types";
import { useAppDispatch } from "@/hooks/redux";
import { useToast } from "@/hooks/use-toast";
import { setCredentials } from "@/store/features/auth-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signupFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be 2 or more characters long",
    })
    .max(50),
  email: z.string().email({ message: "Email address is not valid" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  phoneNumber: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  acceptTerms: z.literal(true, {
    required_error: "Accept terms and conditions to continue",
  }),
});

function Signup() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      emailNotifications: true,
      acceptTerms: true,
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [signupTrigger, { isLoading }] = useSignupMutation();

  async function onFormSubmit(formValues: z.infer<typeof signupFormSchema>) {
    // remove acceptTerms as not needed in server. Submission not allowed without it checked
    const { username, email, password, phoneNumber, emailNotifications } =
      formValues;
    const signupData: SignupRequestType = {
      username,
      email,
      password,
      emailNotifications,
      phoneNumber,
    };
    try {
      const user = await signupTrigger(signupData).unwrap();
      console.log(user);
      dispatch(setCredentials({ user, token: crypto.randomUUID() }));
      navigate("/api-playground");
    } catch (err: any) {
      console.log("An error occured while signing up");
      console.error(err);
      toast({
        title: "Something went wrong",
        description: err?.data?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="matt" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="matt@test.com" {...field} />
              </FormControl>
              <FormDescription>You will use this to log in.</FormDescription>
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
              <FormDescription>Choose a strong password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Add Multi-Factor Authentication to your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4 shadow">
              <div className="space-y-0.5">
                <FormLabel>Email notifications</FormLabel>
                <FormDescription>
                  Receive emails about your account, new features and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You agree to our terms of service and privacy policy.
                  </FormDescription>
                </div>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Sign up
        </Button>
        <p className="text-sm">
          Have an account?{" "}
          <span
            className="cursor-pointer text-muted-foreground"
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </span>
        </p>
      </form>
    </Form>
  );
}

export default Signup;
