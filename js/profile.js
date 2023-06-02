// get user data from localStorage
    var errorSpan = document.getElementById('error-span');
    var errDiv= document.getElementById('error-div');
    var SuccessDiv= document.getElementById('successfully-div');

    var errorSpan1 = document.getElementById('error-span1');
    var errDiv1= document.getElementById('error-div1');
    var SuccessDiv1= document.getElementById('successfully-div1');

    var errorSpan2 = document.getElementById('error-span2');
    var errDiv2= document.getElementById('error-div2');
    var SuccessDiv2= document.getElementById('successfully-div2');


function getUserData(key) {
    const userData = localStorage.getItem(key);
    return JSON.parse(userData);
  }
  
  // Function to set user data in localStorage
  function setUserData(key,userData) {
    localStorage.setItem(key, JSON.stringify(userData));
  }
  
  // Function to update the profile information
  function updateProfileInfo() {
    const firstNameInput = document.getElementById('firstName-input');
    const lastNameInput = document.getElementById('lastName-input');
  
    const userData = getUserData("current");
    console.log(userData)
  
    if (userData) {
      // Populate the input fields with the user data
      firstNameInput.value = userData[0].fname;
      lastNameInput.value = userData[0].lname;
    }
  }
  
  // Function to save the profile information
  function saveProfileInfo(event) {
    event.preventDefault();
  
    const firstNameInput = document.getElementById('firstName-input');
    const lastNameInput = document.getElementById('lastName-input');
  
    const userData = getUserData("users");
    const currentuserData = getUserData("current");
  
    if (userData && currentuserData) {
      // Update the user data with the new values
    //   userData[0].fname = firstNameInput.value;
    //   userData[0].lname = lastNameInput.value;
      userData.find((user)=>{
        if(user[0].id==currentuserData[0].id){
            user[0].fname=firstNameInput.value;
            user[0].lname=lastNameInput.value;
            
          }
      });
      currentuserData[0].fname = firstNameInput.value;
      currentuserData[0].lname = lastNameInput.value;

    console.log(userData)
      // Save the updated user data in localStorage
      setUserData('users',userData);
      setUserData("current",currentuserData);
  
      // Show a success message or perform any other action
      console.log('Profile information saved successfully!');
      showErrorSucc(SuccessDiv,SuccessDiv,"Profile information saved successfully!")
    }
  }
  
  // Function to change the password
  function changePassword(event) {
    event.preventDefault();
  
    const oldPasswordInput = document.getElementById('oldPass-input');
    const newPasswordInput = document.getElementById('newPassword-input');
    const confirmPasswordInput = document.getElementById('confirmPassword-input');
  
    const userData = getUserData("users");
    const currentuserData = getUserData("current");
  
    if (userData && currentuserData) {
      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
        
  
      // Check if the old password matches the stored password
      if (oldPassword === currentuserData[0].password) {
        // Check if the new password and confirm password match
        if (newPassword === confirmPassword) {
          // Update the user data with the new password
          currentuserData[0].password = newPassword;
          currentuserData[0].password = newPassword;
  
          // Save the updated user data in localStorage
            userData.find((user)=>{
              if(user[0].id==currentuserData[0].id){
                  return user[0].password=newPassword;;
                }
            });
            
            setUserData('current',currentuserData);
            setUserData('users',userData);
            

            oldPasswordInput.value="";
            newPasswordInput.value="";
            confirmPasswordInput.value="";
            showErrorSucc(SuccessDiv1,SuccessDiv1,"Password changed successfully!")
          // Show a success message or perform any other action
          console.log('Password changed successfully!');
        } else {
          console.log('New password and confirm password do not match.');
          showErrorSucc(errDiv1,errorSpan1,"New password and confirm password do not match.")
        }
      } else {
        console.log('Invalid old password.');
        showErrorSucc(errDiv1,errorSpan1,"Invalid old password.")
      }
    }
  }
  
  // Function to handle logout
  function logout() {
    // Clear the user data from localStorage
    localStorage.removeItem('current');
  
    // Redirect to the login page or perform any other action
    console.log('Logged out successfully!');
    
    showErrorSucc(SuccessDiv2,SuccessDiv2,"Logged out successfully!")
  }
  
  // Call the necessary functions when the document is ready
  document.addEventListener('DOMContentLoaded', function() {
    updateProfileInfo();
  
    const saveInfoButton = document.getElementById('btn-saveInfo');
    const changePassButton = document.getElementById('btn-changePass-btn');
    const logoutButton = document.getElementById('btn-logout');
  
    saveInfoButton.addEventListener('click', saveProfileInfo);
    changePassButton.addEventListener('click', changePassword);
    logoutButton.addEventListener('click', logout);
  });

function showErrorSucc(errdiv,showerrdiv,err){
   
    errdiv.style.display="block";    
    showerrdiv.innerHTML=err;
        setTimeout(() => {
            errdiv.style.display="none";
        }, 5000);
        
}