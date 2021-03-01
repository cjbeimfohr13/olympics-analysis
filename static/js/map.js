// Add tile layer to the map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
}),
  satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v9",
    accessToken: API_KEY
  });

// Create the map object 
var olympicMap = L.map("map", {
  center: [41.8719, 12.5674], // Used Italy as a center of the world map
  zoom: 3,
  layers: [streetMap, satelliteMap]
});

// Define a baseMaps object to hold our base layers
var defaultMaps = {
  "Street Map": streetMap,
  "Satellite Map": satelliteMap
};

// Create overlayMaps and leave it empty to display the baseMaps option.
// Otherwise, it will hide all of the markers and the map layer options.
var overlayMaps = {};

L.control.layers(defaultMaps, overlayMaps, {
  collapsed: false
}).addTo(olympicMap);

// Save each name of the place, longitude, latitude, and a year for each Olympics in the array.
var placeOlympics = [
  {
    name: "Rio, Brazil",
    location: [-22.9068, -43.1729],
    year: 2016,
    link: "https://www.olympic.org/rio-2016"

  },
  {
    name: "Beijing, China",
    location: [39.9042, 116.4074],
    year: 2008,
    link: "https://www.olympic.org/beijing-2008"
  },
  {
    name: "Athens, Greece",
    location: [37.9838, 23.7275],
    year: 2004,
    link: "https://www.olympic.org/athens-2004"
  },
  {
    name: "Sydney, Australia",
    location: [-33.8688, 151.2093],
    year: 2000,
    link: "https://www.olympic.org/sydney-2000"
  },
  {
    name: "Atlanta, USA",
    location: [33.7490, -84.3880],
    year: 1996,
    link: "https://www.olympic.org/atlanta-1996"
  },
  {
    name: "Barcelona, Spain",
    location: [41.3851, 2.1734],
    year: 1992,
    link: "https://www.olympic.org/barcelona-1992"
  },
  {
    name: "Seoul, South Korea",
    location: [37.5665, 126.9780],
    year: 1988,
    link: "https://www.olympic.org/seoul-1988"
  },
  {
    name: "Los Angeles, USA",
    location: [34.0522, -118.2437],
    year: 1984,
    link: "https://www.olympic.org/los-angeles-1984"
  },
  {
    name: "Moscow, Russia",
    location: [55.7558, 37.6173],
    year: 1980,
    link: "https://www.olympic.org/moscow-1980"
  },
  {
    name: "Montreal, Canada",
    location: [45.5017, -73.5673],
    year: 1976,
    link: "https://www.olympic.org/montreal-1976"
  }
];


//===================== Original Markers ==============================

// Loop through the each Olympics array and create a marker for each Olympic object
// for (var i = 0; i < placeOlympics.length; i++) {
//   L.marker(placeOlympics[i].location, {
//     fillOpacity: 0.75,
//     color: "#cdcdcd",
//     fillColor: "#cdcdcd",
//   }).addTo(olympicMap)
// }

//======================================================================

// Add custom markers to prettify our map 

// Define icon class containing the shared options, and inheriting from L.Icon in Leaflet.js
var flagIcon = L.Icon.extend({ // marker icons in Leaflet defined by L.Icon objects, which are passed as an option when creating markers.
  options: {
    iconSize: [50, 50], // Determines the icon size 
    iconAnchor: [25, 35], // Icon's location 
    popupAnchor: [0, -30] // BindPopup location 
  }
});

// Create all flag icons from previous class and put them in each variable.
var brazilFlag = new flagIcon({ iconUrl: '/static/Images/brazil-1524451_640.png' }),
  ChinaFlag = new flagIcon({ iconUrl: '/static/Images/china-3573904_640.png' }),
  GreeceFlag = new flagIcon({ iconUrl: '/static/Images/greece-2270738_640.png' }),
  AustraliaFlag = new flagIcon({ iconUrl: '/static/Images/australia-3573886_640.png' }),
  USAFlag_GA = new flagIcon({ iconUrl: '/static/Images/united-states-1524403_640.png' }),
  SpainFlag = new flagIcon({ iconUrl: '/static/Images/spain-1524515_640.png' }),
  SKFlag = new flagIcon({ iconUrl: '/static/Images/south-korea-flag-4555621_640.png' }),
  USAFlag_LA = new flagIcon({ iconUrl: '/static/Images/united-states-1524403_640.png' }),
  RussianFlag = new flagIcon({ iconUrl: '/static/Images/russia-1524479_640.png' }),
  CanadaFlag = new flagIcon({ iconUrl: '/static/Images/canada-3573898_640.png' });

// Check the location of the olympics
console.log(placeOlympics[0].location); // Example: Brazil location 

// Place these icons on the map 
for (var i = 0; i < placeOlympics.length; i++) {

  // Add Brazil Flag Icon 
  L.marker(placeOlympics[0].location, { icon: brazilFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[0].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[0].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[0].link + "</h5>")
    .addTo(olympicMap);

  // Add China Flag Icon 
  L.marker(placeOlympics[1].location, { icon: ChinaFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[1].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[1].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[1].link + "</h5>")
    .addTo(olympicMap);

  // Add Greece Flag Icon 
  L.marker(placeOlympics[2].location, { icon: GreeceFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[2].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[2].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[2].link + "</h5>")
    .addTo(olympicMap);

  // Add Australia Flag Icon 
  L.marker(placeOlympics[3].location, { icon: AustraliaFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[3].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[3].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[3].link + "</h5>")
    .addTo(olympicMap);

  // Add Atlanta Flag Icon 
  L.marker(placeOlympics[4].location, { icon: USAFlag_GA })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[4].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[4].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[4].link + "</h5>")
    .addTo(olympicMap);

  // Add Spain Flag Icon 
  L.marker(placeOlympics[5].location, { icon: SpainFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[5].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[5].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[5].link + "</h5>")
    .addTo(olympicMap);

  // Add South Korea Flag Icon 
  L.marker(placeOlympics[6].location, { icon: SKFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[6].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[6].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[6].link + "</h5>")
    .addTo(olympicMap);

  // Add Los Angeles Flag Icon 
  L.marker(placeOlympics[7].location, { icon: USAFlag_LA })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[7].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[7].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[7].link + "</h5>")
    .addTo(olympicMap);

  // Add Russian Flag Icon 
  L.marker(placeOlympics[8].location, { icon: RussianFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[8].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[8].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[8].link + "</h5>")
    .addTo(olympicMap);

  // Add Canada Flag Icon 
  L.marker(placeOlympics[9].location, { icon: CanadaFlag })
    .addTo(olympicMap)
    .bindPopup("<h5>Olympic Location: " + placeOlympics[9].name + "</h5>" +
      "<hr><h5>Olympic Year: " + placeOlympics[9].year + "</h5>" + 
      "<h5>Website: " + placeOlympics[9].link + "</h5>")
    .addTo(olympicMap);
}