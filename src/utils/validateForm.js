export function validateForm(email, password, username, setRedEmailField, setRedPasswordField, setRedUsernameField, toast, isSignUp) {
  if (email.trim() === '' || password.trim() === '') {
    toast('Please enter a password and an email', { description: 'You have to enter a password and an email' });
    if (email.trim() === '') {
      setRedEmailField(true);
    }
    if (password.trim() === '') {
      setRedPasswordField(true);
    }
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    toast('Please enter a valid email', { description: 'You have to enter a valid email' });
    setRedEmailField(true);
    return;
  }

  if (password.length < 4) {
    toast('Please enter a longer password', { description: 'Your password must be at least 4 characters long' });
    setRedPasswordField(true);
    return;
  }
  if (isSignUp && username.trim() === '') {
    toast('Please enter a username', { description: 'You have to enter a username' });
    setRedUsernameField(true);
    return;
  }
  return true;
}
