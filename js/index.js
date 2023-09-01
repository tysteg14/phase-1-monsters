const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

// Function to fetch monsters
const getMonsters = (page) => {
  fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      const monsterContainer = document.querySelector('#monster-container');
      monsterContainer.innerHTML = '';
      monsters.forEach(monster => createMonsterCard(monster));
    });
};

// Function to create a monster card
const createMonsterCard = (monster) => {
  const card = document.createElement('div');
  const name = document.createElement('h2');
  const age = document.createElement('h4');
  const description = document.createElement('p');

  name.textContent = monster.name;
  age.textContent = `Age: ${monster.age}`;
  description.textContent = `Bio: ${monster.description}`;

  card.appendChild(name);
  card.appendChild(age);
  card.appendChild(description);

  document.querySelector('#monster-container').appendChild(card);
};

// Function to create the monster form
const createMonsterForm = () => {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const descriptionInput = document.createElement('input');
  const createButton = document.createElement('button');

  form.id = 'monster-form';
  nameInput.id = 'name';
  ageInput.id = 'age';
  descriptionInput.id = 'description';

  nameInput.placeholder = 'Name...';
  ageInput.placeholder = 'Age...';
  descriptionInput.placeholder = 'Description...';

  createButton.textContent = 'Create';

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(createButton);

  document.querySelector('#create-monster').appendChild(form);
  addSubmitEventListener();
};

// Function to add submit event listener to the form
const addSubmitEventListener = () => {
  document.querySelector('#monster-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = getFormData();
    postNewMonster(formData);
    clearForm();
  });
};

// Function to get form data
const getFormData = () => {
  const name = document.querySelector('#name').value;
  const age = parseFloat(document.querySelector('#age').value);
  const description = document.querySelector('#description').value;
  return { name, age, description };
};

// Function to post a new monster
const postNewMonster = (data) => {
  const url = `${URL_PREFIX}monsters`;
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(newMonster => console.log('New monster:', newMonster));
};

// Function to clear the form
const clearForm = () => {
  document.querySelector('#monster-form').reset();
};

// Function to add navigation listeners
const addNavListeners = () => {
  const backButton = document.querySelector('#back');
  const forwardButton = document.querySelector('#forward');

  backButton.addEventListener('click', () => {
    pageDown();
  });

  forwardButton.addEventListener('click', () => {
    pageUp();
  });
};

// Function to go to the next page
const pageUp = () => {
  page++;
  getMonsters(page);
};

// Function to go to the previous page
const pageDown = () => {
  if (page > 1) {
    page--;
    getMonsters(page);
  } else {
    alert('There are no monsters on this page.');
  }
};

// Initialization
const init = () => {
  getMonsters(page);
  createMonsterForm();
  addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);
