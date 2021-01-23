const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const button = document.querySelector('#enable');
button.addEventListener('click', getCurrentCoordsObj);

let currentCoords = {
    lat: undefined,
    lon: undefined
};

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    const arr = cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
    return arr.sort(function(a, b) {
        const aCoords = {lat: a.latitude, lon: a.longitude};
        const bCoords = {lat: b.latitude, lon: b.longitude};
        const aDist = getDistanceFromLatLonInKm(currentCoords, aCoords);
        const bDist = getDistanceFromLatLonInKm(currentCoords, bCoords);
        return aDist >= bDist ? 1 : -1;
    });
}

function getCurrentCoordsObj() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentCoords.lat = position.coords.latitude;
            currentCoords.lon = position.coords.longitude;
        });
    }
}

function getDistanceFromLatLonInKm(current, test) {
    var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(test.lat - current.lat);  // deg2rad below
  var dLon = deg2rad(test.lon - current.lon); 
  var a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(current.lat)) * Math.cos(deg2rad(current.lat)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    if (this.value) {
        const matchArray = findMatches(this.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class=\"hl\">${this.value}</span>`);
            const stateName = place.state.replace(regex, `<span class=\"hl\">${this.value}</span>`);
            return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    } else {
        const html = `
            <li>Filter for a city</li>
            <li>Or a state</li>
        `
        suggestions.innerHTML = html;
    }
}

const searchBar = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchBar.addEventListener('change', displayMatches);
searchBar.addEventListener('keyup', displayMatches);