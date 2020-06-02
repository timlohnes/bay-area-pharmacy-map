var map;
var originalPharmacySpreadsheet = "1h8ETsGptZEAtLeEdlKW5S_jspfUpRmlSk9apQJKQC04";
var pharmacySpreadsheet = "1_6LsF0mYaOkeCZ2F6hyxpWnez3lRItMHM8fQMxFU27M";

// create custom icon

var openPharmacyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var closedPharmacyIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


document.addEventListener('DOMContentLoaded',function(){
  map = L.map('map', {zoomControl: false}).setView([37.77, -122.05], 11);
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);
   

    new L.Control.Zoom({
  position: 'topright'
}).addTo(map);
  
var pharmacyLayer = L.layerGroup().addTo(map);

 function init() {
  var pharmacyCount = 1;
  Tabletop.init({ 
    key: pharmacySpreadsheet,
    callback: function(sheet, tabletop){ 
      for (var i in sheet){
        var place = sheet[i];
          console.log(place);
          console.log(place.brand)
        if (place.open != "Yes") {
            var thisPopup = "<dl><dt>Store: </dt>"
           + "<dd>" + place.brand + "</dd>"
           + "<dt>Address: </dt>"
           + "<dd>" + place.fulladdress + "</dd>"
           + "<dt>Phone: </dt>"
           + "<dd>" + place.phone + "</dd>"
           + "<dt>Details: </dt>"
           + "<dd>" + place.details + "</dd>";
            L.marker([place.latitude, place.longitude], {icon: closedPharmacyIcon})
            .addTo(pharmacyLayer)
            .bindPopup(thisPopup)
        } else {
           var thisPopup = "<dl><dt>Store: </dt>"
           + "<dd>" + place.brand + "</dd>"
           + "<dt>Address: </dt>"
           + "<dd>" + place.fulladdress + "</dd>"
           + "<dt>Phone: </dt>"
           + "<dd>" + place.phone + "</dd>"
           + "<dt>Details: </dt>"
           + "<dd>" + place.details + "</dd>";
          L.marker([place.latitude, place.longitude], {icon: openPharmacyIcon})
          .addTo(pharmacyLayer)
          .bindPopup(thisPopup)
        }
        
        $("." + pharmacyCount + "-current").on('click', function(event){
              map.setView([this.getAttribute("data-y"), this.getAttribute("data-x")], 18);
        });
        pharmacyCount += 1;
      }
    },
    simpleSheet: true
  })

     
     $( ".sidebar-openclose" ).click(function() {
          $(this).parent().toggleClass('open');
     });
     
}
    
  
    
    window.addEventListener('DOMContentLoaded', init); 
})

