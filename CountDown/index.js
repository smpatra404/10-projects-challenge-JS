const day_tile = document.getElementById('day');
const hour_tile = document.getElementById('hour');
const min_tile = document.getElementById('min');
const sec_tile = document.getElementById('sec');
const curr_date = new Date();
const date = curr_date.toString().split(' ');
const next_year = parseInt(date[3]) + 1;
const new_year_date = new Date('1 Jan ' + next_year);
let difference = Math.floor(new_year_date - curr_date);
let diff_factor = 0;


function countdown() {
    let day_diff = Math.floor(difference / 86400000);
    diff_factor = day_diff * 86400000
    let hrs_diff = Math.floor((difference - diff_factor) / 3600000);
    diff_factor += hrs_diff * 3600000;
    let min_diff = Math.floor((difference - diff_factor) / 60000);
    diff_factor += min_diff * 60000;
    let sec_diff = Math.floor((difference - diff_factor) / 1000);
    if (day_tile.innerText != day_diff) {
        day_tile.innerText = day_diff;
    }
    if (hour_tile.innerText != hrs_diff) {
        hour_tile.innerText = String(hrs_diff).padStart(2, '0');
    }
    if (min_tile.innerText != min_diff) {
        min_tile.innerText = String(min_diff).padStart(2, '0');
    }
    if (sec_tile.innerText != sec_diff) {
        sec_tile.innerText = String(sec_diff).padStart(2, '0');
    }
    difference -= 1000;
}
setInterval(countdown, 1000)
