// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("client"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });
  
  //for driver
  app.post("/api/driverlogin", passport.authenticate("driver"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    console.log("i m from post route of driver login")
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });
  //get request for driver id

  app.get("/api/driverlogin", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      // console.log("i m in post route");
      db.Driver.findOne({
        where: {
          id: req.user.id,
        },
      }).then(function(dbDriver) {
        res.json(dbDriver);
      });
    }
  });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.Customer.create({
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      ccard: req.body.ccard,
      PharmacyId: req.body.PharmacyId,
    })
      .then(function() {
        // res.send(dbCustomer);
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  ///inserting information of pharmacy
  app.post("/api/pharmacy", function(req, res) {
    db.Pharmacy.create({
      name: req.body.name,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state_abbr,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    }).then(function(dbPharma) {
      res.send(dbPharma);
    });
  });
  //route for driver
  app.post("/api/driver", function(req, res) {
    db.Driver.create({
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      vehicle_plate: req.body.vehicle_plate,
      driver_license: req.body.driver_license,
    }).then(function(dbDriver) {
      res.send(dbDriver);
    });
  });
  //route for order

  app.post("/api/order", function(req, res) {
    db.Order.create({
    //  order_id: req.body.order_id,
      med_id: req.body.med_id,
      med_name: req.body.med_name,
      category: req.body.category,
      quantity: req.body.quantity,
      med_price: req.body.med_price,
      status: req.body.status,
      CustomerId: req.body.CustomerId,
      DriverId: req.body.DriverId,
      PharmacyId: req.body.PharmacyId,
    }).then(function(dbPharma) {
      res.send(dbPharma);
    });
  });

   // Shivani's code - used by orderstatus.html
   app.get("/api/order/getstatus", function(req, res) {
    console.log("in api/order/getstatus - req.url holds - ", req.url);
    console.log("orderId - " + parseInt(req.query.orderId));
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // console.log("i m in post route");
      db.Order.findOne({
        where: {
          id: parseInt(req.query.orderId),
        },
        // include:[db.Customer]
      }).then(function(dbOrder) {
        console.log("dbORder holds- ", dbOrder);
        // console.log(dbOrder.user);
        res.json(dbOrder);
      });
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
    }
  });

  //Route for getting data
  app.get("/api/order/:customer_id", function(req, res) {
    // console.log(req.body);
    // console.log(res.json(req));
    // var querry={};
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // console.log("i m in post route");
      db.Order.findAll({
        where: {
          CustomerId: req.params.customer_id,
        },
        // include:[db.Customer]
      }).then(function(dbOrder) {
        // console.log(dbOrder);
        // console.log(dbOrder.user);
        res.json(dbOrder);
      });
    }
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/profile", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      // console.log("i m in post route");
      db.Customer.findOne({
        where: {
          id: req.user.id,
        },
      }).then(function(dbCustomer) {
        res.json(dbCustomer);
      });
    }
  });

  app.put("/api/update", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    if (!req.user) {
      res.json({});
    } else {
      db.Customer.update(
        {
          email: req.body.email,
          password: req.body.password,
          fname: req.body.fname,
          lname: req.body.lname,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          phone: req.body.phone,
          ccard: req.body.ccard,
          PharmacyId: req.body.PharmacyId,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      )
        .then(function(dbPost) {
          res.json(dbPost);
        })
        .catch(function(err) {
          // Whenever a validation or flag fails, an error is thrown
          // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          res.json(err);
        });
    }
  });


