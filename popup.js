const STORAGE_KEY = 'lunarServers';
const ORDER_KEY = 'lunarOrder';
let draggedFolder = null;

function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function getFolderOrder() {
  const data = getData();
  const order = JSON.parse(localStorage.getItem(ORDER_KEY)) || Object.keys(data);
  const validOrder = order.filter(name => name in data);
  const extras = Object.keys(data).filter(name => !validOrder.includes(name));
  return [...validOrder, ...extras];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveOrder(order) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
}

function render() {
  const select = document.getElementById('folderSelect');
  if (select) {
    const folderOrder = getFolderOrder();
    select.innerHTML = '<option value="" disabled selected>Choisir un dossier</option><option value="__new__">+ Nouveau dossier</option>';
    folderOrder.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
  }

  const container = document.getElementById('foldersContainer');
  container.innerHTML = '';
  const data = getData();
  const folderOrder = getFolderOrder();

  folderOrder.forEach(folderName => {
    const servers = data[folderName];
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder';
    folderDiv.dataset.folder = folderName;
    folderDiv.draggable = true;

    folderDiv.ondragenter = (e) => {
      e.preventDefault();
      folderDiv.classList.add('drag-over');
    };
    folderDiv.ondragleave = () => {
      folderDiv.classList.remove('drag-over');
    };
    folderDiv.ondragover = (e) => e.preventDefault();
    folderDiv.ondrop = (e) => {
      e.preventDefault();
      folderDiv.classList.remove('drag-over');
      if (draggedFolder && draggedFolder !== folderName) {
        const currentOrder = getFolderOrder();
        const fromIndex = currentOrder.indexOf(draggedFolder);
        const toIndex = currentOrder.indexOf(folderName);
        currentOrder.splice(fromIndex, 1);
        currentOrder.splice(toIndex, 0, draggedFolder);
        saveOrder(currentOrder);
        render();
      }
    };

    folderDiv.ondragstart = () => {
      draggedFolder = folderName;
    };
    folderDiv.ondragend = () => {
      draggedFolder = null;
    };

    const title = document.createElement('h2');
    title.textContent = folderName;
    folderDiv.appendChild(title);

    servers.forEach((server, index) => {
      const row = document.createElement('div');
      row.className = 'row';

      const btn = document.createElement('button');
      btn.className = 'server-btn';
      btn.textContent = server.name;
      btn.draggable = true;
      btn.onclick = () => {
        window.location.href = `lunarclient://play?serverAddress=${server.address}`;
      };
      btn.ondragstart = () => {
        window.draggedServer = { folder: folderName, index };
      };

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = '✖';
      del.onclick = () => {
        data[folderName].splice(index, 1);
        if (data[folderName].length === 0) {
          delete data[folderName];
          const order = getFolderOrder().filter(name => name !== folderName);
          saveOrder(order);
        }
        saveData(data);
        render();
      };

      row.appendChild(btn);
      row.appendChild(del);
      folderDiv.appendChild(row);
    });

    container.appendChild(folderDiv);
  });
}

document.getElementById('folderSelect').addEventListener('change', (e) => {
  const show = e.target.value === '__new__';
  document.getElementById('newFolderInput').style.display = show ? 'block' : 'none';
});

document.getElementById('addServerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const select = document.getElementById('folderSelect');
  const newFolderInput = document.getElementById('newFolderInput');

  const folder = select.value === '__new__'
    ? newFolderInput.value.trim()
    : select.value;

  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!folder || !name || !address) return;

  const data = getData();
  const order = getFolderOrder();

  if (!data[folder]) {
    data[folder] = [];
    if (!order.includes(folder)) order.push(folder);
    saveOrder(order);
  }

  data[folder].push({ name, address });
  saveData(data);
  render();

  select.value = '';
  newFolderInput.value = '';
  newFolderInput.style.display = 'none';
  document.getElementById('name').value = '';
  document.getElementById('address').value = '';
});

render();
