import type { AuthUser } from '@/types/auth';
import { createUser as createUserAction } from '@/libs/auth/create-user';

type ToastFn = (title: string, options?: { description?: string }) => void;
type SetCookieFn = (name: string, value: string, options?: { days?: number }) => void;

export const createUser = async (
  email: string,
  password: string,
  username: string,
  discord: string | undefined,
  toast: ToastFn,
  setIsLoading: (loading: boolean) => void,
  setAuth: (user: AuthUser | false) => void,
  setCookie: SetCookieFn,
) => {
  try {
    setIsLoading(true);
    const result = await createUserAction({ email, password, username, discord });

    if (result.success && result.data) {
      setAuth(result.data.user);
      setCookie('token', result.data.token, { days: 1 });
      toast('Account created', { description: 'You have successfully created an account!' });
    } else {
      toast("Couldn't create account", { description: result.message || 'Something went wrong.' });
    }

    return result;
  } catch (error) {
    console.error(error);
    toast("Couldn't create account", { description: 'An error occurred while creating an account.' });
    return null;
  } finally {
    setIsLoading(false);
  }
};
