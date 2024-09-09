'use strict'

const api_key = '566ab296add6ff1df484713bf6db458c'; 
const imageBaseURL = 'https://image.tmdb.org/t/p/';

/**
 * Fetching data from a secure server using `URL and passes
 * The result is in JSON file to a callback function, with 
 * optional parameters if it has `optionalParam`.
 */

const fetchDataFromServer = function(url, callback, optionalParam){
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
};

export{imageBaseURL, api_key, fetchDataFromServer};