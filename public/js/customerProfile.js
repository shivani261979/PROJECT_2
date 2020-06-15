$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  console.log("i m from profile.js");
  $.get("/api/profile").then(function (result) {
    console.log(result);
    console.log(result.email);
    document.getElementById("firstName").value = result.fname;
    document.getElementById("lastName").value = result.lname;
    document.getElementById("inputemails").value = result.email;
    document.getElementById("inputPassword").value = result.password;
    document.getElementById("inputAddress").value = result.street;
    document.getElementById("inputCity").value = result.city;
    document.getElementById("inputState").value = result.state;
    document.getElementById("inputZip").value = result.zipcode;
    document.getElementById("inputPhone").value = result.phone;
    document.getElementById("inputCredit").value = result.ccard;
    document.getElementById("inputPharma").value = result.PharmacyId;


  });
  var updateId = $("#updateId");
  var emailInput = $("input#inputemails");
  var passwordInput = $("input#inputPassword");
  var firstNameInput = $("input#firstName");
  var lastNameInput = $("input#lastName");
  var streetInput = $("input#inputAddress");
  var cityInput = $("input#inputCity");
  var stateInput = $("input#inputState");
  var zipInput = $("input#inputZip");
  var phoneInput = $("input#inputPhone");
  var creditInput = $("input#inputCredit");
  var pharmaIdInput = $("input#inputPharma");
  updateId.click(function (event) {
    event.preventDefault();
    alert("i m clicked from profile ")
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: firstNameInput.val().trim(),
      lname: lastNameInput.val().trim(),
      street: streetInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zipcode: zipInput.val().trim(),
      phone: phoneInput.val().trim(),
      ccard: creditInput.val().trim(),
      PharmacyId: pharmaIdInput.val().trim()
    };
    console.log("update data", userData);
    if (!userData.email || !userData.password) {
      return;
    }
    updateUser(userData.email, userData.password, userData.fname, userData.lname, userData.street, userData.city, userData.state, userData.zipcode, userData.phone, userData.ccard, userData.PharmacyId);
    emailInput.val("");
    passwordInput.val("");
    firstNameInput.val("");
    lastNameInput.val("");
    streetInput.val("");
    cityInput.val("");
    stateInput.val("");
    zipInput.val("");
    phoneInput.val("");
    creditInput.val("");
    pharmaIdInput.val("");

  });


  function updateUser(email, password, firstName, lastName, street, city, state, zip, phone, credit, PharmacyId) {
    $.ajax({
      method: "put",
      url: "/api/update",
      data: {
        email: email,
        password: password,
        fname: firstName,
        lname: lastName,
        street: street,
        city: city,
        state: state,
        zipcode: zip,
        phone: phone,
        ccard: credit,
        PharmacyId: PharmacyId
      }
    })
      .then(function (data) {
        console.log("second data display", data);
        window.location.replace("/order");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
  }
});


