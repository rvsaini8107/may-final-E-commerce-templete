var users = localStorage.getItem('Users');
console.log("hello")
if (!users) {
  // If no users exist, initialize an empty array
  
  var usersNew = [[{id:1,name:'avi',email:'avi@gmail.com',pass:'123'}],
  [{id:2,"fname":"ShriGanesh","lname":"Saini","email":"shriGanesh@shiva.shiva","password":"1","token":"b729b0775670bc37473c0962bb21dc88"}]];
    localStorage.setItem("users", JSON.stringify(usersNew));
    
} 
var id=2;


function validateForm(event) {
    event.preventDefault(); 
    
    
    var fname = document.getElementById('firstName-input').value;
    var lname = document.getElementById('lastName-input').value;
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    var confirmPassword = document.getElementById('confirmPassword-input').value;
    
    
    var errorSpan = document.getElementById('error-span');
    var errDiv= document.getElementById('error-div');
    var SuccessDiv= document.getElementById('successfully-div');
    
    console.log(fname,lname,email,password,confirmPassword,"namaste_Ram")
    
    if (fname === '' || lname==="" || email === '' || password === '' || confirmPassword === '') {
    //   alert('Please fill in all fields.');
    showErrorSucc(errDiv,errorSpan,"All the fields are mandatory")
    //   errDiv.style.display="block";    
    //   errorSpan.innerHTML=`All the fields are mandatory `;
    //   setTimeout(() => {
    //     errDiv.style.display="none";
    //   }, 5000);
      
      return; 
    }
    
    
    if (password !== confirmPassword) {
    //   alert('Passwords do not match.');
    showErrorSucc(errDiv,errorSpan,"Passwords do not match")
    //   errDiv.style.display="block";    
    //   errorSpan.innerHTML=`Passwords do not match.`;
    //   setTimeout(() => {
    //     errDiv.style.display="none";
    //   }, 5000);
      return; 
    }
    
    
    
    

    
    // if user exist or not
    const existingUsers = getUsers(); 
    console.log(email)
    // Check if the email already exists
    const userExists = existingUsers.some(nu => nu[0].email  === email)
    // some(use=> use.email === email);
    
    
    console.log(existingUsers)
   
    console.log(userExists)
    if (userExists) {
        showErrorSucc(errDiv,errorSpan,"User with this email already exists")
        return; 
        
    }


    var randomToken = generateRandomToken();    
    console.log(randomToken);
     
    const user=[{
        "id":++id,
        "fname":fname,
        "lname":lname,
        "email":email,
        "password":password,
        "token":randomToken
      }];

      existingUsers.push(user)
      
      console.log(existingUsers)
      localStorage.setItem("users", JSON.stringify(existingUsers));
    // saveDataToLocalStorage("user",userExists);
    //document.getElementById('form').reset();
    showErrorSucc(SuccessDiv,SuccessDiv,"Successfully Signed Up!")
    // SuccessDiv.style.display="block";    
    //  SuccessDiv.innerHTML=`Successfully Signed Up!`;
    //    setTimeout(() => {
    //      SuccessDiv.style.display="none";
    //   }, 5000);
    

      loadUrl("./login.html");
   
    
  }

//   create random token
 
function generateRandomToken() {
    var randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    
    var token = Array.from(randomBytes, function(byte) {
      return ('0' + byte.toString(16)).slice(-2);
    }).join('');
    
    return token;
  }
//   save in local storage 
  function saveDataToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
//   getDAta in local storage 
  function getDataToLocalStorage(key) {
     const value = localStorage.setItem(key);
     if(value){
        return JSON.parse(value);
     }else{
        return[];
     }
  }

// user  in localstorage 
function getUsers() {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }


function showErrorSucc(errdiv,showerrdiv,err){
    errdiv.style.display="block";    
    showerrdiv.innerHTML=err;
        setTimeout(() => {
            errdiv.style.display="none";
        }, 5000);
        
}


 function loadUrl(urlThis){
    setTimeout(() => {
        window.location.href=urlThis;
    }, 3000);
    
  }