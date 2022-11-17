const table = document.querySelector('.buttons-table');

class PrintButtons {

  constructor() {
    this.data = this.fetchRows();
  }

  async fetchRows() {
    const response = await fetch('http://localhost:5000/user', {
      method: 'GET'
    });
    const data = await response.json();
    const rows = data.users;
    return rows;
  }

  async createTable() {
    table.innerHTML = '';
    const data = await this.data;
    data.forEach((row, index) => {

      const tblRow = document.createElement('section');
      tblRow.classList.add(`row-${index}`, 'buttons-row');

      const options = document.createElement('section');
      options.classList.add('row-options');
      const addBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');
      addBtn.innerHTML = '&#10004;';
      deleteBtn.textContent = 'X';
      addBtn.classList.add('add-btn');
      deleteBtn.classList.add('delete-btn');
      options.append(addBtn, deleteBtn);

      const name = document.createElement('p');
      name.classList.add('btn-name');
      name.textContent = row['name'];

      const ctr = document.createElement('section');
      ctr.classList.add('btn-ctr');
      ctr.style.backgroundColor = row['bgColor'];
      const btn = document.createElement('button');
      btn.setAttribute('style', row['styling']);
      btn.textContent = 'Click Here!';
      ctr.appendChild(btn);

      tblRow.append(options, name, ctr);
      table.append(tblRow);
    });
  }
}

export default PrintButtons;