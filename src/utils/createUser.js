import axios from 'axios';

export async function createUser(email, password, username, discord, toast, setIsLoading, setAuth, setCookie) {
  try {
    setIsLoading(true);

    const response = await axios.post('/api/user/create', {
      email,
      password,
      username,
      discord,
    });

    const data = response.data;

    if (data.success === true) {
      setAuth(data?.data?.user, data?.data?.token?.toString());
      setCookie('token', data?.data?.token, {
        days: 1,
      });

      toast('Account created', { description: 'You have successfully created an account!' });
    } else {
      toast("Couldn't create account", { description: data.message || 'Something went wrong.' });
    }

    return response;
  } catch (error) {
    console.error(error);

    toast("Couldn't create account", { description: 'An error occurred while creating an account.' });
    return null;
  } finally {
    setIsLoading(false);
  }
}
