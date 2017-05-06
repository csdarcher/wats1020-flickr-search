// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
  var searchImages = function (tags) {
    var flickrAPI =  "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"       
   $.getJSON( flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"  
  }).done(function( data ) {
     $('#images').empty()
     $.each( data.items, function( i, item ) {
     var newListItem = $("<li>")  
     var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
     var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
     var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
     var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
				newListItem.appendTo( "#images" );
				if ( i === 15 ) {
				return false;
				}
      });
   });
	}  
    
  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    searchImages(searchTextInput.value);
  });//search button
   
});
