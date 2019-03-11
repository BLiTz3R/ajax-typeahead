// Get cities file
const endpoint = 'greek-cities.json';

// Get needed html elements
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Init cities array
const cities = [];

// Event listener
searchInput.addEventListener('keyup', displayMatches);

// Fetch cities data from file
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


// Find matches
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex);
    });
}

// Display matches
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    if (this.value !== '') {
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            return `
            <li>
                <span class="name">${cityName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
            `;
        }).join('');
        suggestions.innerHTML = html; 
    } else { // if no keyword, show original text
        suggestions.innerHTML = '<li>Filter for Greek cities\' population</li>' 
    };
}

// Convert number to number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

