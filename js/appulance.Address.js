// defining Address prototype

function Address(country, state, suburb, address) {
	this.country = country;
	this.state = state;
	this.suburb = suburb;
	this.address = address;
} 

Address.prototype.getLatLon = function() {
	BMGetLatLonFromAddress(this)
		.then(function(coords) {
			return coords;
		})
		.catch(function(error) {
			console.log(error.message);
		});
}

Address.prototype.getLocation = function() {
	BMGenerateLocationFromAddress(this)
		.then(function(location) {
			return location;
		})
		.catch(function(error) {
			console.log(error.message);
		});
}

Address.prototype.pushPin = function() {
	var self = this;
	BMGeneratePushPinAtAddress(this)
		.then(function(pushpin) {
			map.entities.push(pushpin);
			Microsoft.Maps.Events.addHandler(pushpin, 'click', function () { self.openPopover(); });
			//self.addPopover();
		})
		.catch(function(error) {
			console.log(error.message);
		});
}

Address.prototype.getUUID = function() {
	str = this.address.replace(/[^a-z0-9+]+/gi, '').toLowerCase();
	return str;
}

Address.prototype.zoomTo = function () {
	BMGenerateLocationFromAddress(this)
		.then(function(location) {
			map.setView({
				center: loc,
				zoom: 13
			});
		})
		.catch(function(error) {
			console.log(error.message);
		});
}

Address.prototype.openPopover = function() {
	console.log("Requested open popover for " + this.getUUID());
	app.sheet.open("#location-info");
	$("#location-info-title").html(this.address);
	
	this.getTravelTime("-27.49725,153.03506");
}

Address.prototype.getTravelTime = function(coords) {
	BMGetLatLonFromAddress(this)
		.then(function(coords) {
			origin = coords;
			dest = "-27.44599,153.02969";
			console.log("Travel from " + origin + " to " + dest);
			BMGetDistanceMatrixBetweenLocation(origin, dest)
				.then(function(result) {
					console.log(result);
				}).catch(function(error) {
					console.log(error.message);
				});	
		})
		.catch(function(error) {
			console.log(error.message);
		});	
}