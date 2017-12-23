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