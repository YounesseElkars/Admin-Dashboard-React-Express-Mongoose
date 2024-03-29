import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Container from '../ui/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from '../ui/use-toast';
import { useRegisterMutation } from '@/redux/features/usersApiSlice';
import { UseAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { setCreddentials } from '@/redux/features/authSlice';
import { ReloadIcon } from '@radix-ui/react-icons';

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: 'name must be at least 2 characters.',
      })
      .max(50, { message: 'name max characters is 50 .' }),
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = UseAppSelector((store) => store.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setCreddentials({ ...res }));
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.data.message,
      });
    }
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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

            {isLoading ? (
              <Button disabled>
                <ReloadIcon className="mr-1 h-2 w-2 animate-spin" />
                Loading
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}

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
