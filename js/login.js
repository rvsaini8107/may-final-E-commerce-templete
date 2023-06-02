// import {loadUrl}from "./signup.js";
function login(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the form inputs
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    var errorSpan = document.getElementById('error-span');
    var errDiv= document.getElementById('error-div');
    var SuccessDiv= document.getElementById('successfully-div');
  
    // Get the existing users from localStorage
    const existingUsers = getUsers();
  
    // Find the user with matching email and password
    // console.log(existingUsers.find(u=>console.log(u[0].email)),email,password)
    const user = existingUsers.find(user => user[0].email === email && user[0].password === password);
    var userDetails =existingUsers.find((user) => {
        if(user[0].email === email && user[0].password === password){
            return {
                
                "fname":user[0].fname,
                "lname":user[0].lname,
                "email":user[0].email,
                "password":user[0].password,
                "token":user[0].randomToken
              }
        }
    });
    // console.log(userDetails)
  
    if (user) {
      // Login successful
      console.log("Login successful");
      localStorage.setItem("current", JSON.stringify(userDetails));
      showErrorSucc(SuccessDiv,SuccessDiv,"Login successful")
      loadUrl("./profile.html");
      // You can redirect to another page or perform any other actions here
    } else {
      // Login failed
      console.log("Login failed");
        showErrorSucc(errDiv,errorSpan,"Login failed Please Check Email & Password")
      // Display an error message or perform any other actions here
    }
  
    // Clear the form inputs
    document.getElementById("email-input").value = "";
    document.getElementById("password-input").value = "";
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

  function loadUrl(urlThis){
    setTimeout(() => {
        window.location.href=urlThis;
    }, 3000);
    
  }
  
  function showErrorSucc(errdiv,showerrdiv,err){
   
    errdiv.style.display="block";    
    showerrdiv.innerHTML=err;
        setTimeout(() => {
            errdiv.style.display="none";
        }, 5000);
        
}