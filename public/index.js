import Styling from './styling.js';
import PrintButtons from './print.js';
const styling = new Styling(50);
let db = new PrintButtons();
let history = ['font-size: 20px; '];

const mainContainer = document.querySelector('#buttons-container');
buttons();

function finalButton() {
  mainContainer.innerHTML = '';
  mainContainer.innerHTML += `
    <div class="final-ctr" style="background-color: white; color: black; padding-bottom: 30px">
      <button id="final-btn" class="final-btn" style="${Styling.finalStyling}">
      Click Here!
      </button>
    </div>
    <form>
      <label for="fname" style="color: white;">Enter Name: </label>
      <input type="text" autocomplete="off" name="fname" id="fname" required>
      <input type="submit">
    </form>
    `;
  document.querySelector('#final-btn').addEventListener('click', displayCss);
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const btnName = data.get('fname');
    addButtonDB(btnName);
  });
}

function displayCss() {
  document.querySelector('#final-btn').disabled = true;
  const stylingText = `button_name { ${Styling.finalStyling}}`;
  const style = Styling.getFancyStyling(stylingText);
  document.querySelector('.cssStyling').innerHTML = `<p class="button-css">Quick CSS Copy:<br><code>${style}</code></p>`;
}

async function addButtonDB(name) {
  const data = { 
    "name": name,
    "styling": Styling.finalStyling 
  }
  await fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  db = new PrintButtons();
  alert('Button successfully added to Your Buttons!');
}

function buttons() {
  styling.addButtons(mainContainer);
  const buttons = document.querySelectorAll('.rand-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => { next(button.id) });
});
}

function next(id, skip = false) {
  const btn = document.querySelector(`#${id}`);
  backBtn.removeAttribute('disabled');
  backBtn.style.opacity = '1';
  newBtn.removeAttribute('disabled');
  newBtn.style.opacity = '1';
  if (!skip) {
    styling.addAttr(btn);
  }
  history.push(Styling.finalStyling);
  Styling.styleCounter ++;
  if (Styling.styleCounter === Object.keys(Styling.cssStyles).length) {
    finalButton();
    newBtn.innerHTML = 'NEW';
    refreshBtn.disabled = true;
    refreshBtn.style.opacity = '0.5';
    skipBtn.disabled = true;
    skipBtn.style.opacity = '0.5';
    backBtn.disabled = true;
    backBtn.style.opacity = '0.5';
    return;
  }
  buttons();
}

const main = document.querySelector('main');
const header = document.querySelector('header');
const checkbox = document.querySelector('.nav-toggle');
main.style.marginTop = header.clientHeight + 'px';
window.addEventListener('resize', () => {
  checkbox.checked = false;
  main.style.marginTop = header.clientHeight + 'px';
});

const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', () => {
  buttons();
});

const skipBtn = document.querySelector('.skip');
skipBtn.addEventListener('click', () => {
  next('btn-1', true);
});

const newBtn = document.querySelector('.new-btn');
newBtn.addEventListener('click', () => {
  history = new Array();
  newBtn.innerHTML = '&#8810; Reset';
  newBtn.style.display = 'Reset';
  Styling.reset();
  document.querySelector('.cssStyling').innerHTML = ``;
  refreshBtn.disabled = false;
  refreshBtn.style.opacity = '1';
  skipBtn.disabled = false;
  skipBtn.style.opacity = '1';
  backBtn.disabled = true;
  backBtn.style.opacity = '0.5';
  newBtn.disabled = true;
  newBtn.style.opacity = '0.5';
  buttons();
});

const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', () => {
  history.pop();
  Styling.styleCounter -= 1;
  Styling.finalStyling = history[history.length - 1];
  buttons();
  if (history.length === 1) {
    backBtn.disabled = 'true';
    backBtn.style.opacity = '0.5';
  }
});

const homePage = document.querySelector('.home-page');
const pickPage = document.querySelector('.pick-page');
const dbPage = document.querySelector('.db-page');

function showDbPage() {
  db.createTable();
  homePage.style.display = 'none';
  pickPage.style.display = 'none';
  dbPage.style.display = 'flex';
}

function showPickPage() {
  homePage.style.display = 'none';
  pickPage.style.display = 'flex';
  dbPage.style.display = 'none';
}

function showHomePage() {
  homePage.style.display = 'flex';
  pickPage.style.display = 'none';
  dbPage.style.display = 'none';
}

const homeBtn = document.querySelector('.home-btn');
const pickBtn = document.querySelector('.pick-btn');
const dbBtn = document.querySelector('.db-btn');

homeBtn.addEventListener('click', () => {
  showHomePage();
  checkbox.checked = false;
});
pickBtn.addEventListener('click', () => {
  showPickPage();
  checkbox.checked = false;
});
dbBtn.addEventListener('click', () => {
  showDbPage();
  checkbox.checked = false;
});