import * as d3 from "d3";
import debounce from 'lodash.debounce';
import drawMap from './modules/drawMap';
import createTooltip from './modules/createTooltip';

// import main page styles
import './styles/page-styles.css';

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

// dataset will hold requested JSON data
var globalDataset = [];

// dataset is a promise for the requested json dataset
// let promisedData = getJson(url);

d3.json(url, function(err, dataset) {
      if (err) {
        throw new Error('problem retrieving json data');
      } else {
        globalDataset = dataset;
        drawMap(dataset);
      }
    });

window.onload = () => {
  createTooltip();

  // debounce calls to drawMap on resizing event
  const deboucedResizeGraph = debounce(
    () => {
      d3.select('svg').remove();
      // test to make sure data has been loaded first
      if (globalDataset.features) {
        drawMap(globalDataset);
      }
    },
    250
  );

  window.addEventListener('resize', function(event) {
      deboucedResizeGraph();
  });
};
