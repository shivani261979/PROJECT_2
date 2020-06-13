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

  app.get("/signupdriver", function (req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signupdriver.html"));
  });


};
