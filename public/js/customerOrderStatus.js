// pulling order id from query params
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const orderStatus = [ 'Order Confirmed', 'Order Picked up', 'Driver en-route', 'Order Delivered' ];
    $(document).ready(function () {
            // updates orderId in title.
        document.getElementById("orderId").innerHTML = orderId;
        setTimeout(checkOrderStatus, 1000); // run after 1 second.
        setInterval(checkOrderStatus, 15000);   // then check every 15 seconds
    });
    function checkOrderStatus(){
        if(!orderId)
            return alert("Please provide order Id in url query");
        $.get('/api/order/getstatus', {'orderId':orderId}, function (data, textStatus, jqXHR) {
            if( data && data.hasOwnProperty("status") ){
                console.log("Will update status of order");
                updateOrderStatus( data.status.toLowerCase() );
            } else{
                console.log("Skip status update. data holds - " , data);
            }
        });
    }
    function updateOrderStatus(status){
        console.log("entered updateOrderStatus with status as - " + status);
        let items = $('#orderProgress li');
        console.log("Before reset, li items holds - ", items);
        let foundAtPos = 0;
        for(let x=0; x < orderStatus.length; x++){
            if(orderStatus[x].toLowerCase() == status){
                foundAtPos = x;
                break;
            }
        }
        console.log("Order status found at li position - " + foundAtPos);
        resetStatus(items);
        console.log("After reset li items holds - ", items);
            // update UI with order status
        for(let x=0; x < items.length; x++){
            if(foundAtPos > x){
                $('#orderProgress li').eq(x).addClass("completed");
                // $(items[x]).addClass("completed");
                console.log("setting item as completed - " , $('#orderProgress li').eq(x));
            } else if(foundAtPos === x){
                $('#orderProgress li').eq(x).addClass("active");
                // $(items[x]).addClass("active");
                console.log("setting item as active - " , $('#orderProgress li').eq(x));
            }
        }
        console.log("After setting status li items - ", items);
    }
    function resetStatus(items){
        for(let x=0;x < items.length; x++){
            console.log("Resetting item - ", $('#orderProgress li').eq(x));
            $('#orderProgress li').eq(x).removeClass('active completed');
        }
    }