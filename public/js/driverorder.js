$(document).ready(function () {
  console.log("i m from driverorder.js");

  // $.get("/api/driverlogin").then(function (driverid) {
  //     console.log(driverid);
  //     console.log("my driver Id", driverid.id);
  //     var driverId = driverid.id;


$.get("/api/displayorder").then(function (orderDisplay) {
  console.log(orderDisplay);
  console.log(orderDisplay[0].id);
  // var driverId=o
  for (var i = 0; i < orderDisplay.length; i++) {
    var fname = orderDisplay[i].Customer.fname;
    var lname = orderDisplay[i].Customer.lname;
    var address = orderDisplay[i].Customer.street;
    var city = orderDisplay[i].Customer.city;
    var state = orderDisplay[i].Customer.state;
    var zipcode = orderDisplay[i].Customer.zipcode;
    var quantity = orderDisplay[i].quantity;
    var status = orderDisplay[i].status
    var medid = orderDisplay[i].med_id;
    var medprice = orderDisplay[i].med_price;
    var createdat = orderDisplay[i].Customer.createdAt;




    var orders = $(".orderclass");
    orders.append(
      "<div class=divclass id=order>" +
      "<p>" +
      "Customer Name: " +
      fname + lname +
      "</P>" +
      "<p>" +
      "Address: " +
      address + city + state + zipcode +
      "</p>" +
      "<p>" +
      "Medicine Id: " +
      medid +
      "</p>" +
      "<p>" +
      "Price: " +
      medprice +
      "<br>" +
      "</p>" +
      "Quantity: " +
      quantity +
      "<br>" +
      "<p>" +
      "Status: " +
      status +
      "<br>" +
      "<p>" +
      "Order ccreated at: " +
      createdat +
      "<br>" +
      "</p>" +
      ('<button class="btn btn-info btn-lg btn-block" type="button" id="assign' + [i] + '">Grab The Order</button>') +
      "</p>" +
      "</div>"
    )
  };
  //grab the order 

  $("#assign0").on("click", function () {
    console.log("i am clicked from grab the order");
    $.get("/api/driverlogin").then(function (driverid) {
      console.log(driverid);
      console.log("my driver Id", driverid.id);
      console.log("my order id", orderDisplay[0].id);
      var driverId = driverid.id;
      updateDriverOrder(driverId, orderDisplay[0].id)
      window.open("/orderStatusDriver", "_top");


    });

    function updateDriverOrder(driverId, id) {
      console.log("inside the ajax", driverId)
      $.ajax({
        method: "put",
        url: "/api/updateDriverOrder",
        data: {
          status: "driver assigned",
          DriverId: driverId,
          id: id

        }
      })
        .catch(handleLoginErr);
    };
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);

    };
  });





});
});
