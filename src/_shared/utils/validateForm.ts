type ToastFn = (title: string, options?: { description?: string }) => void;

type SetFieldFn = (value: boolean) => void;

const isValidEmail = (email: string) => {
  return email.includes('@') && email.includes('.');
};

export const validateLoginForm = (
  email: string,
  password: string,
  setRedEmailField: SetFieldFn,
  setRedPasswordField: SetFieldFn,
  toast: ToastFn,
): boolean => {
  if (email.trim() === '' || password.trim() === '') {
    toast('Please enter a password and an email', {
      description: 'You have to enter a password and an email',
    });

    if (email.trim() === '') {
      setRedEmailField(true);
    }

    if (password.trim() === '') {
      setRedPasswordField(true);
    }

    return false;
  }

  if (!isValidEmail(email)) {
    toast('Please enter a valid email', { description: 'You have to enter a valid email' });
    setRedEmailField(true);
    return false;
  }

  if (password.length < 4) {
    toast('Please enter a longer password', {
      description: 'Your password must be at least 4 characters long',
    });
    setRedPasswordField(true);
    return false;
  }

  return true;
};

export const validateSignUpForm = (
  email: string,
  password: string,
  username: string,
  setRedEmailField: SetFieldFn,
  setRedPasswordField: SetFieldFn,
  setRedUsernameField: SetFieldFn,
  toast: ToastFn,
): boolean => {
  if (!validateLoginForm(email, password, setRedEmailField, setRedPasswordField, toast)) {
    return false;
  }

  if (username.trim() === '') {
    toast('Please enter a username', { description: 'You have to enter a username' });
    setRedUsernameField(true);
    return false;
  }

  return true;
};
