class Styling {

  static finalStyling;
  static stylesObject;
  static styleCounter;
  static numOfRandBtns;
  static cssStyles;
  static colors = ['black', 'white'];
  static colorCounter = 0;
  static stylesArr;

  static getFancyStyling(styling) {
    let fancyText = "";
    let counter = 0;
    for (let chr of styling) {
      counter ++;
      fancyText += chr;
      if (chr === '{' || chr === ';') {
        fancyText += '<br>';
        if (counter !== styling.length - 1) {
          fancyText += '&emsp;';
        }
      }
    }
    return fancyText;
  }

  static reset() {
    Styling.finalStyling = 'margin: 10px; font-size: 20px;';
    Styling.stylesObject = {'font-size': '20px'};
    Styling.styleCounter = 0;
  }
  
  static randomColor() {
    let color;
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    if (Styling.colors.length === 0) {
      color = randomColor;
    } else {
      const picked = Styling.colors[0];
      Styling.colors.splice(Styling.colors.indexOf(picked), 1);
      color = picked;
    }
    Styling.colorCounter ++;
    if (Styling.colorCounter === Styling.numOfRandBtns) {
      Styling.colors = ['black', 'white']
      Styling.colorCounter = 0;
    }
    return color;
  }

  constructor(numOfRandBtns) {
    Styling.cssStyles = {
      'background-color': [Styling.randomColor],
      'color': [Styling.randomColor],
      'border-style': ['solid', 'none', 'dotted', 'dashed'],
      'border-color': [Styling.randomColor],
      'border-width': ['0px', '1px', '2px', '3px', '4px', '5px'],
      'border-radius': ['none', '3px', '7px', '11px', '100vw'],
      'box-shadow': [this.randomBoxShadow],
      'aspect-ratio': ['1/3', '1/2', '1/1', '2/1', '3/1'],
      'padding1': [this.paddingH, 10],
      'padding2': [this.paddingV, 10],
    };
    Styling.numOfRandBtns = numOfRandBtns;
    Styling.reset();
  }

  paddingH() {
    const arr = ['0px 0px', '0px 2px', '0px 5px', '0px 8px', '0px 12px', '0px 15px', '0px 20px', '0px 30px', '0px 50px', '0px 100px'];
    return arr[Styling.stylesArr.length];
  }

  paddingV() {
    const sub1 = Styling.finalStyling.slice(Styling.finalStyling.indexOf('padding: 0px ') + 13);
    const paddingSides = sub1.slice(0, -1);
    const arr = [`0px ${paddingSides}`, `2px ${paddingSides}`, `5px ${paddingSides}`, `8px ${paddingSides}`, `12px ${paddingSides}`, `15px ${paddingSides}`, `20px ${paddingSides}`, `30px ${paddingSides}`, `50px ${paddingSides}`, `100px ${paddingSides}`];
    return arr[Styling.stylesArr.length];
  }

  randomBoxShadow() {
    const color = Styling.randomColor();
    const hOffset = (3 + Math.floor(Math.random() * 6)) + 'px';
    const vOffset = (3 + Math.floor(Math.random() * 6)) + 'px';
    const blur = Math.floor(Math.random() * 6) + 'px';
    return `${hOffset} ${vOffset} ${blur} ${color}`;
  }

  randomInteger(min, max, end) {
    const randomNum = `${Math.floor(Math.random() * ((max + 1) - min)) + min} ${end}`;
    return randomNum;
  }

  addButtons(container) {
    container.innerHTML = `<p class="attr-descriptor">Select your: <code>${Object.keys(Styling.cssStyles)[Styling.styleCounter].replace(/[0-9]/g, '')}</code></p>`;
    const styles = this.getAttrValues();
    styles.forEach((style, index) => {
      container.innerHTML += `
      <div class="rand-ctr-${index + 1}" style="background-color: white; color: black;">
        <button id="btn-${index + 1}" class="rand-btn" 
          style="${style}">
        Click Here!
        </button>
        <p>Random Button ${index + 1}</p>
      </div>
      `;
    });
  }

  getAttrValues() {
    Styling.stylesArr = new Array();
    const name = Object.keys(Styling.cssStyles)[Styling.styleCounter];
    const values = Styling.cssStyles[name];
    
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (values.length === 1) {
        i = -1;
        if (Styling.numOfRandBtns === Styling.stylesArr.length) {
          break;
        }
        value = value();
      } else if (typeof(values[1]) === 'number') {
        i = -1;
        if (values[1] === Styling.stylesArr.length) {
          break;
        }
        value = value();
      }
      const attr = ` ${name.replace(/[0-9]/g, '')}: ${value};`;
      const styling = `${Styling.finalStyling} ${attr}`;
      Styling.stylesArr.push(styling);
    }
    return Styling.stylesArr;
  }

  addAttr(btn) {
    const style = btn.getAttribute('style');
    const attr = Object.keys(Styling.cssStyles)[Styling.styleCounter].replace(/[0-9]/g, '');
    const lastAttr = style.slice((style.lastIndexOf(` ${attr}: `) + attr.length + 3), -1);
    const newStyle = this.checkAttr(attr, lastAttr);
    Styling.finalStyling = newStyle;
    if (Styling.styleCounter === 2 && btn.style.borderStyle === 'none') {
      Styling.styleCounter += 2;
    } else if (Styling.styleCounter === 7 && btn.style.aspectRatio) {
      Styling.styleCounter += 2;
    }
    btn.setAttribute('style', Styling.finalStyling);
  }

  checkAttr(name, value) {
    Styling.stylesObject[name] = value;
    let text = JSON.stringify(Styling.stylesObject);
    text = text.replace(/[\}\{"]/g, '');
    text = text.replace(/:/g, ': ');
    text = text.replace(/,/g, '; ');
    text += ';';
    return text;
  }  
}

export default Styling;