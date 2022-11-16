import Styling from './styling.js';
const styling = new Styling(50);

const mainContainer = document.querySelector('#buttons-container');
buttons();

function finalButton() {
  mainContainer.innerHTML = '';
  mainContainer.innerHTML += `
    <div class="final-ctr" style="background-color: white; color: black;">
      <button id="final-btn" class="final-btn" style="${Styling.finalStyling}">
      Click Here!
      </button>
      <p>You're Button!</p>
    </div>
    `;
  document.querySelector('#final-btn').addEventListener('click', addButtonDB);
}

function addButtonDB() {
  document.querySelector('#final-btn').disabled = true;
  const stylingText = `button_name { ${Styling.finalStyling}}`;
  const style = Styling.getFancyStyling(stylingText);
  document.querySelector('.cssStyling').innerHTML += `<p class="button-css">${style}</p>`;
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
  if (!skip) {
    styling.addAttr(btn);
  }
  Styling.styleCounter ++;
  if (Styling.styleCounter === Object.keys(Styling.cssStyles).length) {
    finalButton();
    refreshBtn.disabled = true;
    refreshBtn.style.opacity = '0.5';
    skipBtn.disabled = true;
    skipBtn.style.opacity = '0.5';
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

// const numOfRandButtons = 50;
// const mainContainer = document.querySelector('#buttons-container');
// let finalStyling = 'margin: 10px; font-size: 20px;';
// let counter = 0;
// const cssStyles = {
//   'background-color': [randomColor],
//   'color': [randomColor],
//   'border-style': ['solid', 'none'],
//   'border-color': [randomColor],
//   'border-width': ['0px', '1px', '2px', '3px'],
//   'border-radius': ['0px', '0px', '7px', '100vw'],
//   'box-shadow': [randomBoxShadow],
// };

// function randomColor() {
//   const randomColor = Math.floor(Math.random()*16777215).toString(16);
//   return '#' + randomColor;
// }

// function randomBoxShadow() {
//   const color = randomColor();
//   const hOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
//   const vOffset = (2 + Math.ceil(Math.random() * 2)) + 'px';
//   const blur = Math.floor(Math.random() * 6) + 'px';
//   return `${hOffset} ${vOffset} ${blur} ${color}`;
// }

// function addRandomButtons(num) {
//   mainContainer.innerHTML = '';
//   for (let i = 0; i < numOfRandButtons; i++) {
//     const attr = Object.keys(cssStyles)[num];
//     const values = cssStyles[attr];
//     let value = values[Math.floor(Math.random() * values.length)];
//     if (typeof(value) === 'function') {
//       value = value();
//     }
//     const styling = ` ${attr}: ${value};`;
//     mainContainer.innerHTML += `
//       <div class="rand-ctr-${i + 1}" style="background-color: white; color: black;">
//         <button id="btn-${i + 1}" onclick="next(this.id)" class="rand-btn-${i + 1}" style="${styling} ${finalStyling}">
//         Click Here!
//         </button>
//         <p>Randm Button ${i + 1}</p>
//       </div>
//       `;
//   }
// }

// function finalButton() {
//   mainContainer.innerHTML = '';
//   mainContainer.innerHTML += `
//     <div class="final-ctr" style="background-color: white; color: black;">
//       <button id="final-btn" class="final-btn" onclick="addButtonDB()" style="${finalStyling}">
//       Click Here!
//       </button>
//       <p>You're Button!</p>
//     </div>
//     `;
// }

// function addButtonDB() {
//   const styling = `button_name { ${finalStyling}}`;
//   const style = fancy(styling);
//   document.querySelector('body').innerHTML += `<p class="button-css">${style}</p>`;
// }

// function fancy(styling) {
//   let text = "";
//   let counter = 0;
//   for (let chr of styling) {
//     counter ++;
//     text += chr;
//     if (chr === '{' || chr === ';') {
//       text += '<br>';
//       if (counter !== styling.length - 1) {
//         text += '&emsp;';
//       }
//     }
//   }
//   return text;
// }

// addRandomButtons(counter);

// function next(id, skip = false) {
//   console.log(`#${id}`);
//   const btn = document.querySelector(`#${id}`);
//   if (!skip) {
//     finalStyling = btn.getAttribute('style');
//     counter ++;
//     if (counter === Object.keys(cssStyles).length) {
//       finalButton();
//       return;
//     }
//   }
//   addRandomButtons(counter)
// }