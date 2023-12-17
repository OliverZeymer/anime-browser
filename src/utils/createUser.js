export async function createUser(email, password, toast, setIsLoading) {
  try {
    setIsLoading(true);
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      toast({ description: 'You have successfully created an account! Please log in.' });
    } else {
      toast({ description: data.message || 'Something went wrong!', variant: 'destructive' });
    }
    return response;
  } catch (error) {
    toast({ description: 'An error occurred while creating an account.', variant: 'destructive' });
    return null;
  } finally {
    setIsLoading(false);
  }
}
