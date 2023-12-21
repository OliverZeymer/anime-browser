export async function logIn(email, password, router, toast, setAuth, setCookie, setIsLoading) {
  try {
    setIsLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setAuth(data.user, data.token.toString());
      setCookie('token', data?.token, {
        days: 1,
      });

      toast({ description: 'You have successfully logged in!' });
      router.push('/');
    } else {
      toast({ title: data.message || 'Something went wrong!', variant: 'destructive' });
    }
  } catch (error) {
    console.log(error);
    toast({ description: 'An error occurred while logging in.', variant: 'destructive' });
  } finally {
    setIsLoading(false);
  }
}
