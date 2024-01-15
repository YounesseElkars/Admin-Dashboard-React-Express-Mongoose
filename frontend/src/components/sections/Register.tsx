import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Container from '../ui/Container';
import { Link } from 'react-router-dom';

const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(50, { message: 'Username max characters is 50 .' }),
    password: z
      .string()
      .min(2, {
        message: 'Password must be at least 2 characters.',
      })
      .max(50, { message: 'Password max characters is 50.' }),
    confirmPassword: z
      .string()
      .min(2, {
        message: 'Password must be at least 2 characters.',
      })
      .max(50, { message: 'Password max characters is 50.' }),
    email: z
      .string()
      .min(2, {
        message: 'Email must be at least 2 characters.',
      })
      .max(50, { message: 'Email max characters is 50.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.username);
  }

  return (
    <div className="w-full">
      <Container>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" bg-primary/5  mx-auto mt-20 w-full space-y-6 rounded-md px-10 py-20 shadow-lg sm:w-2/3"
          >
            <h1 className="w-full text-center text-3xl font-semibold">Register</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            <h1 className="text-sm">
              Already have an account ?
              <Link to={'/login'}>
                <Button variant={'link'}>Login</Button>
              </Link>
            </h1>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
