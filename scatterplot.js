var terrorism = terror_year.data; 
            
var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;
d3.select(window).on("resize", resize);

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = viewWidth - margin.left - margin.right;
var height = viewHeight - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", viewWidth)
    .attr("height", viewHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//draw slider
var slider = document.createElement('input');
    slider.id = "nRadius";
    slider.type = 'range';
    slider.min = 1970;
    slider.max = 2014;
    slider.value = 1970;
    slider.step = 1;
document.body.appendChild(slider); 
/*************range event**************/    
var selectCode;
var selectYear;
// when the input range changes update the circle 
d3.select("#nRadius")
.on("input", function() {
	selectYear = this.value;
      drawScatterplot(this.value,selectCode);
})

/*************selection event**************/

document.getElementById("select1").onchange=function(){ 
	var e =  document.getElementById("select1");
	selectCode = document.getElementById("select1").value;
	var region = e.options[e.selectedIndex].text;
	svg.selectAll(".title").remove();
	svg.append("text")
		.attr("x", 400)
    .attr("y", 0)
    .attr("font-size","34px")
    .attr("dy", "1.2em")
    .attr("class","title")
    .attr("text-anchor", "left")
    .text(region)
    .style("fill", "black");
    
	svg.selectAll("circle").remove();
	slider.value = 1970;
	  drawScatterplot(1970,selectCode);	
	
	}
/*************selection event**************/


//initialize
var yaxis = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
selectCode = document.getElementById("select1").value;
selectYear = document.getElementById("nRadius").value;
drawAxis();
drawScatterplot(selectYear,selectCode);

function drawAxis(){

	//x axis
	svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
	.attr('stroke-width', 3)
	.style('fill', "yellow")
    .attr("x1", 0)     // x position of the first end of the line
    .attr("y1", 600)      // y position of the first end of the line
    .attr("x2", 1400)     // x position of the second end of the line
    .attr("y2", 600);    // y position of the second end of the line
	
	//y axis
    svg.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
	.attr('stroke-width', 2)
	.style('fill', "yellow")
    .attr("x1", 0)     // x position of the first end of the line
    .attr("y1", 600)      // y position of the first end of the line
    .attr("x2", 0)     // x position of the second end of the line
    .attr("y2", 0);    // y position of the second end of the line
	
	//x texts
    svg.selectAll(".xtext")
    .data(terrorism)
    .enter()
    .append("text")
    .attr("class",".xtext")
	.attr("x", function(d) {return (d.year-1950)*30-600-10;})
    .attr("y", 600)
    .attr("font-size","10px")
    .attr("dy", "1.2em")
    .attr("text-anchor", "left")
    .text(function(d) {return d.year;})
    .style("fill", function(d){return "black";});

    //y texts
    svg.selectAll(".ytext")
    .data(yaxis)
    .enter()
    .append("text")
    .attr("class",".ytext")
	.attr("x", -30)
    .attr("y", function(d) {return 600-d*90/3;})
    .attr("font-size","10px")
    .attr("dy", "1.2em")
    .attr("text-anchor", "left")
    .text(function(d) {return d*90;})
    .style("fill", "black");
}
function drawScatterplot(wantYear,wantCode) {
  //You can implement your scatterplot here


  //The svg is already defined, you can just focus on the creation of the scatterplot
  //you should at least draw the data points and the axes.
  var min = d3.min(terrorism, function(d) { return d.u });
  var max = d3.max(terrorism, function(d) { return d.u });

  var colorScale = d3.scale.linear()
                    .domain([1,2,3,4,5,6,7,8,9,10,11,12])
                    .range(["#393b79",	"#5254a3",	"#6b6ecf",	"#9c9ede",	"#637939",	"#8ca252",	"#b5cf6b",	
                    "#cedb9c",	"#8c6d31",	"#e7ba52",	"#e7cb94",	"#de9ed6"]);
    
   var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([0,d3.max(terrorism, function(d) { return d.x; })])
              .range([0, width]);
    
    var y = d3.scale.linear()
    	      .domain([0, height])
    	      .range([d3.max(terrorism, function(d) { return d.y; }),0]);
 

    svg.selectAll(".terror")
      .data(terrorism)
      .enter()
      .append("circle")
      .style('opacity',0.7)
      .attr("cx",function(d) {return (d.year-1950)*30-600;})
      .attr("cy",function(d) {return 600-d.number/3-5;})
      .attr("r",function(d) {return 5+d.code*2;})
      .attr("fill",function(d) {
        if (d.year == wantYear)
        {
          if (d.code == wantCode && d.code == 0)
            return "red";
          else if (d.code == wantCode)
             return colorScale(d.code);
          else 
          	return "none";
        } 
        else
          return "none"});

  //The data can be found in the boat_data.boats variable

  //You can start with a simple scatterplot that shows the x and y attributes in boat_data.boats

  //Additional tasks are given at the end of this file
}

function resize() {
  //This function is called if the window is resized
  //You can update your scatterplot here
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
}


drawScatterplot();


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////    ADDITIONAL TASKS   ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/*
Once that you have implemented your basic scatterplot you can work on new features
  * Color coding of the points based on a third attribute
  * Legend for the third attribute with color scale
  * Interactive selection of the 3 attributes visualized in the scatterplot
  * Resizing of the window updates the scatterplot
*/
