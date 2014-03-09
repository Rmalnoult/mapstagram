
$(document).ready(function () {


	var googlemaps = {

		latitude: 1,
		longitude: 1,
		myLatlng : { },
		mosaicHover : true,
		

		initialize : function () {

			this.DisplayMap();
		},


		constructMylatlng : function () {

			// construct object with latitude and longitude coordinates
			var myLatlng = new window.google.maps.LatLng(this.latitude, this.longitude);
			this.myLatlng = myLatlng;
		},
		/**
		 * Displays map in HTML
		 */
		DisplayMap : function () {

			this.constructMylatlng();
				
			console.log(this.myLatlng);

			// options for the map
	        var mapOptions = {
	          center: this.myLatlng,
	          zoom: 2,
	          mapTypeId: google.maps.MapTypeId.HYBRID
	        };
	        console.log(mapOptions);

	        // constructs map and sends it to the DOM
	        var map = new window.google.maps.Map(document.getElementById("map_canvas"),
	            mapOptions);
	        console.log(map);

	        this.map = map;
		},

		DisplayMarker : function () {

	        this.constructMylatlng();

	        // constructs a marker and displays in on the map
	        var myMarker = new window.google.maps.Marker({
	        	position : this.myLatlng,
	        	map : this.map,	
	        	icon : 'http://www.msccroisieres.be/be_fr/Images/Instagram_Icon_32x32_tcm17-74869.png',
	        	title: pearlstagram.caption,
	        	number: pearlstagram.i,
	        	photo : pearlstagram.photoUrl,
	        	caption : pearlstagram.caption,
	        	animation : google.maps.Animation.DROP
	        });


	        this.myMarker = myMarker;

	        this.displayMosaic(myMarker);

	        this.onMarkerClick(myMarker);

		},

		displayMosaic : function(myMarker){

			var thumbnail;
		 	$('#aside').addClass('active');
		 	$('#aside').addClass('mosaic');
		 	$('#image ul').append('<li><img class="thumbnail" src="' + myMarker.photo + '"/></li>');
		 	thumbnail = $('#image ul li:last-child');

		 	console.log(thumbnail);

		 	this.onMosaicClick(myMarker, thumbnail);
		 	this.onMosaicHover(myMarker, thumbnail);

		},

		onMosaicHover : function(myMarker, thumbnail){
		 	
			

		 	$(thumbnail).hover($.proxy(
		 		function(){
	   			 	myMarker.setAnimation(google.maps.Animation.BOUNCE);
	   			 	setTimeout(function(){
	   			 		myMarker.setAnimation(null)
	   			 	}, 2000);
	   			},this), 500);


		},

		onMosaicClick : function(myMarker, thumbnail) {

		 	$(thumbnail).on('click', $.proxy(
		 		function(){
		 			myMarker.setAnimation(google.maps.Animation.DROP);
		 			this.map.setCenter(myMarker.getPosition());
		 			this.map.setZoom(4);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(6)
	   			 	},this), 1000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(8)
	   			 	},this), 2000);	
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(10)
	   			 	},this), 3000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(12)
	   			 	},this), 4000);	  
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(14)
	   			 	},this), 5000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(16)
	   			 	},this), 6000);	
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(18)
	   			 	},this), 7000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(20)
	   			 	},this), 8000);

		 	
		 		}, this));
		 	
		},

		onMarkerClick : function(myMarker) {

	        google.maps.event.addListener(myMarker, 'click', function() {
    			// this.map.setZoom(2);
   			 	this.map.setCenter(myMarker.getPosition());
   			 	myMarker.setAnimation(google.maps.Animation.BOUNCE);
   			 	setTimeout(function(){
   			 		myMarker.setAnimation(null)
   			 	}, 5000);

   			 		setTimeout($.proxy(function(){
	   			 		this.map.setZoom(6)
	   			 	},this), 1000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(8)
	   			 	},this), 2000);	
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(10)
	   			 	},this), 3000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(12)
	   			 	},this), 4000);	  
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(14)
	   			 	},this), 5000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(16)
	   			 	},this), 6000);	
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(18)
	   			 	},this), 7000);
	   			 	setTimeout($.proxy(function(){
	   			 		this.map.setZoom(20)
	   			 	},this), 8000);
   			 	$('#aside').addClass('active');
   			 	$('#aside').removeClass('mosaic');
   			 	$('#image').empty();
   			 	$('#image').append('<img src="' + myMarker.photo + '"/>');
   			 	$('#image').append('<p class="caption">' + myMarker.caption + '</p>');
 			 });
		}
	};


	var pearlstagram = {

		choice: 'bikini',
		markerIcon : ' ',
		caption: ' ',
		photoUrl : ' ',
		result : { },
		j : 0,
		numberOfPics : 30,
		next_url : ' ',


		initialize: function () {

			console.log('hello world');
			this.startListening();
			this.search(this.choice);

		},

		// events listening
		startListening: function () {

			$('#search').on('click', $.proxy(this.onSearch, this)); // on a click on the submit button, functions stores what the user typed in the input and saves it as a parameter for the search function
			
		},


		// events handling

		onSearch : function () {

			// clears the map
			$('#map_canvas').empty();
			$('#image ul').empty();	
			this.j = 0;			
			// gets the input from the user 
			this.choice = $('#userinput').val(); 
			console.log(this.choice);
			this.search(this.choice);     // plays the search function
		},

		onTagSearch: function (e) {


			console.log ('onTagSearch works');
			e.preventDefault();
			var tag = $(e.currentTarget);
			this.choice = tag.text();
			console.log(this.choice);
			this.search();
		},


		// actions


		search: function () {
			$.ajax({                  // method ajax to do the query (the method we had seen in class didn't seem to work, I found this method on some forums)
				url: 'https://api.instagram.com/v1/tags/' + this.choice + '/media/recent?access_token=32168991.82908a0.5f31d75438944306a39a0ded8af7204e&count=50', // asks instagram for one picture with the tag the user chooses (choice)
				dataType: 'jsonp'  // asks for json
			})
			.done($.proxy(function (r) {  // when the query is done, play this function

				var result = r.data; // stores the object returned by api in a variable
				console.log(r);

				this.next_url = r.pagination.next_url;
				console.log(this.next_url);
				console.log(result); 

				this.result = result;
				// displaying the map
				
				googlemaps.initialize();				

				this.extractingData();				

			}, this));
		},

		extractingData : function () {

				result = this.result;
				//running through the pictures returned by api to find pics with location enabled
				//and displaying a marker for each one
				for (var i in result) {


					console.log(result[i].location);
					// testing if location information exists with the pic
					if (result[i].location !== null) {

						this.j++;
						console.log(this.j);
						var photolatitude = result[i].location.latitude;
						var photolongitude = result[i].location.longitude;

						this.markerIcon = result[i].images.thumbnail.url;
						if (result[i].caption !== null) {
							this.caption = result[i].caption.text;
						} else {
							this.caption = ' ';
						};
						this.photoUrl = result[i].images.standard_resolution.url;
						//sending the variables to googlemaps object
						googlemaps.latitude = photolatitude;
						console.log(photolatitude);
						googlemaps.longitude = photolongitude;

						googlemaps.DisplayMarker();
					}

				}

				if (this.j < this.numberOfPics) {
					$.ajax({                  
						url: this.next_url, // asks instagram for one picture with the tag the user chooses (choice)
						dataType: 'jsonp'  // asks for json
					})
					.done($.proxy(function (r) {  // when the query is done, play this function

						this.result = r.data;
						//$('this.result').extend(r.data); // stores the object returned by api in a variable
						this.next_url = r.pagination.next_url;
						console.log(result); 				

						this.extractingData();

					}, this));
				}
		}
	};




	var twittersearch = {

		tweets : [ ],

		tweetText : " ",

		keyword : " ",

		initialize: function () {
			this.startListening();
		},

	// EVENTS LISTENING
		
		// starts listening for clicks on the search button
		startListening: function () {
			$('#search').on('click', $.proxy(this.onSearchTweets, this));
		},


	// EVENTS HANDLING

		/**
		 * Stores the input of the user in var keyword
		 * 
		 */
		onSearchTweets : function () {
			this.keyword = $('#userinput').val();
			this.getTweets();
		},

		/**
		 * gets the tweet query from tweetsearch.php and stores it in var tweets
		 * 
		 */
		getTweets: function () {
			$.ajax( {
				url: 'tweetsearch.php',
				dataType: 'json',
				data: {
					keyword: this.keyword
				}
			})
			.done($.proxy(function(data){
				console.log(data);
   			 	this.tweets = data.statuses;
   			 	console.log(this.tweets);
   			 	this.displayTweets()
   			 }, this));
		},

	// ACTIONS

		/**
		 * clean the ul where tweets will arrive
		 * sends the username, profile pic and text of each tweet
		 */
		displayTweets : function () {

			console.log(this.tweets);
			$('#twitterfeed ul').empty();
			
			for (var i in this.tweets) {
				this.tweetText = this.tweets[i].text;
				this.tweetUsername = this.tweets[i].user.name;
				this.tweetProfilePic = this.tweets[i].user.profile_image_url;


				$('#twitterfeed ul').append("<li class='username'>" + this.tweetUsername + "</li>");
				$('#twitterfeed ul').append('<li> <img src"' + this.tweetProfilePic + '"/></li>');
				$('#twitterfeed ul').append("<li class='tweettext'>" + this.tweetText + "</li>");
			};

		},	
	}	



pearlstagram.initialize();


// googlemaps.initialize();



});

