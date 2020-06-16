$(document).ready(function() {
    $('#listOne').addClass("completed");
   console.log("i m ", localStorage.getItem('pid'));
    $.get("/api/driverlogin").then(function (driverid) {
      console.log(driverid);
      console.log("driver id: ", driverid.id);
  // console.log(updateDriverOrder);
  console.log("i m from orderStatusDriver.js file")
  $("#listTwo").on("click", function () {
      $('#listTwo').addClass("completed");
  var status="picked up";
  update(status, driverid.id, localStorage.getItem('pid'));
  });
  $("#listThree").on("click", function () {
      $('#listThree').addClass("completed");
  var status="on the way";
  update(status, driverid.id, localStorage.getItem('pid'));
  });
  $("#listFour").on("click", function () {
      $('#listFour').addClass("completed");
  var status="delivered";
  update(status, driverid.id,localStorage.getItem('pid'));
  });
  function update(status,Driverid,proId) {
      // console.log("inside the ajax", driverId)
      $.ajax({
        method: "put",
        url: "/api/updateOrderStatus",
        data: {
          status: status,
          DriverId: Driverid,
          id: proId
        }
      })
        .catch(handleLoginErr);
    };
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
    };
  });
  });