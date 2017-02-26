// attribution:
// Map drawing function was created with the help of a youtube tutorial found here:
// https://www.youtube.com/watch?v=aNbgrqRuoiE

import * as d3 from "d3";
import getJson from './getJson';
import * as topojson from 'topojson';
import mouseOverHandler from './mouseOverHandler';


import { svgWidth, svgHeight } from '../constants';

// geojson map generated from:
// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
import geojsonMap from './world-countries.json';


export default (meteoriteData) => {

  // create svg element

  const svg = d3.select('.map-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .call(d3.zoom().on("zoom", function () {
        console.log(d3.event.transform);
        svg.attr("transform", d3.event.transform)
    }))
    .append('g');

  var projection = d3.geoMercator()
    // .scale(svgWidth / 2 / Math.PI)
    .scale(150)
    .translate([svgWidth / 2, svgHeight / 2])

  var path = d3.geoPath()
    .projection(projection);
  
  var countries = topojson.feature(geojsonMap, geojsonMap.objects.countries1).features;

  
  svg.selectAll('.country')
    .data(countries)
    .enter().append('path')
    .attr('class', 'country')
    .attr('d', path)

  const meteorites = meteoriteData.features;
  svg.selectAll('.meteorite')
    .data(meteorites)
    .enter().append('circle')
    .attr('r', 2)
    .attr('cx', d => {
      if (d.geometry) {
        var coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])
        return coords[0];
      }
    })
    .attr('cy', d => {
      if (d.geometry) {
        var coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])
        return coords[1];
      }
    })
    .on('mouseover', mouseOverHandler)
    .on('mouseout', () => { 
      d3.select('.tooltip').classed('show-tooltip', false); 
    })
    
  }
