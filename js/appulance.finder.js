// Initialize your app
var app = new Framework7({
	id: 'com.appulance.finder',
	name: "Hospital Finder",
	theme: "ios",
	root: '#finder',
	sheet: {
		closeByOutsideClick: true,
	},
});

var mainView = app.views.create('.view-main');

$(function() {
	// main
	$("#map").googleMap({
		zoom: 10, 
		center: {lat: -27.49725, lng: 153.03506},
		disableDefaultUI: true,
		styles: [
			{
            	featureType: 'poi',
				stylers: [{visibility: 'off'}]
			},
			{
	            featureType: 'transit',
	            stylers: [{visibility: 'off'}]
			},
			{
				featureType: "road",
				elementType: "labels",
				stylers: [{ visibility: "off" }]
			}
		]
	});
    
    HospitalsIterator();
});

function showLocationInformation(address) {
	fullAddress = address.street + ", " + address.suburb;
	$("#location-info-title").html(address.street + ", " + address.suburb);
	app.sheet.open("#location-info");
	
	$('#location-info').on('sheet:opened', function (e, sheet) {
		$("#map").addTraffic();
	});
	
	$('#location-info').on('sheet:closed', function (e, sheet) {
		$("#map").removeTraffic();
	});
	
	itemTpl = $('script[data-template="hospital-route-item"]').text().split(/\$\{(.+?)\}/g);

	$.each(Hospitals, function(index, value) {
		travel = Hospitals[index].quantifyTravel(fullAddress)
		.then(function(travel) {
			var str = JSON.stringify(travel.travel);
			var arr = JSON.parse(str);
			
			$("#hospital-info-body").append(arr.map(function (item) {
		    	return itemTpl.map(render(item)).join('');
			}));
			
			sortContainerBy("data-time-secs", "#hospital-info-body", "div.hospital-route", "asc");
  		});
	});
}

function showHospitalInformation(id) {
	$("#hospital-info-title").html(id);
	app.sheet.open("#hospital-info");
}

$('#add-current-location').on('click', function(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){ 
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			
			console.log("[#add-current-location] Current Location: \n\tLat : "+position.coords.latitude+" \n\tLon :"+ position.coords.longitude);

			GReverseGeocoder(lat, lon)
			.then(function(result) {
				console.log(result);
				var streetNumber = result[0].address_components[0].long_name;
				var streetName = result[0].address_components[1].long_name;
				var suburb = result[0].address_components[2].long_name;
				var state = result[0].address_components[4].long_name;
				var country = result[0].address_components[5].long_name;
				
				var street = streetNumber + " " + streetName;
				var address = street + ", " + suburb;
				
				var results = {"country": country, "state": state, "suburb": suburb, "street": street };
				
				$("#map").addMarker({
			    	address: address, // Postale Address
			    	label: street,
			    	icon: "img/house.svg",
			    	onclick: function(e) {
				    	showLocationInformation(results);
			    	}
			    });
			    
			    $("#map").addTraffic();
				showLocationInformation(results);
				app.sheet.close(".popover-find");
				$("#map").zoomTo({address: address});
			})
			.catch(function(error) {
				var reason = new Error('[#add-current-location] ' + error);
	            reject(reason);
			});	
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
});

$('#fill-form-from-data').on('click', function(){
	var formData = {
		'suburb': 'Carina',
		'street': '35 Narracott Street',
	}
	app.form.fillFromData('#address-input', formData);
});

$('#search-for-address').on('click', function(){
	var formData = app.form.convertToData('#address-input');
	console.log(formData);
	
	country = formData['country'];
	state = formData['state'];
	suburb = formData['suburb'];
	street = formData['street'];
	address = street + ", " + suburb;
	
    $("#map").addMarker({
    	address: address, // Postale Address
    	label: street,
    	icon: "img/house.svg",
    	onclick: function(e) {
	    	showLocationInformation(formData);
    	}
    });
	
	$("#map").addTraffic();
	showLocationInformation(formData);
	app.sheet.close(".popover-find");
	$("#map").zoomTo({address: address});
});

$(document).on('click', '.hospital-route', function () {
	var data_id = $(this).attr('data-id');
	console.log("ping!" + data_id);
});




