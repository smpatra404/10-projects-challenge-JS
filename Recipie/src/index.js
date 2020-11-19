const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const meals_container = document.querySelector('.meal-section');
const fav_conatiner = document.querySelector('.fav-section');
const search_btn = document.querySelector('#search-btn');
const home_btn = document.querySelector('#home-btn');
let hearts = document.querySelectorAll('.heart-icon');
let fav_tracker = [];
let hearts_list = [];


async function main() {

    // wait for the home page to be loaded up
    await home_page();

    // rendering home upon clicking on home icon
    home_btn.addEventListener('click', async () => {
        await home_page();
    })

    // handling search button
    search();

    // adding to fav section
    addto_fav(hearts);

    // handling close button click
    fav_conatiner.addEventListener('click', (e) => {
        if (e.target.className == 'close-btn') {
            let id = e.target.parentElement.id
            document.getElementById(id).remove();
            if (document.getElementById(id.slice(0, -3))) {
                document.getElementById(id.slice(0, -3)).querySelector('.heart-icon').classList.remove('clicked');
            }
            let idx = fav_tracker.indexOf(id.slice(0, -3));
            if (idx > -1) {
                fav_tracker.splice(idx, 1)
            }

        }
    });

}
main()

// getting meal details
async function getmeals(name) {
    const meals_list = await fetch(url + name)
        .then(res => res.json())
        .then(json_res => {
            return json_res.meals;
        });
    if (meals_list) {
        return meals_list
    } else {
        alert('Nothing found for meal ' + name)
    }
}
// rendering meal details
async function rendermeals(meals_list) {
    // removing existing results
    document.querySelector('.meal-section').querySelectorAll('.meal-card').forEach((node) => {
        node.remove();
    });
    await meals_list.map((meal) => {
        let meal_card = document.createElement('div');
        meal_card.setAttribute('class', 'meal-card');
        meal_card.setAttribute('id', meal.idMeal);
        if (fav_tracker.includes(meal.idMeal)) {
            meal_card.innerHTML = '<div class="heart-icon clicked">❤</div><img class="meal-image" src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '"><div class="meal-name">' + meal.strMeal + '</div>';
        } else {
            meal_card.innerHTML = '<div class="heart-icon">❤</div><img class="meal-image" src="' + meal.strMealThumb + '" alt="' + meal.strMeal + '"><div class="meal-name">' + meal.strMeal + '</div>';
        }
        meals_container.appendChild(meal_card);
    });
    hearts_list = []
    document.querySelectorAll('.heart-icon').forEach((l) => {
        hearts_list.push(l)
    });
}
// rendering home page
async function home_page() {
    // wait till getting all meal details
    const meals_list = await getmeals('');
    // wait till loading of startup page
    await rendermeals(meals_list);
    addto_fav(document.querySelectorAll('.heart-icon'));
}
// search button 
async function search() {
    search_btn.addEventListener('click', async () => {
        let term = document.querySelector('#search-bar').value;
        const list = await getmeals(term);
        await rendermeals(list);
        document.querySelectorAll('.meal-card').forEach(m => {
            if (fav_tracker.includes(m.id)) {
                m.querySelector('div').classList.add('clicked');
            }
        })
        document.querySelector('#search-bar').value = '';
        addto_fav(document.querySelectorAll('.heart-icon'));
    });

}
// adding to favorite meals section
function addto_fav(hearts) {
    hearts.forEach((heart) => {
        heart.addEventListener('click', () => {
            let meal_id = heart.parentElement.id;
            let src = heart.parentElement.querySelector('img').src;
            let meal_name = heart.parentElement.querySelector('.meal-name').innerText;
            if (!fav_tracker.includes(meal_id)) {
                fav_tracker.push(meal_id);
                let fav_meal = document.createElement('li');
                fav_meal.id = meal_id + 'fav';
                fav_meal.className = 'fav-rounds';
                fav_meal.innerHTML = '<img class="fav-img" src="' + src + '"><div id="' + meal_id + 'cls" class="close-btn">❌</div><span class="fav-name">' + meal_name + '</span>'
                fav_conatiner.appendChild(fav_meal);
            } else {
                document.getElementById(meal_id + 'fav').remove();
                let idx = fav_tracker.indexOf(meal_id);
                if (idx > -1) {
                    fav_tracker.splice(idx, 1)
                }
            }
            heart.classList.toggle('clicked');
        });
    });
}