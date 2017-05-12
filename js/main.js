// Fuction that pulls from Flickr API when a tag or comma-separated list is requested
$(document).on('ready', function(){
	
  var searchImages = function (tags) {
  var flickrAPI =  "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"  //location of Flickr API
		
	// JSON search that pulls from the Flickr API by looking through tags
   $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"  
		 
	// Fuction that displays search results
  }).done(function( data ) {
     $('#images').empty()
     $.each( data.items, function( i, item ) {
			 
	// The following information will be displayed with the images. The information is supplied via the Flickr API.		 
     var newListItem = $("<li>")  
     var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
     var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
     var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
     var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
				newListItem.appendTo( "#images" );
				if ( i === 15 ) { 
				return false;
				} // search will return 15 images
      });
   });
	}  
    
  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    searchImages(searchTextInput.value);
  });// search button that executes the process 
		
	
   
});

