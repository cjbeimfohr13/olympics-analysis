function buildPlot(){
var data = {{ all_athletes | tojson }};
      console.log(data);
function filterByYear(data, input) {
      return data.filter((d) => d.year === input);
}
var filteredYears = data.filter(filterByYear);      
var sportsYear = filteredYears.map(s => s.sport)
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
}
