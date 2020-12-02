const woid_url = 'https://www.metaweather.com/api/location/search/?query=';
const temp_url = 'https://www.metaweather.com/api/location/'
async function fetchid(city) {
    const res = await fetch('https://www.metaweather.com/api/location/search/?query=' + city)
        .then(res => res.json());
    if (res.length > 0) {
        return res;
    }
    else {
        return undefined;
    }
}
async function fetchtemp(city) {
    const id = await fetchid(city);
    if (id) {
        const temp = await fetch('https://www.metaweather.com/api/location/' + id[0].woeid)
            .then(res => res.json());
        return {
            temp: temp.consolidated_weather[0].the_temp,
            city: temp.title,
            icon: temp.consolidated_weather[0].weather_state_abbr,
        };
    } else {
        return undefined;
    }
}
function main() {
    const weatherdiv_element = document.querySelector('.weather-detail');
    const searchbar_element = document.querySelector('#search-box');
    const searchbtn_element = document.querySelector('#search-btn');
    const weathericon_element = document.querySelector('#weather-icon');
    searchbtn_element.addEventListener('click', async () => {
        let res = await fetchtemp(searchbar_element.value);
        if (res) {
            weathericon_element.setAttribute('src', 'https://www.metaweather.com/static/img/weather/' + res.icon + '.svg');
            weatherdiv_element.innerHTML = `<h1> ${res.city} </h1> <h3> ${res.temp} °C</h3>`;
        } else {
            alert('No results found, Try something else.');
        }
        searchbar_element.value = '';
    });
}
main();