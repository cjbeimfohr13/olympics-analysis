// The code for the chart is wrapped inside a function
// that automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads, remove it
    // and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width
    // and height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      right: 150,
      bottom: 150,
      left: 75
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // append svg and group
    var svg = d3.select(".chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Import Data from the usaGoldMedals.csv file; this file represents USA Athletes Gold Medal winners
    //var maleCount = [56, 106, 49, 57, 59, 68, 51, 67, 40];
    //var femaleCount = [7, 62, 28, 32, 101, 62, 65, 58, 67];
    d3.csv("Resources/usaGoldMedals.csv").then(function(usaData) {
  
      // Parse the data.
      // Format the Year and convert to numerical and date values
      var parseTime = d3.timeParse("%Y");
  
      // Format the data
      usaData.forEach(function(data) {
        data.year = parseTime(data.year);
        data.male = +data.male;
        data.female = +data.female;
      });
  
      // Create the scales for the chart
      var xTimeScale = d3.scaleTime()
      .domain(d3.extent(usaData, d => d.year))
      .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
      .range([height, 0]);
  
      // Set up the y-axis domain
      // Find the max of the male data
      var maleMax = d3.max(usaData, d => d.male);
  
      // Use the maleMax value to set the yLinearScale domain
      yLinearScale.domain([0, maleMax]);
  
      // Create the axes
      var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
      var leftAxis = d3.axisLeft(yLinearScale);
  
      // Append the axes to the chartGroup
      // Add x-axis
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
      // Add y-axis
      chartGroup.append("g").call(leftAxis);
  
      // Line generator for male data
      var line1 = d3.line()
        .x(d => xTimeScale(d.year))
        .y(d => yLinearScale(d.male));
  
      // Append a path for male line plot
      chartGroup
        .append("path")
        .attr("d", line1(usaData))
        .classed("line blue", true);
  
      // Append circles to data points
      var circlesGroup = chartGroup.selectAll("circle")
        .data(usaData)
        .enter()
        .append("circle")
        .attr("cx", d => xTimeScale(d.year))
        .attr("cy", d => yLinearScale(d.male))
        .attr("r", "5")
        .attr("fill", "blue")
  
        // Add color coded titles to the x-axis
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .text("Gold Medal Athletes");
  
      chartGroup.append("text")
      // Position the text
      // Center the text:
      // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "blue")
        .text("USA Male Gold Medal Athletes");
  
      // Append a div to the body to create tooltips, assign it a class
      var toolTip = d3.select("body").append("div")
        .attr("class", "tooltip");  
  
      // Add an onmouseover event to display a tooltip
      circlesGroup.on("mouseover", function(d, i) {
        toolTip.style("display", "block");
        toolTip.html(`Male Gold Medals: <strong>${d.male}</strong>`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
  
      // Add a onmouseout event to make the tooltip invisible
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });
    })
  }
  
  // When the browser loads, makeResponsive() is called.
  makeResponsive();
  
  // When the browser window is resized, responsify() is called.
  d3.select(window).on("resize", makeResponsive);