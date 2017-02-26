import * as d3 from "d3";
import getJson from './getJson';
import * as topojson from 'topojson';


import { svgWidth, svgHeight } from '../constants';

// geojson map generated from:
// https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json
import geojsonMap from './world-countries.json';

export default (data) => {

  // create svg element

  const svg = d3.select('.map-container')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  var projection = d3.geoMercator()
    .scale(svgWidth / 2 / Math.PI)
    //.scale(100)
    .translate([svgWidth / 2, svgHeight / 2])

  var path = d3.geoPath()
    .projection(projection);
  
  console.log(geojsonMap);
  var countries = topojson.feature(geojsonMap, geojsonMap.objects.countries1).features;

  console.log(countries);
  
  svg.selectAll('.country')
    .data(countries)
    .enter().append('path')
    .attr('class', 'country')
    .attr('d', path)

  // const meteorites = d3.select('.map-container')

  // const projection = d3. geoMercator()
  //   .scale(200)
  //   .translate([svgWidth / 2, svgHeight / 2]);

  // const path = d3.geoPath()
  //   .projection(projection);

  // d3.json("world-map.json", function(err, mapData) {
  //     if (err) {
  //       throw new Error('Problem retrieving map data')
  //     } else {
  //       svg.append("path")
  //         .attr("d", path(mapData));

          
  //     }
  //   })
  console.log();



  // d3.json(JSON.stringify(map), function(error, topology) {
  //   g.selectAll("path")
  //     .data(topojson.object(topology, topology.objects.countries)
  //         .geometries)
  //   .enter()
  //     .append("path")
  //     .attr("d", path);

  //   });
 
  }
