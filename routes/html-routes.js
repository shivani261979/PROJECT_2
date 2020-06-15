// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/signup", function (req, res) {
    if (req.user) {
      res.redirect("/order");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/order");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/neworder", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/neworder.html"));
  });


  app.get("/profile", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });


  app.get("/order", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/order.html"));
  });

  app.get("/existingOrder", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/existingorder.html"));
  });

    // Shivani's code - for serving orderstatus.html
  app.get("/orderStatus", isAuthenticated , function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    // }
    res.sendFile(path.join(__dirname, "../public/orderstatus.html"));
  });

  app.get("/images/:imageFilename", function(req,res){

    res.sendFile(path.join(__dirname, "../images/" + req.params.imageFilename));
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
// ***************** path for driver*********************************
  app.get("/signupdriver", function (req, res) {
    if (req.user) {
      res.redirect("/driverWelcomePage");
    }
    res.sendFile(path.join(__dirname, "../public/signupdriver.html"));
  });

  app.get("/driverlogin", function (req, res) {
    if (req.user) {
      res.redirect("/driverWelcomePage");
    }
    res.sendFile(path.join(__dirname, "../public/logindriver.html"));
  });
  
  app.get("/driverHome", isAuthenticated , function(req, res) {
  
    res.sendFile(path.join(__dirname, "../public/driverHome.html"));
  });

   
  app.get("/orderStatusDriver", isAuthenticated , function(req, res) {
  
    res.sendFile(path.join(__dirname, "../public/orderStatusDriver.html"));
  });
  
  app.get("/driverWelcomePage", isAuthenticated , function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driverWelcomePage.html"));
  });



};

