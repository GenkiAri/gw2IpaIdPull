

(function() {
    var httpRequest;
    document.getElementById('ajaxButton').addEventListener('click', makeRequest);

    function makeRequest() {
        var itemIdNumber
        itemIdNumber = parseInt(document.getElementById('itemNumber').value);

        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', 'https://api.guildwars2.com/v2/items/' + itemIdNumber);
        httpRequest.send('');
        

    }
    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            itemInfo = httpRequest.response;
            var toUser = JSON.parse(itemInfo);

            var divUser = document.createElement("div");
            divUser.setAttribute("class","itemData");
            
            var itemPrice = (Math.floor(toUser.vendor_value / 10000)  + " gold " + Math.floor(toUser.vendor_value / 100)  + " silver " + (toUser.vendor_value - (Math.floor(toUser.vendor_value / 100) * 100)  + " copper "));

            divUser.innerHTML = ("Name:" + "<br>" + toUser.name + "<br>" + "Rarity:" + "<br>" + toUser.rarity + "<br>" + "Vendor value:" + "<br>" + itemPrice)

            var elem = document.getElementById("result");
            elem.parentNode.insertBefore(divUser, elem.previousSibling);
    

            // console.log(toUser)

            if (httpRequest.status === 200) {
             }  else {
                    alert('There was a problem with a request');
                }
            }
        }
    }
)();


