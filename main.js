var tipsyApp = {};
tipsyApp.apiKey = '57f2db034880bdc5461b8164d7a33aa2';
tipsyApp.apiUrl = 'https://api.themoviedb.org/3/';
tipsyApp.imgPath = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
//get a movie based on a keyword search
tipsyApp.getMovie = function(query) {
	$.ajax({
		url: tipsyApp.apiUrl + 'search/keyword',
		method: 'GET',
		dataType: 'json',
		data: {
			api_key: tipsyApp.apiKey,
			query: query 
		}

	}).then(function(movieData) {
		console.log(movieData.results[0].id);
		tipsyApp.getMovieByKeywordID(movieData.results[0].id)
	}); 
};

tipsyApp.getMovieByKeywordID = function(keywordID){
	$.ajax({
		url: tipsyApp.apiUrl + 'keyword/'+keywordID+'/movies',
		method: 'GET',
		dataType: 'json',
		data: {
			api_key: tipsyApp.apiKey
		}
	
	}).then(function(moviesByKeyword){
		console.log(moviesByKeyword.results)
			tipsyApp.displayMovieMedia(moviesByKeyword.results)
		// var totalPages = moviesByKeyword.total_pages
	});

};

tipsyApp.displayMovieMedia = function(data) {
	$('#posterImage').empty();
	var length = data.length;
	var movieCounter = '';
	// console.log(data);
	for( var i = 0; i < length; i++){
		// console.log(data[i])
		movieCounter++;
		if (movieCounter < 4){
			var randomNumber = Math.floor( Math.random() * data.length  )
			var movieTitle = $('<h2>').text(data[randomNumber].title);
			var movieImage = $('<img>').attr('src',tipsyApp.imgPath + data[randomNumber].poster_path);	
		} else{
			return;
		}
		

		$('#posterImage').append(/*movieTitle,*/ movieImage);
	}
};

tipsyApp.init = function(){
	// tipsyApp.getMovie();
	$('#searchForm').on('submit', function(e){
		e.preventDefault();
		var searchTerm = $('input[name=searchTerm]').val();
		$('input[name=searchTerm]').val('');
		tipsyApp.getMovie(searchTerm);
	});
	$(".carousel-cell").on('click', function(){
		var search = $(this).data("drink")
		console.log(search);
		tipsyApp.getMovie(search);

		// tipsyApp.displayMovieMedia;
	});
};

$(".carousel-cell").click(function() {
    $('html,body').animate({
        scrollTop: $(".moviePreview").offset().top},
        'slow');
});

// $(".rotate").click(function() {
//     $('html,body').animate({
//         scrollTop: $(".topTitleText").offset().Top},
//         'slow');
//     console.log("WORRKYYYY")
// });

$(".rotate").click(function(){
 $(this).toggleClass("down")  ; 
 console.log("check")
});
$(".rotate").on("click", function() {
	$("html,body").animate({scrollTop:0}, 1000);
	e.preventDefault();
});
// User types in a type of alcohol into a search box (maybe its a radio or drop down)
//send request to movie database to search keywords for matching alchohol 
//randomize search results (for replayability)
// Show movies that match that search (ex vodka = spy movies[Bond, James Bond])
// Give user 3 options 
// link to itunes 
//*****BONUS***** have a random card generator
//****BONUS******  give a cheesey option (one star vs 5 star)
$(function(){
	tipsyApp.init();	
});



