var data = {{ all_athletes | tojson }};
console.log(data);

var tbody = d3.select("tbody");

data.forEach(function(player){

  var row = tbody.append("tr");
  Object.entries(player).forEach(function([key,value]){
    console.log(key,value);

  var cell = row.append("td");
        cell.text(value);
        });
});

var button = d3.select("#filter-btn"); 
button.on("click",function() {
    
    d3.select("tbody").html("");
    d3.event.preventDefault();

    var medalInputElement = d3.select("#medal");
    var medalInputValue = medalInputElement.property("value");
    var nameInputElement = d3.select("#name");
    var nameInputValue= nameInputElement.property("value");
    var nationalityInputElement = d3.select("#nationality");
    var nationalityInputValue= nationalityInputElement.property("value");
    var sexInputElement = d3.select("#sex");
    var sexInputValue= sexInputElement.property("value");
    var sportInputElement = d3.select("#sport");
    var sportInputValue= sportInputElement.property("value");
    var yearInputElement = d3.select("#year");
    var yearInputValue= yearInputElement.property("value");


    var filteredData = tableData
    if(medalInputValue!==""){
        console.log('filtering by date: ', medalInputValue)
        filteredData = data.filter(data => data.medal === medalInputValue);
    }
    if(nameInputValue!=="") {
        console.log('filtering by name: ', nameInputValue)
        filteredData = filteredData.filter(ufo => ufo.city === cityInputValue);
    }
    if(nationalityInputValue!=="") {
        console.log('filtering by nationality: ', nationalityInputValue)
        filteredData = filteredData.filter(ufo => ufo.state === stateInputValue);
    }
    if(sexInputValue!=="") {
        console.log('filtering by sex: ', sexInputValue)
        filteredData = filteredData.filter(ufo => ufo.country === countryInputValue);
    }
    if(sportInputValue!=="") {
        console.log('filtering by sport: ', sportInputValue)
        filteredData = filteredData.filter(ufo => ufo.shape === shapeInputValue);
    }
    if(yearInputValue!=="") {
      console.log('filtering by year: ', yearInputValue)
      filteredData = filteredData.filter(ufo => ufo.shape === shapeInputValue);
  }


    filteredData.forEach(function(sighting){
    

        var row = tbody.append("tr");
        Object.entries(sighting).forEach(function([key,value]){

        var cell = row.append("td");
        cell.text(value);
    });
    });
});
