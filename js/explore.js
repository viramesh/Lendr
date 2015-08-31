$(document).ready(function() {
        console.log('onReady');
		showAllItems();
		
});

var itemImgURL = "";
var itemsAdded = 0;
var rowsAdded = 0;
var maxItemsPerRow = 4;

function showAllItems() {
    
    console.log("Showing all items...");
    
    var Item = Parse.Object.extend("Item");
    var query = new Parse.Query(Item);
    query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length + " items.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log("Adding " + object.get("itemDesc") + " to the list");
            
            var itemDesc = object.get("itemDesc");
            var itemImgURL = object.get("itemPhoto").url();
            
            newItem = '<div class="three columns">' +
            '<div class="u-full-width" style="height:120px; background-size: auto 120px; background-repeat: no-repeat; background-position: center; background-color: #ECECEC; background-image:url(\''+itemImgURL+'\')"/>' +
            '<h6>'+itemDesc+'</h6></div>';
    
            if(itemsAdded < maxItemsPerRow) {
                $('.row-'+rowsAdded+'').append(newItem);
                itemsAdded++;
            }

            else {
                rowsAdded++;
                itemsAdded=0;
                newRowItem = '<div class="row row-'+rowsAdded+'"> ' +
                            newItem +
                            '</div';

                $('.list-items-added').append(newRowItem);
            } 
        }
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
    
    
    
}