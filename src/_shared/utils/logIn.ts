import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { AuthUser } from '@/types/auth';
import { login as loginAction } from '@/libs/auth/login';

type ToastFn = (title: string, options?: { description?: string; title?: string }) => void;
type SetCookieFn = (name: string, value: string, options?: { days?: number }) => void;

export const logIn = async (
  email: string,
  password: string,
  router: AppRouterInstance,
  toast: ToastFn,
  setAuth: (user: AuthUser | false) => void,
  setCookie: SetCookieFn,
  setIsLoading: (loading: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const result = await loginAction(email, password);

    if (result.success && result.data) {
      setAuth(result.data.user);
      setCookie('token', result.data.token, { days: 1 });
      toast('You have successfully logged in', {
        description: 'You are now logged in to your account',
      });
      router.push('/');
    } else {
      toast("Couldn't log in", { title: result.message || 'Something went wrong!' });
    }
  } catch (error) {
    console.log(error);
    toast("Couldn't log in", { description: 'An error occurred while logging in.' });
  } finally {
    setIsLoading(false);
  }
};
