////////////////////////////////////////////////////////////////////////////////
// Hospital Prototype
////////////////////////////////////////////////////////////////////////////////

const GMap = "#map";
var Hospitals = [];

function Hospital(id, name, region, lat, lon) {
	this.id = id;
	this.name = name;
	this.region = region;
	this.lat = lat;
	this.lon = lon;
	
	// Add new Hospital to Map
	this.addMarker();
	
	Hospitals.push(this);
}

Hospital.prototype.getLat = function() {
	return this.lat;
}

Hospital.prototype.getName = function() {
	return this.name;
}

Hospital.prototype.getLon = function() {
	return this.lon;
}

Hospital.prototype.getLatLon = function() {
	return [this.lat, this.lon];
}

Hospital.prototype.getUUID = function() {
	str = this.id.toLowerCase();
	return str;
}

Hospital.prototype.zoomTo = function () {
	$(GMap).zoomTo(this.getLatLon(), 13);
}

Hospital.prototype.addMarker = function() {
	var self = this;
	
	$(GMap).addMarker({
		coords: [this.lat, this.lon],
		title: "hospital",
		id: this.id,
		label: this.id.toUpperCase(),
		icon: 'img/hospital.svg', // Icon URL,
		onclick: function (e) {
			self.showInformation();
		}
	});
}

Hospital.prototype.showInformation = function() {
	showHospitalInformation(this.id);
}

Hospital.prototype.quantifyTravel = function(from) {
	var self = this;
	return new Promise(
		function (resolve, reject) {
			var origin = from;
			var dest = new google.maps.LatLng(self.lat, self.lon);
			
			GGetTravelTimeBetweenLocations([from], [dest])
			.then(function(result) {
				distance = result.rows[0].elements[0].distance.text;
				time = result.rows[0].elements[0].duration.text;
				traffic = result.rows[0].elements[0].duration_in_traffic.text;
				ticks = result.rows[0].elements[0].duration_in_traffic.value;
				
				data = { travel: [ { to: self.id, "distance": distance, "time": time, "time_in_traffic": traffic, "ticks": ticks } ] };
				resolve(data)
			})
			.catch(function(error) {
				var reason = new Error('[BMGenerateLocationFromAddress] ' + error);
	            reject(reason);
			});	
	    }
	);
}

////////////////////////////////////////////////////////////////////////////////
// Hospital Utility Functions
////////////////////////////////////////////////////////////////////////////////

function HospitalsIterator() {
	$.getJSON("js/hospitals.old.json", function(data) {
	}).done(function(data) {
		$.each(data.hospitals, function(index, hospital) {
			new Hospital(hospital.id, hospital.name, hospital.region, hospital.lat, hospital.lon);
		});
	});
}

function ListHospitalsIterator(hospitals) {
	hospitalKey = [];
	
	$.each(hospitals, function(index, value) {
		hospitalKey.push(value.id);
	});

	return hospitalKey;
}