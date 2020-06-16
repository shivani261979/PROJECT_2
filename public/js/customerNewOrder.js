$(document).ready(function() {
  // $.get("/api/order").then(function (orderData) {
  //   console.log(orderData, "Im from backend");
  //   console.log("customer id: ", orderData.id);
  //   console.log("pharmacy id: ", orderData.PharmacyId);
  // });
  //select the POPUP FRAME and show it
  $("#popup")
    .hide()
    .fadeIn(1000);
  $("#close").on("click", function(e) {
    e.preventDefault();
    $("#popup").fadeOut(1000);
  });
});
function goBack() {
  window.history.back();
  return false;
}
// Click on button to start API Call
$("#search").on("click", function(event) {
  event.preventDefault();
  $("#results").empty();
  var searchInput = $("#order").val();
  console.log(searchInput);
  if (searchInput === "") {
    alert("Please search a product");
    return;
  } else {
    var medSearch = {
      async: true,
      crossDomain: true,
      url: `https://walgreens.p.rapidapi.com/products/list?sort=Relevance&q=${searchInput}&p=1&id=359438&s=5`,
      // &id=359441
      method: "GET",
      headers: {
        "x-rapidapi-host": "walgreens.p.rapidapi.com",
        "x-rapidapi-key": "07434bd009msh94bbe003962fff9p1a0a71jsn3fee731c31ab",
      },
    };
    // Response to append results
    $.ajax(medSearch).then(function(response) {
      console.log(response);
      if (response.products === undefined) {
        alert(response.messages[0].message + " Try again.");
      } else {
        // Loop through the response to get appropriate data
        for (var i = 1; i < response.products.length; i++) {
          // Product ID
          var proId = response.products[i].productInfo.prodId;
          // Product Display Name
          var proName = response.products[i].productInfo.productDisplayName;
          // Product Img
          var proImglink = "https:" + response.products[i].productInfo.imageUrl;
          // var proImg = $("<img src=" + proImglink + ">");
          var imgDiv = $(
            "<div class='mt-2 mb-2'><img src='" + proImglink + "'></div>"
          );
          // Product Rating
          var proRating =
            "Item rating: " +
            response.products[i].productInfo.reviewHoverMessage;
          var proRatingGif =
            response.baseUrl + response.products[i].productInfo.reviewURL;
          var ratingsGif = $("<img src=" + proRatingGif + " class='mb-3'>");
          // Product Price Html
          var proPriceHtml =
            response.products[i].productInfo.priceInfo.regularPriceHtml;
          // console.log("Product Price : ", proPrice);
          // Product Price
          var proPrice =
            response.products[i].productInfo.priceInfo.regularPrice;
          // New Div
          var newDiv = $("<div class='mt-5 mb-3 resultsLoop'>");
          if (proPrice === undefined) {
            var proPriceMsg = $(
              "<div id='proMessageAPI'>Priced Per Store</div>"
            );
            var proMsg = $(
              "<div class='mt-2 proMessage'>Sorry, GetMed is unable to get this med for you. Please visit your local store for product availability and pricing info.</div>"
            );
            newDiv.append(nameDiv, imgDiv, proPriceMsg, proMsg);
            $("#results").append(newDiv);
          } else {
            var sqlId = $(
              "<div id='item" +
                [i] +
                "' value='" +
                proId +
                "' style='display:none'>Product id: " +
                proId +
                "</div>"
            );
            // var proNameValue = proName.replace(/ /g,"");
            var proNameDivHide = $(
              "<div id='name" +
                [i] +
                "' value='" +
                proName +
                "' style='display:none'>" +
                proName +
                "</div>"
            );
            // console.log("Product Name : ", proName);
            var ratingsDiv = $(
              "<div id='ratings" +
                [i] +
                "' class='mt-3 mb-1'>" +
                proRating +
                " </div>"
            );
            var proPriceFinal = $(
              "<div id='price" +
                [i] +
                "' value='" +
                proPrice +
                "'>Item Price: " +
                proPriceHtml +
                "</div>"
            );
            var quantity = $(
              '<form id="quantityResponse"><div class="form-group"><label for="exampleFormControlSelect1">Quantity</label><select class="form-control" id="quantityBtn' +
                [i] +
                '"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div></form>'
            );
            var buyBtn = $(
              '<button class="btn btn-info btn-lg btn-block" type="button" id="buy' +
                [i] +
                '">Buy</button>'
            );
            newDiv.append(
              proName,
              proNameDivHide,
              imgDiv,
              ratingsDiv,
              ratingsGif,
              proPriceFinal,
              quantity,
              sqlId,
              buyBtn
            );
            $("#results").append(newDiv);
          }
        }
        // WILL REVISIT FOR LOOP
        for (var i = 1; i < 6; i++) {
          (function(index) {
            $("#buy" + index).on("click", function() {
              console.log("you clicked on this button " + "#buy" + index);
              $.get("/api/order").then(function(orderData) {
                // From API
                // quantity
                var sqlQuantity = $("#quantityBtn" + index).val();
                console.log("quantity: ", sqlQuantity);
                // price
                var attrPrice = $("#price" + index).attr("value");
                // console.log(attrPrice);
                // drop "$" and float price for table
                var sqlPrice = parseFloat(attrPrice.slice(1));
                console.log("price: ", sqlPrice);
                // item id
                var sqlProId = $("#item" + index).attr("value");
                console.log("med id: ", sqlProId);
                // item name
                var sqlProName = $("#name" + index).attr("value");
                console.log("med name: ", sqlProName);
                updateOrder(
                  sqlProId,
                  sqlProName,
                  sqlQuantity,
                  sqlPrice,
                  orderData.id,
                  orderData.PharmacyId
                );
              });
              // Post to database
              function updateOrder(
                medId,
                medName,
                qty,
                medPrice,
                custId,
                pharmId
              ) {
                $.ajax({
                  method: "post",
                  url: "/api/order",
                  data: {
                    med_id: medId,
                    med_name: medName,
                    category: "medicine",
                    quantity: qty,
                    med_price: medPrice,
                    status: "order placed",
                    CustomerId: custId,
                    PharmacyId: pharmId,
                  },
                  success: function(){
                    $(".StatusMessage").text("Item '" + medName + "' purchased. \n Redirecting to Customer Home in 3 seconds.");
                    $(".StatusMessage").fadeIn(500);
                    setTimeout(function(){
                      window.location.replace("customerOrder.html");
                    }, 4000);
                  }
                })
                  .catch(handleLoginErr);
              }
              function handleLoginErr(err) {
                $("#alert .msg").text(err.responseJSON);
                // $("#alert").fadeIn(500);
              }
            });
          })(i);
        }
      }
    });
  }
});