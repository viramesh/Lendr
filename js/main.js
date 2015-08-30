$(document).ready(function() {
        console.log('onReady');
		$("#itemPhoto").on("change",gotPic);
        
        if(!("url" in window) && ("webkitURL" in window)) {
            window.URL = window.webkitURL;   
        }
		
});

var itemImgURL = "";
var itemsAdded = 0;
var rowsAdded = 0;
var maxItemsPerRow = 4;

function gotPic(event) {
    if(event.target.files.length == 1 && 
       event.target.files[0].type.indexOf("image/") == 0) {
        $("#itemPhotoImg").attr("src",URL.createObjectURL(event.target.files[0]));
        itemImgURL = URL.createObjectURL(event.target.files[0]);
    }
}

function showAddItem() {
    $('.add-item').removeClass("hidden");
    itemImgURL = "";
}

function cancelAddItem() {
    $('.add-item').addClass("hidden");
}

function addItemToList() {
    
    console.log("Adding item to list");
    
    /*-----
    Adding item to display 
    -----*/
    
    newItem = '<div class="three columns">' +
            '<div class="u-full-width" style="height:120px; background-size: auto 120px; background-repeat: no-repeat; background-position: center; background-color: #ECECEC; background-image:url(\''+itemImgURL+'\')"/>' +
            '<h6>'+$('#itemDesc').val()+'</h6></div>';
    
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
    
    $('.add-item').addClass("hidden");
    
    
    /*-----
    Saving item to parse file storage
    ------*/
    
    var fileUploadControl = $("#itemPhoto")[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = "photo.jpg";
      var parseFile = new Parse.File(name, file);
    }
    parseFile.save().then(function() {
      console.log("item photo saved");
      
      //adding Parse object to Items Database
      var item = new Parse.Object("Item");
      item.set("user", Parse.User.current());
      item.set("itemDesc", $("#itemDesc").val());
      item.set("itemPhoto", parseFile);
      item.set("itemPrice", $("#itemPrice").val());
      item.save();
        
    }, function(error) {
      console.log("error saving item photo: " + error);
    });
    

}

function checkForUserItems() {
    
    console.log("Checking for previous items...");
    
    var Item = Parse.Object.extend("Item");
    var query = new Parse.Query(Item);
    query.equalTo("user", Parse.User.current());
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