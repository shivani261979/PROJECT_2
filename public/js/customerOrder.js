// Get User first name and append to the #userGreeting Div
$(document).ready(function(){
  console.log("Welcome to Jurrasic Park");
  getUser();
});
$(document).on("click",".clickable-row" ,function() {
  console.log("table row clicked.")
  window.location = $(this).data("url");
});
  function getUser() {
    $.get("/api/user/", function(data) {
      // console.log(data);
      console.log(data[0].fname);
      var userGreeting = "Welcome " + data[0].fname;
      $("#userGreeting").append(userGreeting);
    });
  };
function showCustomerOrderHistory(customerId=2){
  // Customer ID should be picked up from some existing element on the CustomerOrder.html page.
  // That element should be populated when the customer logs in. The server should set customer ID on that element.
  console.log("Entered showCustomerOrderHistory for customer id - " + customerId);
  $.get("/api/order/"+customerId).then(function (arrOrders) {
      console.log("Fetched Orders for customer - ", arrOrders);
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
  });
}
// Helper Method
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
  $(tr).addClass("clickable-row");
  $(tr).attr("data-url", "customerOrderStatus.html?orderId="+arr[i].id);
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