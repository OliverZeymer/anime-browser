export async function createUser(email, password, username, discord, toast, setIsLoading) {
  try {
    setIsLoading(true);
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, discord }),
    });
    const data = await response.json();

    if (response.ok) {
      toast({ description: 'You have successfully created an account! Please log in.' });
    } else {
      toast({ description: data.message || 'Something went wrong!', variant: 'destructive' });
    }
    return response;
  } catch (error) {
    console.log(error);
    toast({ description: 'An error occurred while creating an account.', variant: 'destructive' });
    return null;
  } finally {
    setIsLoading(false);
  }
}
