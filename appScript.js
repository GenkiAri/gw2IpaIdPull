

(function () {
    var httpRequest;
    document.getElementById('ajaxButton').addEventListener('click', makeRequest);

    function makeRequest() {
        //User input item ID number
        var itemIdNumber
        itemIdNumber = parseInt(document.getElementById('itemNumber').value);

        //Request to a GW2 API
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = dataProcessing;
        httpRequest.open('GET', 'https://api.guildwars2.com/v2/items/' + itemIdNumber);
        httpRequest.send('');

    }


    function dataProcessing() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            //JSON to Object conversion
            itemInfo = httpRequest.response;
            var toUser = JSON.parse(itemInfo);

            extractDataFromObject();

            function extractDataFromObject() {

                calculatingItemPrice()

                function calculatingItemPrice() {
                    //Math for calculating gold, silver, copper.
                    var itemPrice = (Math.floor(toUser.vendor_value / 10000) + " gold " + (Math.floor(toUser.vendor_value / 100) - (Math.floor(toUser.vendor_value / 10000)) * 100) + " silver " + (toUser.vendor_value - (Math.floor(toUser.vendor_value / 100) * 100) + " copper "));

                    postingShowingDataToUser()

                    function postingShowingDataToUser() {
                        //Creating a div element for user to see
                        var divUser = document.createElement("div");
                        divUser.setAttribute("class", "itemData");
                        divUser.innerHTML = ("Name:" + "<br>" + toUser.name + "<br>" + "Rarity:" + "<br>" + toUser.rarity + "<br>" + "Vendor value:" + "<br>" + itemPrice)

                        var elem = document.getElementById("result");
                        elem.parentNode.insertBefore(divUser, elem.previousSibling);
                    }
                }
            }


            if (httpRequest.status === 200) {
            } else {
                alert('There was a problem with a request');
            }
        }
    }
}
)();



