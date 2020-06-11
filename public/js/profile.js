$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    console.log("i m from profile.js")
    $.get("/api/user_data").then(function(result) {
      console.log(result);
      console.log(result.data.email);
      // $("#inputemails").value(result.data.email);
      document.getElementById("firstName").value=result.data.fname;
      document.getElementById("lastName").value=result.data.lfame;
      document.getElementById("inputemails").value=result.data.email;
      document.getElementById("inputPassword").value=result.data.password;
      document.getElementById("inputAddress").value=result.data.street;
      document.getElementById("inputCity").value=result.data.city;
     document.getElementById("inputState").value=result.data.state;
     document.getElementById("inputZip").value=result.data.zipcode;
     document.getElementById("inputPhone").value=result.data.phone;
     document.getElementById("inputCredit").value=result.data.ccard;
     document.getElementById("inputPharma").value=result.data.PharmacyId;
   

    });
  
  var updateId= $("#updateId");
    var emailInput = $("#inputemails");
    var passwordInput = $("#inputPassword");
    var firstNameInput=$("#firstName");
    var lastNameInput=$("#lastName");
    updateId.click(function(event) {
      event.preventDefault();
      alert("i am clicked");
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim(),
        first_name: firstNameInput.val().trim(),
        last_name: lastNameInput.val().trim()
      };
      console.log("update data",userData);
  
      // if (!userData.email || !userData.password) {
      //   return;
      // }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.first_name, userData.last_name);
      emailInput.val("");
      passwordInput.val("");
      firstNameInput.val("");
      lastNameInput.val("");
  
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, firstName, lastName) {
      $.ajax( {
        method:"put",
        url:"/api/update",
  
        data:{
          email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
  
        }
        
      })
        .then(function(data) {
          console.log(data);
          //  window.location.replace("/");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      // $("#alert").fadeIn(500);
    }
  });
  
  
  