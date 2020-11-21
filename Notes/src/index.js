const addnotes_element = document.querySelector('.add-icon');
const addnotesicon_element = document.querySelector('.add-icon i');
const notesform_element = document.querySelector('.card-form');
const formcheck_element = document.querySelector('#form-check');
const formtrash_element = document.querySelector('#form-trash');
const formheading_element = document.querySelector('#form-heading');
const cardscontainer_elements = document.querySelector('.cards-container');
const formbody_element = document.querySelector('#form-body');
const cardpopup_element = document.querySelector('.card-popup');
const h_insidepopup = document.querySelector('.card-popup h1');
const p_insidepopup = document.querySelector('.card-popup p');
let cards_list = [];
let count = 0;
let eyes = [];
let cross = [];
// handling addnotes click
addnotesicon_element.addEventListener('click', () => {
    notesform_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
})

// handling tick click on form 
formcheck_element.addEventListener('click', () => {
    if (!formheading_element.value) {
        alert('Heading field can not be empty !!!')
    }
    else {
        let heading = formheading_element.value;
        const note_card = document.createElement('div');
        note_card.setAttribute('id', count);
        note_card.setAttribute('class', 'card');
        note_card.innerHTML = `<div class="card-heading">
              `+ heading + `
            </div>
            <div class="card-i">
              <i id="eye`+ count + `" class="fa fa-eye"></i>
              <i class="fa fa-times" aria-hidden="true"></i>
            </div>`;
        notesform_element.classList.toggle('active');
        addnotes_element.classList.toggle('hide');
        cardscontainer_elements.appendChild(note_card);
        cards_list.push({
            heading: formheading_element.value,
            body: formbody_element.value
        })
        formheading_element.value = '';
        formbody_element.value = '';
        count += 1;
        eyes = [];
        cross = [];
        eyes.push(note_card.querySelector('.fa.fa-eye'));
        cross.push(note_card.querySelector('.fa.fa-times'));
    }
    eyes.forEach((eye) => {
        eye.addEventListener('click', () => {
            let idx = eye.parentElement.parentElement.id;
            h_insidepopup.innerText = cards_list[idx].heading;
            p_insidepopup.innerText = cards_list[idx].body;

            addnotes_element.classList.toggle('hide');
            cardpopup_element.classList.toggle('active');
        })
    })
    cross.forEach((x) => {
        x.addEventListener('click', () => {
            let id = x.parentElement.parentElement.id;
            document.getElementById(id).remove();
        })
    })
})

// handling trash click on from
formtrash_element.addEventListener('click', () => {
    formheading_element.value = '';
    formbody_element.value = '';
    notesform_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
})


document.querySelector('.card-popup i').addEventListener('click', () => {
    cardpopup_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
})






// warning on refreshing the screen
// window.onbeforeunload = function () {
//     return "Data will be lost if you leave the page, are you sure?";
// };