// New route to associate to current customer
app.get("/api/order", function(req, res) {
  if (!req.user) {
    res.json({});
  } else {
    // console.log("i m in post route");
    db.Customer.findOne({
      where: {
        id: req.user.id,
      },
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  }
})
//for driver home page

app.get("/api/displayorder", function(req, res) {
  if (!req.user) {
    res.json({});
  } else {
    // console.log("i m in post route");
    // db.Driver.findOne({
    //   where: {
    //     id:req.user.id,
    //   }
    // }) 
    db.Order.findAll({
      where: {
        DriverId: null,
      },
      include:[db.Customer]
    }).then(function(dbDriver) {
      res.json(dbDriver);
    });
  }
});

// app.get("/api/getOrderId", function(req, res) {
//   if (!req.user) {
//     res.json({});
//   } else {
//     // console.log("i m in post route");
//     // db.Driver.findOne({
//     //   where: {
//     //     id:req.user.id,
//     //   }
//     // }) 
//     db.Order.findOne({
//       where: {
//         DriverId: req.user.id,
//         status: req.body.status
//       },
//       include:[db.Customer]
//     }).then(function(dbDriver) {
//       res.json(dbDriver);
//     });
//   }
// });


//statusUpdate order from driver side

app.put("/api/updateDriverOrder", function(req, res) {
  console.log("from the api of backend", req.body);
  if (!req.user) {
    res.json({});
  } else {
    db.Order.update(
      {
        status: req.body.status,
         DriverId: req.body.DriverId,
         id: req.body.id
      },
      {
        where: {
          id: req.body.id
        },
      }
    )
      .then(function(dbStaus) {
        res.json(dbStaus);
        console.log(" from the order update from driverside", dbStaus);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  }
});

//track order from driverside(status changed after grabing)

// app.put("/api/updateOrderStatus", function(req, res) {
//   console.log("from the api delivery status");
  
//   if (!req.user) {
//     res.json({});
//   } else {
//     db.Order.update(
//       {
//         status: req.body.status,
        
      
//       },
//       {
//         where: {
//           id: req.user.id,
//           // status: "driver assigned"
//         },
//       }
//     )
//       .then(function(dbStaus) {
//         res.json(dbStaus);
//         console.log(" from the order update from driverside", dbStaus);
//       })
//       .catch(function(err) {
//         // Whenever a validation or flag fails, an error is thrown
//         // We can "catch" the error to prevent it from being "thrown", which could crash our node app
//         res.json(err);
//       });
//   }
// });


  // Route to display user name
  app.get("/api/user/", function(req, res) {
    db.Customer.findAll({
      where: {
        id: req.user.id,
      },
    }).then(function(dbCustomer) {
      res.json(dbCustomer);
    });
  });
//for delivery status for picked Up
// app.get("/api/pickedStatus", function(req, res) {
//   if (!req.user) {
//     res.json({});
//   } else {
//     // console.log("i m in post route");
//     // db.Driver.findOne({
//     //   where: {
//     //     id:req.user.id,
//     //   }
//     // }) 
//     console.log("order status from driver", req.body)
//     db.Order.findOne({
//       where: {
//         status:"driver assigned",
//       },
     
//     }).then(function(dbDriver) {
//       res.json(dbDriver);
//     });
//   }
// });


// Shivani's code - used by driverexisting.html
app.get("/api/order/unassignedorders", function(req, res) {
  console.log("in api/order/unassignedorders - req.url holds - ", req.url);
  // if (!req.user) {
  if (!req.user && denyUnauthorized) {
      // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // console.log("i m in post route");
    db.Order.findAll({
      where: {
        DriverId: null,
        CustomerId:req.user.id
                // // {
                //   $eq: null
                // }
      },
    }).then(function(dbOrder) {
      console.log("dbORder holds- ", dbOrder);
      // console.log(dbOrder.user);
      res.json(dbOrder);
    });
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
  }
});
// Shivani's code - used by driverexisting.html
app.get("/api/order/driver/:driver_id", function(req, res) {
  // if (!req.user) {
  if (!req.user && denyUnauthorized) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    console.log("retrieving past orders for driver with id - " + req.params.driver_id);
    db.Order.findAll({
      where: {
        DriverId: req.params.driver_id
      },
      // include:[db.Customer]
    }).then(function(dbOrder) {
      // console.log(dbOrder);
      // console.log(dbOrder.user);
      res.json(dbOrder);
    });
  }
});
//Route for getting data
app.get("/api/order/:customer_id", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // console.log("i m in post route");
    db.Order.findAll({
      where: {
        CustomerId: req.params.customer_id,
      },
      // include:[db.Customer]
    }).then(function(dbOrder) {
      // console.log(dbOrder);
      // console.log(dbOrder.user);
      res.json(dbOrder);
    });
  }
});


 // New route to associate to current driver
 app.get("/api/driverlogin", function(req, res) {
  if (!req.user) {
    res.json({});
  } else {
    // console.log("i m in post route");
    db.Drivers.findOne({
      where: {
        id: req.user.id,
      },
    }).then(function(dbDrivers) {
      res.json(dbDrivers);
    });
  };
})
  // Route to display driver name
  app.get("/api/driverlogin", function(req, res) {
    db.Drivers.findAll({
      where: {
        id: req.user.id,
      },
    }).then(function(dbDrivers) {
      res.json(dbDrivers);
    });
  });

  //track order from driverside(status changed after grabing)
// *****************************for order staus***********
app.put("/api/updateOrderStatus", function(req, res) {
  console.log("from the api delivery status");
  if (!req.user) {
    res.json({});
  } else {
    db.Order.update(
      {
        status: req.body.status,
        DriverId: req.body.DriverId,
      },
      {
        where: {
          // DriverId: req.body.DriverId
          id: req.body.id
        },
      }
    )
      .then(function(dbStaus) {
        res.json(dbStaus);
        console.log(" from the order update from driverside", dbStaus);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  }
});

};
 