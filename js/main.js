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

function addItemToList() {
    
    console.log("Adding item to list");
    
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

}