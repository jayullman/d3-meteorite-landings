import * as d3 from "d3";
// import debounce from 'lodash.debounce';
import getJson from './modules/getJson';
import drawMap from './modules/drawMap';
// import getSvgWidth from './modules/getSvgWidth';
// import { svgWidthPercent } from './constants';

// import main page styles
import './styles/styles.css';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

// dataset will hold requested JSON data
var dataset = [];

// dataset is a promise for the requested json dataset
// let promisedData = getJson(url);

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json', function(err, dataset) {
      if (err) {
        throw new Error('problem retrieving json data');
      } else {
        drawMap(dataset);
        // console.log(dataset);
      }
    })

// const resolvePromise = () => {
//   promisedData
//   .then((dataset) => {
//     drawMap(dataset);
//     console.log(dataset);
//   })
//   .catch(error => console.log(error));
// };

// resolvePromise();