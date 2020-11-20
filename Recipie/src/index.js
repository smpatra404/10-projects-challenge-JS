const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const meals_container = document.querySelector('.meal-section');
const fav_conatiner = document.querySelector('.fav-section');
const search_btn = document.querySelector('#search-btn');
const home_btn = document.querySelector('#home-btn');
const close_overlay = document.querySelector('#page-close');
const overlay_page = document.querySelector('.details-page');
let hearts = document.querySelectorAll('.heart-icon');
let fav_tracker = [];



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

    // handling close button click inside fav icon tiles
    fav_conatiner.addEventListener('click', (e) => {
        // if target is cross button
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
        if (e.target.className == 'fav-img') {
            let id = e.target.parentElement.id;
            id = id.substring(0, id.length - 3);
            show_details(id);
        }
    });

    // showing details of meal upon clicking its card
    meals_container.addEventListener('click', async (e) => {
        if (e.target.className == 'meal-name' || e.target.className == 'meal-image') {
            const id = e.target.parentElement.id;
            show_details(id);
        }
    })

    // handling close action of overlay page
    close_overlay.addEventListener('click', () => {
        overlay_page.classList.toggle('hide');
    })
}

// calling main function
main()

// getting meal by id
async function mealbyid(id) {
    let url = ' https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    const meals_list = await fetch(url + id)
        .then(res => res.json())
        .then(json_res => {
            return json_res.meals;
        });
    if (meals_list) {
        return meals_list[0]
    } else {
        alert('Nothing found for meal ' + name)
    }
}

// getting meal details by name
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
    if (meals_list) {
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

// showing details about selected meal
async function show_details(id) {
    const meal = await mealbyid(id);
    overlay_page.classList.toggle('hide');
    overlay_page.querySelector('#overlay-image').src = meal.strMealThumb;
    overlay_page.querySelector('#overlay-image').alt = meal.strMeal;
    overlay_page.querySelector('.about-meal h2').innerText = meal.strMeal;
    overlay_page.querySelector('.about-meal h4').innerText = meal.strArea;
    overlay_page.querySelector('.about-meal p').innerText = meal.strInstructions;
    let li_html = ''
    let c = 0;
    Object.keys(meal).map((m) => {
        if (/strIngredient*/.test(m)) {
            if (meal[m]) {
                li_html += '<li>' + meal[m] + ' : ' + meal['strMeasure' + m.slice(13)] + '</li>';
            }
        }
    })
    overlay_page.querySelector('.about-meal ul').innerHTML = li_html;
}