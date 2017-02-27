// handler function for mouseover events
// shows tooltip when hovering over meteorite landing

import * as d3 from "d3";


export default (d) => {
  d3.select('.tooltip')
    .attr('style', 'left: ' + (d3.event.pageX- 50) +
      'px; top:  ' + (d3.event.pageY + 30) + 'px;')
    .classed('show-tooltip', true);
  
  // tooltip info goes here
  d3.select('.tooltip-info')
    .html(
      `Fall: ${d.properties.fall} <br>
       Name: ${d.properties.name} <br>
       Year: ${new Date(d.properties.year).getFullYear()} <br>
       Mass: ${d.properties.mass}`
    );
};
