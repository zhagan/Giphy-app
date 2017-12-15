//--- JavaScript for ______---//

$(document).ready(function() {
	$('#images').on('click', 'img', giphy.clickImage);
	$('#images').on('dblclick', 'div', giphy.deleteImage);
	// $('#images').children().on('dblclick', giphy.deleteImage);
	giphy.start();
});

var buttonsArray = ['synths', 'lights', 'coding', 'people',
	'guitar', 'surfing'];
var key = 'VSisPgesWW7Jxx5UuqPv51qyy0OlR3s7';
var queryURL = 'https://api.giphy.com/v1/gifs/search?&api_key=' + key + '&limit=10';

var giphy = {

	start: function() {
		var addButton = $('<button>');
		addButton.attr('id', 'addButton');
		addButton.text('add');
		$(addButton).on('click', giphy.addButton);
		$('form').append(addButton);
		giphy.renderButtons();
	},

	renderButtons: function() {

		// Delete any existing buttons prior to adding new buttons
		// (this is necessary otherwise we will have repeat buttons)
		$('#buttons').empty();

		// Looping through the array of movies
		for (var i = 0; i < buttonsArray.length; i++) {

		  // Then dynamicaly generating buttons for each movie in the array.
		  // This code $('<button>') is all jQuery needs to create the start and end tag. (<button></button>)
		  var a = $('<li>');
		  var b = $('<button>');
		  $(b).on('click', giphy.clickButton);
		  // Adding a class
		  b.addClass('button');
		  // Adding a data-attribute with a value of the movie at index i
		  b.data('name', buttonsArray[i]);
		  // Providing the button's text with a value of the movie at index i
		  b.text(buttonsArray[i]);
		  // Adding the button to the HTML
		  $(a).html(b);
		  // Adding the button to the HTML
		  $('#buttons').append(a);
		}
	},

	addButton: function(event) {
		event.preventDefault();
		var input = $('#input').val();
		if (input != '') {
			buttonsArray.push(input);
			giphy.renderButtons();
		}
		$('#input').val('');

	},

	clickButton: function(event) {
		event.preventDefault();
		var query = $(this).data('name');
		queryURL += '&q=' + query;
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			var status = response.meta.status;
			if (status === 200) {
				giphy.renderImages(response.data);
			} else {
				alert('GIPHY query unsuccessful. Try again.');
			}
		});
	},

	renderImages: function(data) {
		console.log(data);
		$('#images').empty();
		$.each(data, function (i){
			// var imageContainer = $('<div id="image-container">');
			var urlStill = data[i].images.original_still.url;
			var urlAnim = data[i].images.original.url;
			var title = data[i].title;
			var rating = data[i].rating;
			var imgDiv = $('<div id="imgDiv">');
			var img = $('<img>');
			imgDiv.append(img);
			img.attr('src', urlStill);
			img.attr('data-still', urlStill);
			img.attr('data-anim', urlAnim);
			img.attr('data-title', title);
			// img.attr('figcaption', rating);
			imgDiv.append(`<h3 class="rating">${rating}</h3>`);
			$('#images').append(imgDiv);

		});
	},

	clickImage: function() {
		var img = $(this);
		var src = img.attr('src');
		var urlStill = img.attr('data-still')
		var urlAnim = img.attr('data-anim')
		if (src === urlStill) {
			img.attr('src', urlAnim);
		} else {
			img.attr('src', urlStill);
		}
	},

	deleteImage: function() {

		  var div = $(this);
		  div.hide();
		 console.log("ping");
		// var src = img.attr('src');
		// var urlStill = img.attr('data-still')
		// var urlAnim = img.attr('data-anim')
		// if (src === urlStill) {
		// 	img.attr('src', urlAnim);
		// } else {
		// 	img.attr('src', urlStill);
		// }

	},


}
