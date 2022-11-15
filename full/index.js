const numOfRandButtons = 50;
const cssStyles = {
  'background-color': ['random'],
  'color': ['random'],
  'border-color': ['random'],
  'border-width': ['0px', '1px', '2px', '3px'],
  'border-style': ['solid', 'none'],
  'border-radius': ['0px', '7px', '100vw'],
  'box-shadow': ['box-shadow'],

};

function randomColor() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return '#' + randomColor;
}

function randomBoxShadow() {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  const hOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
  const vOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
  const blur = Math.floor(Math.random() * 6) + 'px';
  return `${hOffset} ${vOffset} ${blur} ${randomColor}`;
}

function addRandomButtons(max = Object.keys(cssStyles).length) {
  const mainContainer = document.querySelector('#buttons-container');
  for (let i = 0; i < numOfRandButtons; i++) {
    let styling = "";
    const indicies = new Array();
    const numOfStyles = max
    for (let j = 0; j < numOfStyles; j++) {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * Object.keys(cssStyles).length);
      } while (indicies.includes(randomNum));
      indicies.push(randomNum);
      const attr = Object.keys(cssStyles)[randomNum];
      const values = cssStyles[attr];
      let value = values[Math.floor(Math.random() * values.length)];
      if (value === 'random') {
        value = randomColor();
      } else if (value === 'box-shadow') {
        value = randomBoxShadow();
      }
      styling += ` ${attr}: ${value};`;
    }
    mainContainer.innerHTML += `
      <div class="rand-ctr-${i + 1}" style="background-color: white;">
        <button class="rand-btn-${i + 1}" style="margin: 10px; font-size: 20px;
        ${styling}">
        Click Here!
        </button>
        <p>Randm Button ${i + 1}</p>
      </div>
      `;
  }
}

addRandomButtons();