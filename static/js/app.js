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