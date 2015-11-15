$("#map-click").click(function() {
	console.log("Got here!");
	var stopNum = $('#msg').val();
	console.log(stopNum);
	//setRequestHeader('Accept', "application/JSON; charset=utf-8");
	$.ajax({
		  type: "GET",
		  
		  url: "http://cors.io/?u=http://api.translink.ca/rttiapi/v1/stops/" + stopNum + "?apikey=7EbbVN4Jf3yAJSeOV59e",

		  //data: data,
		  success: function(data) {
			  console.log(data);
			  xmlDoc = $.parseXML( data ),
			  $xml = $( xmlDoc ),
			  $Lat = $xml.find( "Latitude" );
			  console.log($Lat[0].innerHTML);
			  $Long = $xml.find("Longitude");
			  console.log($Long[0].innerHTML);
			  
			  var LatVal = $Lat[0].innerHTML;
			  var LongVal = $Long[0].innerHTML;
			  
			  $.ajax({
				  type:"GET",
				  url: "https://developers.zomato.com/api/v2.1/search?lat=" + $Lat[0].innerHTML + "&lon=" + $Long[0].innerHTML + "&radius=400&apikey=40b2fe93e6a1e1e123e6f67b846a5696",
				  success: function(data) {
					  
					  for (var i = 0; i<data.restaurants.length; i++ ) {
						  var name = data.restaurants[i].restaurant.name;
						  var lat = data.restaurants[i].restaurant.location.latitude;
						  var long = data.restaurants[i].restaurant.location.longitude;
						  
						  var myLatlng = new google.maps.LatLng(lat, long);
						  var marker = new google.maps.Marker({
							    position: myLatlng,
							    title:name,
							    map:map
							});

							// To add the marker to the map, call setMap();
							
							
							var infoWindow = new google.maps.InfoWindow({
							});
							
							
							
							google.maps.event.addListener(marker, 'click', function() {
								infoWindow.setContent(this.title);
								  infoWindow.open(map, this)
								  
								  
							  });
							  marker.setMap(map);
							 // map.center = myLatlng;
							  map.panTo(myLatlng);
							  map.setZoom(15);
							  
							  //map.zoom = 20;
							  
						  console.log(lat + " " + long);
						  console.log(name);
						  
						  //console.log(rest);
					  }
					  
					  
					  
					  
					  
				  }
				  
				  
				  
			  })
			  
			  
			  
			  
			  
			  
		  },
		  crossDomain: true
		});
	
	

});