function buildPie(year) {
    var link = "/api/v1.0/athletes";
    d3.json(link).then(function (data) {
      console.log(data);
      var yearsFiltered= data.filter((d)=>d.year==year);
      var genderYear= yearsFiltered.map((g)=>g.sex);
      console.log(genderYear);
      genderFrequency ={};
      for (var i = 0; i < genderYear.length; i++) {
          var currentGender = genderYear[i];
          if (currentGender in genderFrequency) {
            genderFrequency[currentGender] += 1;
          } else {
            genderFrequency[currentGender] = 1;
          }
        }
      console.log(genderFrequency)
      var genderLabel = Object.keys(genderFrequency);
      var genderCount = Object.values(genderFrequency);
      console.log(genderLabel);
      console.log(genderCount);
  
      
      var data = [
        {
          values: genderCount,
          labels: genderLabel,
          marker: {
            colors: ["#193050", "#e62e00"],
          },
          textinfo: "label+percent+value",
          type: "pie",
        },
      ];
  
      Plotly.newPlot("pie", data);
    });
  }
  d3.selectAll("#tomDataset").on("change", getData);
   // Function called by DOM changes
  function getData() {
     // On change to the DOM, call getData()
     var dropdownMenu = d3.select("#tomDataset");
     var dataset = dropdownMenu.property("value");
     // Assign the value of the dropdown menu option to a variable
   
     // Initialize an empty array for the country's data
  
     buildPie(dataset);
   }
  




