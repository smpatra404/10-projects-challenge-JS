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
    // else add note to collection
    // getting heading value in to show inside card
    let heading = formheading_element.value;
    // creating card div
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
    // hiding add icon and input form before appending card to the container
    notesform_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
    // appending to container
    cardscontainer_elements.appendChild(note_card);
    // storing in a variable for showcasing details after clicking on card
    cards_list.push({
        heading: formheading_element.value,
        body: formbody_element.value
    })
    // resetting values inside text boxes
    formheading_element.value = '';
    formbody_element.value = '';
    // incremnting count, and resetting eyes & cross list to populate those with newly added elements
    count += 1;
    eyes = [];
    cross = [];
    eyes.push(note_card.querySelector('.fa.fa-eye'));
    cross.push(note_card.querySelector('.fa.fa-times'));
    // handling clicks on eye icons present in the notes card
    eyes.forEach((eye) => {
        eye.addEventListener('click', () => {
            // getting data for note from cards_list variable to showcase in the nots popup
            let idx = eye.parentElement.parentElement.id;
            h_insidepopup.innerText = cards_list[idx].heading;
            p_insidepopup.innerText = cards_list[idx].body;

            // hiding add icon and showing notes popup
            addnotes_element.classList.toggle('hide');
            cardpopup_element.classList.toggle('active');
        })
    })
    // handling clicks on cross icons present in the notes card
    cross.forEach((x) => {
        x.addEventListener('click', () => {
            // getting id of the parent card element and removing it
            let id = x.parentElement.parentElement.id;
            document.getElementById(id).remove();
        })
    })
})

// handling trash click on create note form
formtrash_element.addEventListener('click', () => {
    formheading_element.value = '';
    formbody_element.value = '';
    notesform_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
})

// handling cross icon of notes popup 
document.querySelector('.card-popup i').addEventListener('click', () => {
    cardpopup_element.classList.toggle('active');
    addnotes_element.classList.toggle('hide');
});