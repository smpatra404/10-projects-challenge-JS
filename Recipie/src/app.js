const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const searchbox = document.querySelector('#search-bar');
const searchbtn = document.querySelector('#search-btn');
const recipiecards = document.querySelector('.recipie-section');

async function getRecipie(term) {
    return await fetch(url + term)
        .then(res => res.json())
        .then(json_res => {
            return json_res.meals
        });
}

async function main() {
    searchbtn.addEventListener('click', async () => {
        let searchterm = searchbox.value;
        const recipie_list = await getRecipie(searchterm);
        recipie_list.map((recipie) => {
            let recipie_card = document.createElement('div');
            recipie_card.setAttribute('class', 'recipie-card');
            let card_image = document.createElement('img');
            card_image.setAttribute('class', 'card-image');
            card_image.setAttribute('src', recipie.strMealThumb);
            card_image.setAttribute('alt', recipie.strMeal);
            recipie_card.appendChild(card_image);
            let card_name = document.createElement('div');
            card_name.setAttribute('class', 'card-name');
            card_name.innerText = recipie.strMeal;
            recipie_card.appendChild(card_name);
            recipiecards.appendChild(recipie_card);
        });
    });
}
main()

