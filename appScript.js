

(function () {
    
    var httpRequestItemList

    function makeRequestForItemList(){
        httpRequestItemList = new XMLHttpRequest();

        if (!httpRequestItemList) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequestItemList.onreadystatechange = processItemListData;
        httpRequestItemList.open('GET', 'https://api.guildwars2.com/v2/commerce/prices');
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
    
    var itemIdNumber = itemIndex;
    var itemIndex = 0;
    
    document.getElementById('nextItem').addEventListener('click', () => {
        nextItem();
        makeRequestForTp();
        makeRequest();
    });
    document.getElementById('previousItem').addEventListener('click', () => {
        previousItem();
        makeRequestForTp();
        makeRequest();
    });


    function nextItem(){
        valueToIndex();
        getUserInput();

        itemIndex = itemIndex + 1;
        itemIdNumber = itemList[itemIndex];
        changeInputValue();
        // console.log(itemIdNumber);

        return itemIdNumber;
        
    }

    function previousItem(){
        valueToIndex();
        getUserInput();
        itemIndex = itemIndex - 1;
        itemIdNumber = itemList[itemIndex];

        // console.log(itemIdNumber);
        changeInputValue();
        return itemIdNumber;
        
    }

    function valueToIndex(){
        itemIndex = itemList.indexOf(itemIdNumber);
        // console.log(itemIndex);
        return itemIndex;
    } 


    //Get item info by ID

    var httpRequest;
    document.getElementById('ajaxButton').addEventListener('click', () => {
        getUserInput();
        makeRequestForTp();
        makeRequest();
    });

    function getUserInput(){
          //User input item ID number
        itemIdNumber = parseInt(document.getElementById('itemNumber').value);
        // console.log(itemIdNumber)
        return itemIdNumber;
    };

    function changeInputValue(){
        document.getElementById('itemNumber').value = itemList[itemIndex];
    }

    

    function makeRequest() {
        //Request to a GW2 API with item Id number
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
                // console.log(itemInfo);
                
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
            document.getElementById("itemData").innerHTML = ("Name:" + "<br>" + toUser.name + "<br>" + "Rarity:" + "<br>" + toUser.rarity + "<br>" + "Vendor value:" + "<br>" + itemPrice);
            processItemListData()


        }


        //Trading post item info

        function makeRequestForTp() {
            //Request to a GW2 API with item Id number
            httpRequestForTp = new XMLHttpRequest();
    
            if (!httpRequestForTp) {
                alert('Giving up :( Cannot create an XMLHTTP instance');
                return false;
            }
            httpRequestForTp.onreadystatechange = processTpData;
            httpRequestForTp.open('GET', 'https://api.guildwars2.com/v2/commerce/prices/' + itemIdNumber);
            httpRequestForTp.send('');
            
    
        }

        var tpItemInfo;
        var itemBuyPrice;
        var itemSellsPrice;
        
            function processTpData() {
                if (httpRequestForTp.readyState === XMLHttpRequest.DONE) {
                    //JSON to Object conversion
                    tpItemInfo = httpRequestForTp.response;
                    tpItemInfo = JSON.parse(tpItemInfo);
                    // console.log(tpItemInfo);
                    
                    if (httpRequestForTp.status === 200) {
                        calculateItemBuyPrice();
                        calculateItemSellsPrice();
                        calculateTpBuyToSellDif();
                        tpTaxFeeIfSoldBySellsPrice();
                        displayTpData()
    
                        
                    } else {
                        alert('There was a problem with a request');
                    }
                    return tpItemInfo;
                }
            }
            function calculateItemBuyPrice() {
                //Math for calculating gold, silver, copper.
                itemBuyPrice = (Math.floor(tpItemInfo.buys.unit_price / 10000) + " gold " + (Math.floor(tpItemInfo.buys.unit_price / 100) - (Math.floor(tpItemInfo.buys.unit_price / 10000)) * 100) + " silver " + (tpItemInfo.buys.unit_price - (Math.floor(tpItemInfo.buys.unit_price / 100) * 100) + " copper "));
                return itemBuyPrice;
            }

            function calculateItemSellsPrice() {
                //Math for calculating gold, silver, copper.
                itemSellsPrice = (Math.floor(tpItemInfo.sells.unit_price / 10000) + " gold " + (Math.floor(tpItemInfo.sells.unit_price / 100) - (Math.floor(tpItemInfo.sells.unit_price / 10000)) * 100) + " silver " + (tpItemInfo.sells.unit_price - (Math.floor(tpItemInfo.sells.unit_price / 100) * 100) + " copper "));
                return itemSellsPrice;
            }

            var tpPriceDif
            function calculateTpBuyToSellDif() {
                tpPriceDif = (tpItemInfo.sells.unit_price - tpItemInfo.buys.unit_price);
                tpPriceDif = (Math.floor(tpPriceDif / 10000) + " gold " + (Math.floor(tpPriceDif / 100) - (Math.floor(tpPriceDif / 10000)) * 100) + " silver " + (tpPriceDif - (Math.floor(tpPriceDif / 100) * 100) + " copper "));


                // console.log(tpPriceDif);
                return tpPriceDif;
            }

            var tpTaxFee
            function tpTaxFeeIfSoldBySellsPrice() {
                tpTaxFee = Math.round(tpItemInfo.sells.unit_price * 0.15);
                tpTaxFee = (Math.floor(tpTaxFee / 10000) + " gold " + (Math.floor(tpTaxFee / 100) - (Math.floor(tpTaxFee / 10000)) * 100) + " silver " + (tpTaxFee - (Math.floor(tpTaxFee / 100) * 100) + " copper "));
                return tpTaxFee;

            }



    
            
            function displayTpData() {
                //Creating a div element for user to see
                document.getElementById("itemTpData").innerHTML = ("Buys: "+ tpItemInfo.buys.quantity + " Items" + "<br>" + itemBuyPrice + "Sells: " + tpItemInfo.sells.quantity + " Items" + "<br>" + itemSellsPrice + "<br>" + "Price difference: " +"<br>" + tpPriceDif + "<br>" + "Tax fee if sold by sell price:" + "<br>" + tpTaxFee);
                processItemListData()
            }
    
        
}
)();



