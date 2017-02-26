// use axios to request json data from:

import axios from 'axios';

// return a promise for when data is received
export default (url) => {
  return (
    axios.get(url)
      .then(function (response){
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  );
};
