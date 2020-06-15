  // Get User first name and append to the #userGreeting Div
  $(document).ready(function(){
    console.log("Welcome to Jurrasic Park");
    getUser();
    function getUser() {
      $.get("/api/user/", function(data) {
        // console.log(data);
        console.log(data[0].fname);
        var userGreeting = "Welcome " + data[0].fname;
        $("#userGreeting").append(userGreeting);
      });
    };
  });