// Function to validate and submit the form
function validateForm(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the form inputs
    const firstName = document.getElementById("firstName-input").value;
    const lastName = document.getElementById("lastName-input").value;
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const confirmPassword = document.getElementById("confirmPassword-input").value;
  
    // Check if any field is empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showError("All fields are mandatory.");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }
  
    // Get the existing users from localStorage
    const existingUsers = getUsers();
  
    // Check if the email already exists
    const userExists = existingUsers.some(user => user.email === email);
  
    if (userExists) {
      showError("User with this email already exists.");
      return;
    }
  
    // Create a new user object
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
  
    // Add the new user to the existing users array
    existingUsers.push(newUser);
  
    // Store the updated users array in localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));
  
    // Show success message
    showSuccess();
  
    // Clear the form inputs
    document.getElementById("firstName-input").value = "";
    document.getElementById("lastName-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("password-input").value = "";
    document.getElementById("confirmPassword-input").value = "";
  }
  
  // Function to show error message
  function showError(message) {
    const errorDiv = document.getElementById("error-div");
    const errorSpan = document.getElementById("error-span");
    errorSpan.textContent = message;
    errorDiv.style.display = "block";
  }
  
  // Function to show success message
  function showSuccess() {
    const successDiv = document.getElementById("successfully-div");
    successDiv.style.display = "block";
  }
  
  // Function to get the existing users from localStorage
  function getUsers() {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }