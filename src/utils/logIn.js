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
    if (response.ok) {
      setAuth(data.user, data.token.toString());
      setCookie('token', data?.token, {
        days: 1,
      });

      toast('You have successfully logged in', { description: 'You are now logged in to your account' });
      router.push('/');
    } else {
      toast("Couldn't log in", { title: data.message || 'Something went wrong!' });
    }
  } catch (error) {
    console.log(error);
    toast("Couldn't log in", { description: 'An error occurred while logging in.' });
  } finally {
    setIsLoading(false);
  }
}
