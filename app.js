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

svg();
