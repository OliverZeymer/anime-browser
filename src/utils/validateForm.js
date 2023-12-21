export function validateForm(email, password, username, setRedEmailField, setRedPasswordField, setRedUsernameField, toast, isSignUp) {
  if (email.trim() === "" || password.trim() === "") {
    toast({ description: 'Please enter a password and an email', variant: 'destructive' });
    if (email.trim() === "") {
      setRedEmailField(true);
    }
    if (password.trim() === "") {
      setRedPasswordField(true);
    }
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    toast({ description: 'Please enter a valid email', variant: 'destructive' });
    setRedEmailField(true);
    return;
  }

  if (password.length < 4) {
    toast({ description: 'Password must be at least 4 characters', variant: 'destructive' });
    setRedPasswordField(true);
    return;
  }
  if (isSignUp && username.trim() === "") {
    toast({ description: 'Please enter a username', variant: 'destructive' });
    setRedUsernameField(true);
    return;
  }
  return true;
}
