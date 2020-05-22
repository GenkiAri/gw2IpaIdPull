

(function () {
    //Item info with next & back buttons
    var httpRequestItemList
    //delete button after
    // document.getElementById('nextItem').addEventListener('click', makeRequestForItemList);

    function makeRequestForItemList(){
        httpRequestItemList = new XMLHttpRequest();

        if (!httpRequestItemList) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequestItemList.onreadystatechange = processItemListData;
        httpRequestItemList.open('GET', 'https://api.guildwars2.com/v2/items');
        httpRequestItemList.send('');

    }
    makeRequestForItemList()
    var itemList

    function processItemListData() {
        if (httpRequestItemList.readyState === XMLHttpRequest.DONE) {
            //JSON to Object conversion
            itemList = httpRequestItemList.response;
            itemList = JSON.parse(itemList);
            
            if (httpRequestItemList.status === 200) {
                
            } else {
                alert('There was a problem with a request');
            }
            return itemList;
        }
    }

    var itemIdNumber;
    var i = 0;
    
    document.getElementById('nextItem').addEventListener('click', nextItem);
    document.getElementById('previousItem').addEventListener('click', previousItem);


    function nextItem(){
        i = i + 1;
        itemIdNumber = itemList[i];

        console.log(itemIdNumber);

        return itemIdNumber;
        
    }

    function previousItem(){
        i = i - 1;
        itemIdNumber = itemList[i];

        console.log(itemIdNumber);

        return itemIdNumber;
        
    }


    //Get item info by ID

    var httpRequest;
    document.getElementById('ajaxButton').addEventListener('click', makeRequest);

    

    function makeRequest() {
        //User input item ID number
        
        itemIdNumber = parseInt(document.getElementById('itemNumber').value);

        //Request to a GW2 API
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = processData;
        httpRequest.open('GET', 'https://api.guildwars2.com/v2/items/' + itemIdNumber);
        httpRequest.send('');

    }

    var toUser;
    var itemPrice;
    
        function processData() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                //JSON to Object conversion
                itemInfo = httpRequest.response;
                toUser = JSON.parse(itemInfo);
                
                if (httpRequest.status === 200) {
                    calculateItemPrice();
                    displayData()

                    
                } else {
                    alert('There was a problem with a request');
                }
                return toUser;
            }
        }
        function calculateItemPrice() {
            //Math for calculating gold, silver, copper.
            itemPrice = (Math.floor(toUser.vendor_value / 10000) + " gold " + (Math.floor(toUser.vendor_value / 100) - (Math.floor(toUser.vendor_value / 10000)) * 100) + " silver " + (toUser.vendor_value - (Math.floor(toUser.vendor_value / 100) * 100) + " copper "));
            return itemPrice;
        }

        
        function displayData() {
            //Creating a div element for user to see
            var divUser = document.createElement("div");
            divUser.setAttribute("class", "itemData");
            divUser.innerHTML = ("Name:" + "<br>" + toUser.name + "<br>" + "Rarity:" + "<br>" + toUser.rarity + "<br>" + "Vendor value:" + "<br>" + itemPrice)
            var elem = document.getElementById("result");
            elem.parentNode.insertBefore(divUser, elem.previousSibling);
        }





        
}
)();



