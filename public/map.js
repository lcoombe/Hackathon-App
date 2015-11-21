var positionLat;
var positionLong;
var nextBus;
var nextLeaveTime;

var markers = [];

getLocation();

//gets your current location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("not using geolocation");
    };
};

//gets your lat and long
function showPosition(position) {
	positionLat = position.coords.latitude;
	positionLong = position.coords.longitude;
   // x.innerHTML = "Latitude: " + position.coords.latitude + 
    //"<br>Longitude: " + position.coords.longitude; 
	console.log(positionLat);
	console.log(positionLong);
};

//clears all markers off map

function clearMarkers(){
	    for(i=0; i<markers.length; i++){
	        markers[i].setMap(null);
	    
	};
};

//displays information about when the next bus will leave from a stop
function showBusInfo(bus,time, stopNumber){
	var msg = "The next "+ bus+" leaves at " + time +" from stop number " + stopNumber +"."; 
	var new_msg = $('<li>').text(msg);
	 $('#nextbus').append(new_msg);
};

$("#near-me").click(function(){
	if (positionLat == undefined || positionLong == undefined){
		var errorMessage = "Cannot get places near you, please enable Geolocation!";
		var noLocation = $("<li>").text(errorMessage);
		$('#nextbus').append(noLocation);
		return;
	};
	//getLocation();
	$.ajax({
		  type:"GET",
		  url: "https://developers.zomato.com/api/v2.1/search?lat=" + positionLat + "&lon=" + positionLong + "&radius=400&apikey=40b2fe93e6a1e1e123e6f67b846a5696",
		  success: function(data) {
			  
			  clearMarkers();
			  
			  for (var i = 0; i<data.restaurants.length; i++ ) {
				  var name = data.restaurants[i].restaurant.name;
				  var lat = data.restaurants[i].restaurant.location.latitude;
				  var long = data.restaurants[i].restaurant.location.longitude;
				  var address = data.restaurants[i].restaurant.location.address;
				  
				  var image = 'star.png';
				  var myLatlng = new google.maps.LatLng(lat, long);
				  var marker = new google.maps.Marker({
					    position: myLatlng,
					    title:name + "<br>" + address,
					    map:map,
					    icon:image
					});

					// To add the marker to the map, call setMap();
					
					
					var infoWindow = new google.maps.InfoWindow({
					});
						
					
					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.setContent(this.title);
						  infoWindow.open(map, this)
						  
						  
					  });
					  marker.setMap(map);
					  markers.push(marker);
					 // map.center = myLatlng;
					  map.panTo(myLatlng);
					  map.setZoom(15);
					  
					  //map.zoom = 20;
					  
				  console.log(lat + " " + long);
				  console.log(name);
				  
				  //console.log(rest);
			  }
			  
			  
			  
		  },
	crossDomain: true
		  
	  });
});


$("#map-click").click(function() {
	//getLocation();
	console.log("Got here!");
	var stopNum = $('#msg').val();
	console.log(stopNum);
	//setRequestHeader('Accept', "application/JSON; charset=utf-8");
	$.ajax({
		  type: "GET",
		  
		  url: "http://cors.io/?u=http://api.translink.ca/rttiapi/v1/stops/" + stopNum + "?apikey=7EbbVN4Jf3yAJSeOV59e",

		  //data: data,
		  success: function(data) {
			  clearMarkers();
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
				  url: "http://cors.io/?u=http://api.translink.ca/rttiapi/v1/stops/"+stopNum+"/estimates?apikey=7EbbVN4Jf3yAJSeOV59e&count=3&timeframe=120",
				  success: function(data) {
					  
					 console.log(data);
					 xmlDocument = $.parseXML(data);
					 $xmlDoc = $(xmlDocument);
					 $routeNum = $xmlDoc.find("RouteNo");
					 nextBus = $routeNum[0].innerHTML;
					 console.log($routeNum[0].innerHTML);
					 $expectedLeaveTime = $xmlDoc.find("ExpectedLeaveTime");
					 nextLeaveTime = $expectedLeaveTime[0].innerHTML;
					 console.log($expectedLeaveTime[0].innerHTML);
					showBusInfo(nextBus,nextLeaveTime,stopNum);
				  }	 				  
				  
			  })

			  
			  
			  $.ajax({
				  type:"GET",
				  url: "https://developers.zomato.com/api/v2.1/search?lat=" + $Lat[0].innerHTML + "&lon=" + $Long[0].innerHTML + "&radius=400&apikey=40b2fe93e6a1e1e123e6f67b846a5696",
				  success: function(data) {
					  
					  for (var i = 0; i<data.restaurants.length; i++ ) {
						  var name = data.restaurants[i].restaurant.name;
						  var lat = data.restaurants[i].restaurant.location.latitude;
						  var long = data.restaurants[i].restaurant.location.longitude;
						  var address = data.restaurants[i].restaurant.location.address;
						  
						  var myLatlng = new google.maps.LatLng(lat, long);
						  var marker = new google.maps.Marker({
							    position: myLatlng,
							    title:name +"<br>" + address,
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
							  markers.push(marker);
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
	
	
//showBusInfo();
});

