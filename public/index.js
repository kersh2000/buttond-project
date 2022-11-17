import Styling from './styling.js';
const styling = new Styling(50);
let history = new Array();

const mainContainer = document.querySelector('#buttons-container');
buttons();

function finalButton() {
  mainContainer.innerHTML = '';
  mainContainer.innerHTML += `
    <div class="final-ctr" style="background-color: white; color: black;">
      <button id="final-btn" class="final-btn" style="${Styling.finalStyling}">
      Click Here!
      </button>
      <p>Your Button!</p>
    </div>
    `;
  document.querySelector('#final-btn').addEventListener('click', addButtonDB);
}

async function addButtonDB() {
  const data = { 
    "name": "First Button",
    "styling": Styling.finalStyling 
  }
  document.querySelector('#final-btn').disabled = true;
  const stylingText = `button_name { ${Styling.finalStyling}}`;
  const style = Styling.getFancyStyling(stylingText);
  document.querySelector('.cssStyling').innerHTML = `<p class="button-css">Quick CSS Copy:<br><code>${style}</code></p>`;
  const response = await fetch('http://localhost:5000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await response.json().then(data => console.log(data));
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
  Styling.styleCounter --;
  buttons();
  if (history.length === 0) {
    backBtn.disabled = 'true';
    backBtn.style.opacity = '0.5';
  }
});

const homePage = document.querySelector('.home-page');
const pickPage = document.querySelector('.pick-page');
const dbPage = document.querySelector('.db-page');

function showDbPage() {
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