export function validateForm(email, password, setRedEmailField, setRedPasswordField, toast) {
  if (email.trim() === "" || password.trim() === "") {
    toast.error("Please enter an email and password");
    if (email.trim() === "") {
      setRedEmailField(true);
    }
    if (password.trim() === "") {
      setRedPasswordField(true);
    }
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Please enter a valid email");
    setRedEmailField(true);
    return;
  }

  if (password.length < 4) {
    toast.error("Password must be at least 4 characters");
    setRedPasswordField(true);
    return;
  }
  return true;
}
