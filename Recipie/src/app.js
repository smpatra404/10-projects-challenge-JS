const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const searchbox = document.querySelector('#search-bar');
const searchbtn = document.querySelector('#search-btn');
const recipiecards = document.querySelector('.recipie-section');
const favorites = document.querySelector('.fav-section');
const home = document.getElementById('home-btn');
let favs = [];


// Main function
async function main() {
    // Render random recipies for welcome page
    await render_recipiecards('');
    // Home button
    home.addEventListener('click', async () => {
        document.querySelectorAll('.recipie-card').forEach(ele => {
            ele.remove();
        });
        searchbox.value = '';
        await render_recipiecards('');
        addtofav(document.querySelectorAll('.heart-icon'));
    });
    // Handelling search button click
    searchbtn.addEventListener('click', async () => {
        // Remove all the existing cards
        document.querySelectorAll('.recipie-card').forEach(ele => {
            ele.remove();
        });
        // Render recipie cards
        const searchterm = searchbox.value;
        await render_recipiecards(searchterm);

        addtofav(document.querySelectorAll('.heart-icon'));
    });
    // Adding or Removing recipies from fav
    addtofav(document.querySelectorAll('.heart-icon'));
}
// Calling main
main()


// Fetching recipies from api
function getRecipie(term) {
    return fetch(url + term)
        .then(res => res.json())
        .then(json_res => {
            return json_res.meals
        });
}
// Rendering all the recipie cards
async function render_recipiecards(term) {
    // Getting recipie details
    recipie_list = await getRecipie(term);
    // If recipies found then render
    if (recipie_list) {
        recipie_list.map((recipie) => {
            // Creating new card and its child elements
            let recipie_card = document.createElement('div');
            recipie_card.setAttribute('class', 'recipie-card');
            recipie_card.setAttribute('id', recipie.idMeal);
            let heart_icon = document.createElement('div');
            heart_icon.setAttribute('class', 'heart-icon');
            heart_icon.innerText = '❤';
            recipie_card.appendChild(heart_icon);
            let card_image = document.createElement('img');
            card_image.setAttribute('class', 'card-image');
            card_image.setAttribute('src', recipie.strMealThumb);
            card_image.setAttribute('alt', recipie.strMeal);
            recipie_card.appendChild(card_image);
            let card_name = document.createElement('div');
            card_name.setAttribute('class', 'card-name');
            card_name.innerText = recipie.strMeal;
            recipie_card.appendChild(card_name);
            //Adding the newly created card to list of cards
            recipiecards.appendChild(recipie_card);

            // If the card is already in fav list then make heart red
            if (favs.length > 0) {
                favs.forEach((f) => {
                    if (f == recipie.idMeal) {
                        document.getElementById(f).querySelector('.heart-icon').classList.add('clicked');
                    }
                });
            }
        });
    }
    // If not found then error popup
    else {
        alert('No items found for ' + term);
    }
}
// Function to add recipe in favorite section
async function addtofav(hearts) {
    hearts.forEach((heart) => {
        heart.addEventListener('click', () => {
            //If recipie doesn't exist in fav then add
            if (!favs.includes(heart.parentElement.id)) {
                let fav_li = document.createElement('li');
                fav_li.setAttribute('id', heart.parentElement.id + 'fav');
                let img = document.createElement('img');
                img.setAttribute('class', 'fav-img');
                img.setAttribute('src', heart.parentElement.querySelector('.card-image').src);
                fav_li.appendChild(img);
                let span = document.createElement('span');
                span.setAttribute('class', 'fav-name');
                span.innerText = heart.parentElement.querySelector('.card-name').innerText;
                fav_li.appendChild(span);
                favorites.appendChild(fav_li);
                favs.push(heart.parentElement.id);
            }
            //Else remove it
            else {
                document.getElementById(heart.parentElement.id + 'fav').remove();
                let idx = favs.indexOf(heart.parentElement.id)
                if (idx > -1) {
                    favs.splice(idx, 1);
                };
            }
            // Making heart red/white based on selection
            heart.classList.toggle('clicked');
        });
    });
}