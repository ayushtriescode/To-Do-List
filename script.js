const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('myList');

let itemsArray = JSON.parse(localStorage.getItem('myTasks')) || [] ;

renderlist();

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if(text !== ""){
        itemsArray.push(text);
        updateStorage();
        renderlist();
        input.value = "";
    }
});

function renderlist() {
    list.innerHTML = "";

    itemsArray.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="output-li">
        <div>
            <span>${item}</span>
        </div>
        <div>
            <input type="checkbox">
            <i class="fas fa-trash" onclick="deleteItem(${index})"></i>
        </div>
    </div>`;
    list.appendChild(li)       
    });
}

function deleteItem(index) {
    itemsArray.splice(index, 1);
    updateStorage();
    renderlist();
}

function updateStorage() {
    localStorage.setItem('myTasks', JSON.stringify(itemsArray));
}

input.addEventListener('keypress', (e) => {
    if(e.key === "Enter") addBtn.click();
});