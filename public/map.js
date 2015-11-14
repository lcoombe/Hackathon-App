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
			  
			  $.ajax({
				  type:"GET",
				  url: "http://cors.io/?u=https://developers.zomato.com/api/v2.1/search?lat=49.2827&lon=-123.1207&radius=100&sort=real_distance",
				  success: function(data) {
					  var restaurants = JSON.parse(data);
					  
					  
				  }
				  
				  
				  
			  })
			  
			  
			  
			  
			  
			  
			  
			  var myLatlng = new google.maps.LatLng($Lat[0].innerHTML,$Long[0].innerHTML);
			  var marker = new google.maps.Marker({
				    position: myLatlng,
				    title:"Hello World!"
				});

				// To add the marker to the map, call setMap();
				marker.setMap(map);
		  },
		  crossDomain: true
		});
	
	

});