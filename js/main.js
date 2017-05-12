$(document).on('ready', function(){
	
//Fuction that pulls from Flickr API when a tag or comma-separated list is requested
  var searchImages = function (tags) {
  var flickrAPI =  "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"  //location of Flickr API
		
	// JSON call that pulls from the Flickr API by looking through tags
   $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"  
		 
	// Fuction that displays search results and refreshes when new parameters are entered
  }).done(function( data ) {
     $('#images').empty()
     $.each( data.items, function( i, item ) {
			 
	// The following information will be displayed with the images. The information is supplied via the Flickr API.		 
     var newListItem = $("<li>")  
     var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
     var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
     var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
     var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
			
			 // Change the display to add the images to the list
				newListItem.appendTo( "#images" );
				if ( i === 15 ) { 
				return false;
				} // search will return 15 images
      });
   });
	}  
  
	// search button that executes the process when clicked
  $('button.search').on('click', function(event){
    event.preventDefault();
		
		// Part of code that addresses the user inputting their tag or comma seperated list that is used for the image search
		// Function retrieves images for the user
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    searchImages(searchTextInput.value);
  });
		
	
   
});
