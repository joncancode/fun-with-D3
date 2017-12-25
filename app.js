function svg() {
  let canvas = d3
    .select('body')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

  let circle = canvas
    .append('circle')
    .attr('cx', 200)
    .attr('cy', 200)
    .attr('r', 50)
    .attr('fill', 'blue');

  let rect = canvas
    .append('rect')
    .attr('width', 100)
    .attr('height', 200);

  let line = canvas
    .append('line')
    .attr('x1', 100)
    .attr('x2', 500)
    .attr('y1', 250)
    .attr('y2', 400)
    .attr('stroke', 'purple')
    .attr('stroke-width', 3);
}

//svg();

function visualizeBalls() {
  let ballData = [10, 42, 35, 30, 90];

  let canvas = d3
    .select('.ballContainer')
    .append('svg')
    .attr('width', 720)
    .attr('height', 400);

  let balls = canvas
    .selectAll('circle')
    .data(ballData)
    .enter()
    .append('circle')
    .attr("fill", function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })
    .attr("cx", function(d,i){
        return d + (i * 100)
    })
    .attr("cy", function(d){
        return d + 100
    })
    .attr("r", function(d){
        return d 
    })
}

visualizeBalls()

function scaling(){
    let graphData = [100, 40, 500]
    , w = 600
    , h = 500

    let canvas = d3.select(".graphContainer")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
 
    let graphBars = canvas.selectAll("rect")
        .data(graphData)
        .enter()
        .append("rect")
        .attr("fill", "orange")
        .attr("width", function (d){
            return d
        })
        .attr("height", 30)
        attr("y", function (d, i){
            return i * 50
        })
}

//scaling()

//animated ring below: 

// Data: Average age of employees in an organization
var employees = [
    {dept: 'A', count : 22},
    {dept: 'B', count : 66},
    {dept: 'C', count : 25},
    {dept: 'D', count : 50},
    {dept: 'E', count : 27}
];
var maxWidth = 200;
var maxHeight = 200;
var outerRadius = 100;
var ringWidth = 20;

// This function helps you figure out when all
// the elements have finished transitioning
// Reference: https://groups.google.com/d/msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
function checkEndAll(transition, callback) {
    var n = 0;
    transition
    .each(function() { ++n; })
    .each("end", function() {
        if (!--n) callback.apply(this, arguments);
    });
}    

function drawAnimatedRingChart(config) {
    var pie = d3.layout.pie().value(function (d) {
        return d.count;
    });

    var color = d3.scale.category10();
    var arc = d3.svg.arc();

    // This function helps transition between
    // a starting point and an ending point
    // Also see: http://jsfiddle.net/Nw62g/3/
    function tweenPie(finish) {
        var start = {
                startAngle: 0,
                endAngle: 0
            };
        var i = d3.interpolate(start, finish);
        return function(d) { return arc(i(d)); };
    }
    arc.outerRadius(config.outerRadius || outerRadius)
        .innerRadius(config.innerRadius || innerRadius);

    // Remove the previous ring
    d3.select(config.el).selectAll('g').remove();

    var svg = d3.select(config.el)
        .attr({
            width : maxWidth,
            height: maxHeight
        });

    // Add the groups that will hold the arcs
    var groups = svg.selectAll('g.arc')
    .data(pie(config.data))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
    });

    // Create the actual slices of the pie
    groups.append('path')
    .attr({
        'fill': function (d, i) {
            return color(i);
        }
    })
    .transition()
    .duration(config.duration || 1000)
    .attrTween('d', tweenPie)
    .call(checkEndAll, function () {
        
        // Finally append the title of the text to the node
        groups.append('text')
        .attr({
            'text-anchor': 'middle',
            'transform': function (d) {
                return 'translate(' + arc.centroid(d) + ')';
            }
        })
        .text(function (d) {
            // Notice the usage of d.data to access the raw data item
            return d.data.dept;
        });
    });
}

// Render the initial ring
drawAnimatedRingChart({
    el: '.animated-ring svg',
    outerRadius: outerRadius,
    innerRadius: outerRadius - ringWidth,
    data: employees
});

// Listen to changes on the select element
document.querySelector('#numberOfDepartments')
  .addEventListener('change', function (e) {
      drawAnimatedRingChart({
        el: '.animated-ring svg',
        outerRadius: outerRadius,
        innerRadius: outerRadius - ringWidth,
        data: employees.slice(0, parseInt(this.value))
    });
  });

  let barData = [20, 30, 45, 15]

  let height = 400, 
      width = 600,
      barWidth = 50,
      barOffset = 5

  d3.select('#bar-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'purple')
    .selectAll('rect').data(barData)
    .enter().append('rect')
        .style('fill', 'orange')
        .attr('width', barWidth)
        .attr('height', function(d){
            return d;
        })