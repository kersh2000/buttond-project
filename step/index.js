const numOfRandButtons = 50;
let finalStyling = '';
let counter = 0;
const cssStyles = {
  'background-color': ['random'],
  'color': ['random'],
  'border-style': ['solid', 'none'],
  'border-color': ['random'],
  'border-width': ['0px', '1px', '2px', '3px'],
  'border-radius': ['0px', '0px', '7px', '100vw'],
  'box-shadow': ['box-shadow'],
};

function randomColor() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return '#' + randomColor;
}

function randomBoxShadow() {
  const color = randomColor();
  const hOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
  const vOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
  const blur = Math.floor(Math.random() * 6) + 'px';
  return `${hOffset} ${vOffset} ${blur} ${color}`;
}

function addRandomButtons(num) {
  const mainContainer = document.querySelector('#buttons-container');
  for (let i = 0; i < numOfRandButtons; i++) {
    let styling = "";
    const attr = Object.keys(cssStyles)[num];
    const values = cssStyles[attr];
    let value = values[Math.floor(Math.random() * values.length)];
    if (value === 'random') {
      value = randomColor();
    } else if (value === 'box-shadow') {
      value = randomBoxShadow();
    }
    styling += ` ${attr}: ${value};`;
    mainContainer.innerHTML += `
      <div class="rand-ctr-${i + 1}" style="background-color: white; color: black;">
        <button id="btn-${i}" onclick="next(this.id)" class="rand-btn-${i + 1}" style="margin: 10px; font-size: 20px;
        ${styling} ${finalStyling}">
        Click Here!
        </button>
        <p>Randm Button ${i + 1}</p>
      </div>
      `;
  }
}

addRandomButtons(counter);

function next(id) {
  const btn = document.querySelector(`#${id}`);
  finalStyling = btn.getAttribute('style');
  counter ++;
  const mainContainer = document.querySelector('#buttons-container');
  mainContainer.innerHTML = '';
  addRandomButtons(counter)
}