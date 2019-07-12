function GGetAPIKey() {
	key = "AIzaSyBKAtJZiDYAeh_pznT9TF2iZsekPiZxslY";
	return key;
}

function GGetDistanceMatrixEndpoint() {
	return "https://maps.googleapis.com/maps/api/distancematrix/json?";
}

function GGenerateEndpointDistanceMatrix(origins, destinations) {
	// origins = -27.497531,153.086881
	// destinations = -27.49725,153.03506;-27.55875,153.05078;-27.48627,153.02784
	// returns RESTful URL to turn into Lat/Lon coords
		
	queryParameters = {"origins": origins, "destinations": destinations, "travelMode": "driving", "output": "json", "key": BMGetAPIKey()};
	queryData = "?" + encodedQueryData(queryParameters);
	
	endpoint = GGetDistanceMatrixEndpoint();
	
	return endpoint + queryData;
}

function GGetTravelTimeBetweenLocations(origin, destination) {
    var service = new google.maps.DistanceMatrixService();
    var d = $.Deferred();
    service.getDistanceMatrix(
        {
            origins: origin,
            destinations: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
	            trafficModel: "pessimistic",
	            departureTime: new Date(Date.now())
            },
            avoidHighways: false,
            avoidTolls: false
        }, 
        function(response, status){
			if (status != google.maps.DistanceMatrixStatus.OK) {
				d.reject(status);
			} else {
				d.resolve(response);
			}
        });
    return d.promise();
}

function GReverseGeocoder(lat, lon) {
	var geocoder = new google.maps.Geocoder;
	var d = $.Deferred();
	
	var latlng = {lat: lat, lng: lon};
	
	geocoder.geocode(
		{
			'location': latlng
		}, 
		function(response, status){
			if (status != google.maps.DistanceMatrixStatus.OK) {
				d.reject(status);
			} else {
				d.resolve(response);
			}
        });
	return d.promise();
}