// handler function for mouseover events
// shows tooltip when hovering over meteorite landing

import * as d3 from "d3";


export default (d) => {
console.log(d.properties);
  d3.select('.tooltip')
    .attr('style', 'left: ' + (d3.event.pageX - (50)) +
      'px; top:  ' + (d3.event.pageY - 60) + 'px;')
    .classed('show-tooltip', true);
  
  // tooltip info goes here
  d3.select('.tooltip-info')
    .html(
      d.properties.name
    );
};
