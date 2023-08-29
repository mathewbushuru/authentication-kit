import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
      message: "Username must be at least 2 characters",
    })
    .max(50),
  emailAddress: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  phoneNumber: z.string().optional(),
  emailNotifications: z.boolean().default(true),
  acceptTerms: z.boolean(),
});

function Signup() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      emailNotifications: true,
      acceptTerms: false,
    },
  });

  function onFormSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
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
          name="emailAddress"
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
            </FormItem>
          )}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </Form>
  );
}

export default Signup;
