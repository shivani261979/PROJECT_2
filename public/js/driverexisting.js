$(document).ready(function () {
    console.log("i m from existingorder.js");
});
   // Get Driver first name and append to the #driverGreeting Div
   
   getUser();
   function getUser() {
     $.get("/api/driverlogin", function(data) {
       //console.log(data);
       //console.log(data.fname);
       var driverGreeting = "Welcome " + data.fname;
       $("#driverGreeting").append(driverGreeting);
     });
   };

function showDriverOrderHistory(driverId){
    console.log("Entered showDriverOrderHistory for driver id - " + driverId);
    $.get("/api/order/driver/"+driverId).then(function (arrOrders) {
        console.log("Fetched Orders for driver - ", arrOrders);
        var orders = $(".orderclass");
        orders.slideUp(200, function(){
            orders.empty();
            orders.append("<div><h1>Order history</h1></div>");
            if(arrOrders.length > 0)
                orders.append( buildHtmlTable(arrOrders) );
            else
                orders.append("<h3>No orders in your history.</h3>");
            orders.slideDown(500);
        });
        /*
            for (let i = 10; i < arrOrders.length; i++) {
                const curOrder = arrOrders[i];
                orders.append(
                    "<div class=divclass id=order>" +
                    "<p> Order Id: " + curOrder.id + "</P>" +
                    "<p> Customer Id: " + curOrder.CustomerId + "</P>" +
                    "<p> Category: " + curOrder.category + "</p>" +
                    "<p> Medicine Id: " + curOrder.med_id + "</p>" +
                    "<p> Price: " + curOrder.med_price + "</p>" +
                    "<p> Quantity: " + curOrder.quantity + "</p>" +
                    "<p> Status: " + curOrder.status + "</p>" +
                    "<p> Order created at: " + curOrder.createdAt + "</p>" +
                    "<p> Order uodated at: " + curOrder.updatedAt + "</p>" +
                    "</div>"
                );
            }
            */
    });
}
function showUnassignedOrders(){
    $.get("/api/order/unassigned").then(function (arrOrders) {
        console.log("Fetched Unassigned Orders: " , arrOrders);
        var orders = $(".orderclass");
        orders.slideUp(200, function(){
            orders.empty();
            orders.append("<div><h1>Orders awaiting Pickup</h1></div>");
            if(arrOrders.length > 0)
                orders.append( buildHtmlTable(arrOrders) );
            else
                orders.append("<h3>No new Orders available for pickup. Please try again.</h3><br/>");
            orders.slideDown(500);
        });
        /*
        for (var i = 0; i < 5; i++) {
            var customerid = myOrder[i].CustomerId;
            // var category = myOrder[i].category;
            var createdat = myOrder[i].createdAt;
            var medid = myOrder[i].med_id;
            // var price = myOrder[i].med_price;
            var quantity = myOrder[i].quantity;
            var status = myOrder[i].status;
            var updatedat = myOrder[i].updatedAt;
        }
        */
    });
}
// -----------    Helper method - creates table from JSON ----------
var _table_ = document.createElement('table'),
  _tr_ = document.createElement('tr'),
  _th_ = document.createElement('th'),
  _td_ = document.createElement('td');
// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
  var table = _table_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j = 0, maxj = columns.length; j < maxj; ++j) {
      var td = _td_.cloneNode(false);
      cellValue = arr[i][columns[j]];
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}
// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
  var columnSet = [],
    tr = _tr_.cloneNode(false);
  for (var i = 0, l = arr.length; i < l; i++) {
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}
