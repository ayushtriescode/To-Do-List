let currentFilter = 'all'
const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("myList");

let itemsArray = JSON.parse(localStorage.getItem("myTasks")) || [];

renderlist();

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    itemsArray.push({ 
            text: text, 
            checked: false,
            id: Date.now(),
            priority: 'low',
            createdAt: Date() 
        });
    updateStorage();
    renderlist();
    input.value = "";
  }
});

function renderlist() {
  list.innerHTML = "";

  let filterArray = itemsArray;

  if(currentFilter === 'active'){
    filterArray = itemsArray.filter(item => !item.checked);
  }
  else if(currentFilter === 'completed'){
    filterArray = itemsArray.filter(item => item.checked);
  }

  filterArray.forEach((item) => {
    const li = document.createElement("li");
    const isDone = item.checked
      ? 'style="text-decoration: line-through; opacity: 0.5"'
      : "";
    const isTicked = item.checked ? "checked" : "";

    li.innerHTML = `
        <div class="output-li">
            <div ${isDone}>
                <span>${item.text}</span>
            </div>
            <div class="li-btn">
                <i class="fas fa-trash" onclick="deleteItem(${item.id})"></i>
                <input type="checkbox" ${isTicked} onclick="toggleCheck(${item.id})">
            </div>
        </div>`;
    list.appendChild(li);
  });
}

function deleteItem(id) {
  itemsArray = itemsArray.filter(item => item.id !== id);
  updateStorage();
  renderlist();
}

function toggleCheck(id) {
  const task = itemsArray.find(item => item.id === id);
  if (task) {
        task.checked = !task.checked;
    }
  updateStorage();
  renderlist(); 
}

function setFilter(filter){
  currentFilter = filter ;
  renderlist();
}

function clearAll() {
  itemsArray = [];
  updateStorage();
  renderlist();
}

function updateStorage() {
  localStorage.setItem("myTasks", JSON.stringify(itemsArray));
}

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});
