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
            checked: false 
        });
    updateStorage();
    renderlist();
    input.value = "";
  }
});

function renderlist() {
  list.innerHTML = "";

  itemsArray.forEach((item, index) => {
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
                <i class="fas fa-trash" onclick="deleteItem(${index})"></i>
                <input type="checkbox" ${isTicked} onclick="toggleCheck(${index})">
            </div>
        </div>`;
    list.appendChild(li);
  });
}

function deleteItem(index) {
  itemsArray.splice(index, 1);
  updateStorage();
  renderlist();
}

function toggleCheck(index) {
  itemsArray[index].checked = !itemsArray[index].checked;
  updateStorage();
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
