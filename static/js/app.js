var url ="/api/v1.0/athletes"

d3.json(url).then( data => {
    console.log(data);
});