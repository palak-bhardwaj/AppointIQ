const isStrongPassword = (password) => {
    if (password.length < 8) {
      return {
        valid: false,
        message: "Password must be at least 8 characters long.",
      };
    }
  
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one uppercase letter.",
      };
    }
  
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one lowercase letter.",
      };
    }
  
    if (!/\d/.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one digit.",
      };
    }
  
    if (!/[@$!%*?#&_]/.test(password)) {
      return {
        valid: false,
        message:
          "Password must include at least one special character (@$!%*?#&_).",
      };
    }
  
    return { valid: true, message: "Password is strong." };
}

export { isStrongPassword }