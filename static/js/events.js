function buildPlot(year){
  var link = "/api/v1.0/athletes"
  d3.json(link).then(function(data){
    console.log(data);
  var filteredYears = year ? data.filter((d) => d.year === year) : data
  var sportsYear = filteredYears.map(s => s.sport)
    console.log(sportsYear);
    sportFrequency={};
  for (var i = 0; i < sportsYear.length; i++){
    var currentSport = sportsYear[i];
          if (currentSport in sportFrequency) {
            sportFrequency[currentSport] += 1;
          } else {
            sportFrequency[currentSport] = 1;
          }
  }
  var sportEvents = Object.keys(sportFrequency);
  var sportEventCount= Object.values(sportFrequency);
      console.log((sportEvents))
      console.log(sportEventCount)

  var trace= {
    x: sportEvents,
    y: sportEventCount,
    type: "bar",
    marker: { color: "#193050" },
    };
        
  var data = [trace];

  layout = {
        title: "USA Olympic Gold Medals by Sport (1976-2016)",
      };
  Plotly.newPlot("plot", data, layout);
      

    return sportFrequency
  })

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  
  const result= buildPlot(dataset)

}

}
