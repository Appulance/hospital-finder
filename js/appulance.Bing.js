function BMGetAPIKey() {
	var key = "AhHbuYaU-D_6ki9SQ87JHitZF-jLen3qdMZGrQmkwfWyXlXEQnLwQlJJyDlsbfuE";
	return key;
}

function BMGetLocationsEndpoint() {
	return "https://dev.virtualearth.net/REST/v1/Locations/";
}

function BMGetDistanceMatrixEndpoint() {
	return "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix";
}

function BMGenerateEndpointAddressToLatLon(address) {
	// address = new Address("AU", "QLD", "Kewarra Beach", "25 Wagtail Close");
	// returns RESTful URL to turn into Lat/Lon coords
	
	country = address.country;
	state = address.state;
	suburb = address.suburb;
	address = address.address;
	
	queryParameters = {"output": "json", "key": BMGetAPIKey()};
	queryData = "?" + encodeQueryData(queryParameters);
	
	endpoint = BMGetLocationsEndpoint();
	
	addressString = country + "/" + state + "/" + suburb + "/" + address;
	
	return encodeURI(endpoint + addressString + queryData);
}

function BMShowTraffic() {
	Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', function () {
	    var manager = new Microsoft.Maps.Traffic.TrafficManager(map);
	    //manager.show();
	});
}

function BMGetLatLonFromAddress(address) {
	return new Promise(
		function (resolve, reject) {
			endpoint = BMGenerateEndpointAddressToLatLon(address);
			var json = $.getJSON(endpoint);
			
			json.done(function(data) {
				console.log("[BMGetLatLonFromAddress] Success");
				var coords = (data.resourceSets[0].resources[0].point.coordinates);			
				resolve(coords);
			}).fail(function() {
				var reason = new Error('[BMGetLatLonFromAddress] Failure');
	            reject(reason);
			});
	    }
	);
}

function BMGenerateLocationFromAddress(address) {
	return new Promise(
		function (resolve, reject) {
			console.log("[BMGenerateLocationFromAddress] Started");
			
			BMGetLatLonFromAddress(address)
			.then(function(latlon) {
				console.log("[BMGenerateLocationFromAddress] Success");
				loc = new Microsoft.Maps.Location(latlon[0], latlon[1]);
				resolve(loc)
			})
			.catch(function(error) {
				var reason = new Error('[BMGenerateLocationFromAddress] Failure');
	            reject(reason);
			});
						
			console.log("[BMGenerateLocationFromAddress] Finished");
	    }
	);
}

function BMGeneratePushPinAtAddress(address) {
	return new Promise(
		function (resolve, reject) {
			console.log("[BMGeneratePushPinAtAddress] Started");
			
			BMGenerateLocationFromAddress(address)
			.then(function(loc) {
				console.log("[BMGeneratePushPinAtAddress] Success");
				pushpin = new Microsoft.Maps.Pushpin(loc, { });
				resolve(pushpin);
			}).catch(function(error) {
				var reason = new Error('[BMGeneratePushPinAtAddress] Failure');
	            reject(reason);
			});
			
			console.log("[BMGeneratePushPinAtAddress] Finished");
		}
	);
}

function BMGeneratePushPinAtLatLon(coords) {
	loc = new Microsoft.Maps.Location(coords[0], coords[1]);
	pushpin = new Microsoft.Maps.Pushpin(loc, { });
}