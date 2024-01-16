import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Container from '../ui/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/features/usersApiSlice';
import { setCreddentials } from '@/redux/features/authSlice';
import { UseAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'email must be at least 2 characters.',
    })
    .max(50, { message: 'email max characters is 50 .' }),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(50, { message: 'Password max characters is 50.' }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = UseAppSelector((store) => store.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'adminsss2s@live.fr',
      password: '123456',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await login({
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
            <h1 className="w-full text-center text-3xl font-semibold">Login</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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

            {isLoading ? (
              <Button disabled>
                <ReloadIcon className="mr-1 h-2 w-2 animate-spin" />
                Loading
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}

            <h1 className="text-sm">
              You dont have an account ?
              <Link to={'/register'}>
                <Button variant={'link'}>Register</Button>
              </Link>
            </h1>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
