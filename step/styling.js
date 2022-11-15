class Styling {

  static finalStyling = '';

  constructor() {
    this.cssStyles = {
      'background-color': [this.randomColor],
      'color': [this.randomColor],
      'border-style': ['solid', 'none'],
      'border-color': [this.randomColor],
      'border-width': ['0px', '1px', '2px', '3px'],
      'border-radius': ['0px', '0px', '7px', '100vw'],
      'box-shadow': [this.randomBoxShadow],
    };
    this.styleCounter = 0;
  }

  getAttr() {
    const name = Object.keys(this.cssStyles)[this.styleCounter];
    const values = this.cssStyles[name];
    let value = values[Math.floor(Math.random() * values.length)];
    if (typeof(value) === 'function') {
      value = value();
    }
    const attr = ` ${name}: ${value}`;
    const styling = `${Styling.finalStyling} ${attr}`;
    return styling;
  }

  addAttr(btn) {
    Styling.finalStyling = btn.getAttribute('style');
  }

  randomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return '#' + randomColor;
  }

  randomBoxShadow() {
    const color = randomColor();
    const hOffset = (2 + Math.floor(Math.random() * 5)) + 'px';
    const vOffset = (2 + Math.floor(Math.random() * 5)) + 'px';
    const blur = Math.floor(Math.random() * 6) + 'px';
    return `${hOffset} ${vOffset} ${blur} ${color}`;
  }
  
}