const table = document.querySelector('.buttons-table');

class PrintButtons {

  constructor() {
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
    const data = await this.fetchRows();
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
      deleteBtn.addEventListener('click', (e) => { this.removeEntry(e) });
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
      btn.id = row['_id'];
      ctr.appendChild(btn);

      tblRow.append(options, name, ctr);
      table.append(tblRow);
    });
  }

  async removeEntry(e) {
    const row = e.path[2];
    const id = row.lastElementChild.lastElementChild.id;
    const response = await fetch(`http://localhost:5000/user/${id}`, {
      method: 'DELETE'
    });
    await response.json().then(data => console.log(data));
    table.removeChild(row);
  }
}

export default PrintButtons;