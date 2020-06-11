$(document).ready(function(){

console.log("i m from existingorder.js");
$.get("/api/order").then(function(orderData){
    console.log(orderData);
    // var newId=orderData;
    $.get(`/api/order/${orderData.id}`,function(myOrder){
        console.log(myOrder);

    });
});
// function myOrder(){
//     $.get("/api/order/")
// }

// $.get("/api/order").then(function(orderData){
//     console.log(orderData);
// });
// var url = window.location.search;
// console.log(url);
//   var CustomerId;
//   if (url.indexOf("?customer_id=") !== -1) {
//     CustomerId = url.split("=")[1];
//     getPosts(CustomerId);
//   }
//   // If there's no authorId we just get all posts as usual
//   else {
//     getPosts();
//   }


//   // This function grabs posts from the database and updates the view
//   function getPosts(Customer) {
//     CustomerId = Customer || "";
//     if (CustomerId) {
//         CustomerId = "/?customer_id=" + CustomerId;
//     }
//     $.get("/api/order" + CustomerId, function(data) {
//       console.log("order", data);
//       console.log("customerId", CustomerId);
//       order = data;
//       if (!order || !order.length) {
//         // displayEmpty(Customer);
//       }
//       else {
//         //initializeRows();
//       }
//     });
//   }


















});