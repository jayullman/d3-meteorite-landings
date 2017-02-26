// create tooltip and append to html body

import * as d3 from "d3";
import '../styles/tooltip.css';
  
export default () => {
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip');

  // labels within tooltip that will display the name of the country
  tooltip.append('div')
    .attr('class', 'tooltip-info');
};
  