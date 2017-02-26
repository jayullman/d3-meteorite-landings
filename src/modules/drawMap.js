// attribution:
// Map drawing function was created with the help of a youtube tutorial found here:
// https://www.youtube.com/watch?v=aNbgrqRuoiE

import * as d3 from "d3";
import * as d3Chromatic from 'd3-scale-chromatic';

import getJson from './getJson';
import * as topojson from 'topojson';
import mouseOverHandler from './mouseOverHandler';

import '../styles/map.css';
import { svgWidth, svgHeight } from '../constants';

// geojson map generated from:
// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
import geojsonMap from './world-countries.json';

// take meteorite json data and return the extent of mass as array
const findMeteoriteMassRange = (meteoriteData) => {
  const massArray = meteoriteData.features.map(meteorite => {
    return Number(meteorite.properties.mass);
  });

  return d3.extent(massArray);
};

export default (meteoriteData) => {
  const minSvgWidth = 310;
  
  let svgWidth = window.innerWidth * 0.9;
  if (svgWidth < minSvgWidth) {
    svgWidth = minSvgWidth;
  }
  const svgHeight = svgWidth;

  // upper bound of meteorite radius on screen depending on 
  // width of svg element
  const maxCircleRadius = svgWidth / 10;

  // find range of meteorite mass
  const meteoriteMassExtent = findMeteoriteMassRange(meteoriteData);

  const massToRadiusScale = d3.scalePow()
    .exponent(0.8)
    .domain(meteoriteMassExtent)
    .range([1, maxCircleRadius]);

  const colorScale = d3.scalePow()
  .exponent(0.5)
  .domain(meteoriteMassExtent)
  .range([0,1]);

  const massToColor = (mass) => {
    return (d3Chromatic.interpolatePuRd(colorScale(mass)));
  };

  // create svg element to hold map
  // add pan and zoom listeners


  const svg = d3.select('.map-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .call(d3.zoom().on("zoom", function () {
      console.log(d3.event.transform);

      var t = d3.event.transform;
      var scale = d3.event.transform.k;
      console.log(t);

      t.x = Math.max(0, Math.min(t.x, svgWidth - 50));
      t.y = Math.max(0, Math.min(t.y, svgHeight - 50));
      t.k = scale < 1 ? 1 : scale;
        svg.attr("transform", t);
    }))
    .append('g');

  const projection = d3.geoMercator()
    // scale map based on width of svg
    .scale(svgWidth / 2 / Math.PI)
    // .scale(150)
    .translate([svgWidth / 2, svgHeight / 2]);

  const path = d3.geoPath()
    .projection(projection);
  
  const countries = topojson.feature(geojsonMap, geojsonMap.objects.countries1).features;

  svg.selectAll('.country')
    .data(countries)
    .enter().append('path')
    .attr('class', 'country')
    .attr('d', path);

  // created an array of meteorites sorted by mass
  // so that larger ones are drawn first and smaller ones on top
  const meteorites = meteoriteData.features.sort((a, b) => {
    return b.properties.mass - a.properties.mass;
  });
  
  svg.selectAll('.meteorite')
    .data(meteorites)
    .enter().append('circle')
    .attr('r', d => {
      return massToRadiusScale(d.properties.mass);
    })
    .attr('cx', d => {
      if (d.geometry) {
        var coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
        return coords[0];
      }
    })
    .attr('cy', d => {
      if (d.geometry) {
        var coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
        return coords[1];
      }
    })
    .attr('fill', d => {
      return massToColor(d.properties.mass);
    })
    .attr('class', 'meteorite')
    .on('mouseover', mouseOverHandler)
    .on('mousemove', mouseOverHandler)
    .on('mouseout', () => { 
      d3.select('.tooltip').classed('show-tooltip', false); 
    });
};
