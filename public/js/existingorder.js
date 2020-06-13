$(document).ready(function () {
    console.log("i m from existingorder.js");
    $.get("/api/order").then(function (orderData) {
        console.log(orderData);
        // var newId=orderData;
        $.get(`/api/order/${orderData.id}`, function (myOrder) {
            console.log(myOrder);
            for (var i = 0; i < 5; i++) {
                var customerid = myOrder[i].CustomerId;
                var category = myOrder[i].category;
                var createdat = myOrder[i].createdAt;
                var medid = myOrder[i].med_id;
                var price = myOrder[i].med_price;
                var quantity = myOrder[i].quantity;
                var status = myOrder[i].status;
                var updatedat = myOrder[i].updatedAt;

                console.log(customerid, "this is the loop id number - ", i);
                // console.log(medid, "this is the cusotmer id for checking")
                //var newDiv = $("<div>");

                // newDiv.append(customerid, category, createdat, medid, price, quantity, status, updatedat);

                // $("#order").append(newDiv);

                var orders = $(".orderclass");
                orders.append(
                    "<div class=divclass id=order>" +
                    "<p>" +
                    "Customer Id: " +
                    customerid +
                    "</P>" +
                    "<p>" +
                    "Category: " +
                    category +
                    "</p>" +
                    "<p>" +
                    "Medicine Id: " +
                    medid +
                    "</p>" +
                    "<p>" +
                    "Price: " +
                    price +
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
                    "Order uodated at: " +
                    updatedat +
                    "<br>" +
                    "</p>" +
                    "</div>"
                );
            }
        });
    });
});