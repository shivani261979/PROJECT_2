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
    res.sendFile(path.join(__dirname, "../public/customerSignup.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/order");
    }
    res.sendFile(path.join(__dirname, "../public/customerLogin.html"));
  });

  app.get("/neworder", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/customerNewOrder.html"));
  });


  app.get("/profile", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/customerProfile.html"));
  });


  app.get("/order", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/customerOrder.html"));
  });

  app.get("/existingOrder", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/customerExistingOrder.html"));
  });

  app.get("/track", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customerOrderStatus.html"));   
  })
    // Shivani's code - for serving orderstatus.html
  app.get("/orderStatus", isAuthenticated , function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    // }
    res.sendFile(path.join(__dirname, "../public/driverOrderStatus.html"));
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
    res.sendFile(path.join(__dirname, "../public/driverSignup.html"));
  });

  app.get("/logindriver", function (req, res) {
    if (req.user) {
      res.redirect("/driverOrders");
    }
    res.sendFile(path.join(__dirname, "../public/driverLogin.html"));
  });
  
  app.get("/driverOrders", isAuthenticated , function(req, res) {
  
    res.sendFile(path.join(__dirname, "../public/driverOrders.html"));
  });

   
  app.get("/orderStatusDriver", isAuthenticated , function(req, res) {
  
    res.sendFile(path.join(__dirname, "../public/driverOrderStatus.html"));
  });
  
  app.get("/driverSelect", isAuthenticated , function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driverOrderSelect.html"));
  });



};

