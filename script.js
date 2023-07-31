const addBtn = document.querySelector('.btn'),
input = document.querySelector('.input-list'),
list = document.querySelector('.list'),
closeDoneList = document.querySelector('.close'),
modal = document.querySelector('.modal-done-list'),
openDoneList = document.querySelector('.bone-button'),
doneList = document.querySelector('.dones-list');

addBtn.addEventListener('click', function() {
if (input.value.trim() !== '') {
    const li = document.createElement('li');
    const btnDel = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    btnDel.classList.add('delete-list');
    btnDel.textContent = 'delete';

    li.appendChild(checkBox);
    const textNode = document.createTextNode(input.value);
    li.appendChild(textNode);
    list.prepend(li);
    li.appendChild(btnDel);

    checkBox.addEventListener('click', () => {
        if (checkBox.checked) {
            doneList.appendChild(li);
            const doneText = document.createElement('div');
            doneText.textContent = `Задание: ${input.value} перемещено в выполненные задания!`;
            doneText.style.fontSize = '20px';
            doneText.style.color = 'green';
            list.append(doneText);
            setTimeout(() => {
                doneText.remove();
            }, 1500);
        } else {
            list.appendChild(li);
            const doneText = document.createElement('div');
            doneText.textContent = `Задание: ${input.value} перемещено в не выполненные задания!`;
            doneText.style.fontSize = '20px';
            doneText.style.color = 'red';
            doneList.append(doneText);
            setTimeout(() => {
                doneText.remove();
            }, 1500);
        }

        saveTodoListToLocalStorage();
    });

    btnDel.addEventListener('click', () => {
        li.remove();
        saveTodoListToLocalStorage();
    });

    saveTodoListToLocalStorage();
    input.value = '';
} else {
    const notText = document.createElement('div');
    notText.textContent = "ТЕКСТА НЕТУ, ВВЕДИТЕ ЕГО!";
    notText.style.fontSize = '30px';
    notText.style.color = 'red';
    listContainer.append(notText);
    setTimeout(() => {
        notText.remove();
    }, 1000);
}
});

openDoneList.addEventListener('click', () => {
modal.classList.add('displaydone');
});

closeDoneList.addEventListener('click', () => {
modal.classList.remove('displaydone');
});

function saveTodoListToLocalStorage() {
const todoItems = [];
const doneItems = [];

const listItems = list.querySelectorAll('li');
const doneListItems = doneList.querySelectorAll('li');

listItems.forEach((li) => {
    const itemText = li.textContent.slice(0, -6);
    const isChecked = li.querySelector('input[type="checkbox"]').checked;
    todoItems.push({ text: itemText, checked: isChecked });
});

doneListItems.forEach((li) => {
    const itemText = li.textContent.slice(0, -6);
    const isChecked = li.querySelector('input[type="checkbox"]').checked;
    doneItems.push({ text: itemText, checked: isChecked });
});

localStorage.setItem('todoList', JSON.stringify(todoItems));
localStorage.setItem('doneList', JSON.stringify(doneItems));
}

function loadTodoListFromLocalStorage() {
const savedTodoList = localStorage.getItem('todoList');
if (savedTodoList) {
    const todoItems = JSON.parse(savedTodoList);
    todoItems.forEach((item) => {
        createListItem(item, list);
    });
}
}

function loadDoneListFromLocalStorage() {
const savedDoneList = localStorage.getItem('doneList');
if (savedDoneList) {
    const doneItems = JSON.parse(savedDoneList);
    doneItems.forEach((item) => {
        createListItem(item, doneList);
    });
}
}

function createListItem(item, targetList) {
const li = document.createElement('li');
const btnDel = document.createElement('button');
const checkBox = document.createElement('input');
checkBox.type = 'checkbox';
btnDel.classList.add('delete-list');
btnDel.textContent = 'delete';

li.appendChild(checkBox);
const textNode = document.createTextNode(item.text);
li.appendChild(textNode);
targetList.prepend(li);
li.appendChild(btnDel);

checkBox.checked = item.checked;

checkBox.addEventListener('click', () => {
    if (checkBox.checked) {
        doneList.appendChild(li);
    } else {
        list.appendChild(li);
    }

    saveTodoListToLocalStorage();
});

btnDel.addEventListener('click', () => {
    li.remove();
    saveTodoListToLocalStorage();
});
}

window.addEventListener('DOMContentLoaded', () => {
loadTodoListFromLocalStorage();
loadDoneListFromLocalStorage();
});




































































//MY CODE


// const addBtn = document.querySelector('.btn'),
//       input = document.querySelector('.input-list'),
//       list = document.querySelector('.list'),
//       listContainer = document.querySelector('.todolist-container'),
//       closeDoneList = document.querySelector('.close'),
//       modal = document.querySelector('.modal-done-list'),
//       openDoneList = document.querySelector('.bone-button'),
//       doneList = document.querySelector('.dones-list'),
//       doneItem = document.querySelector('.dones-list li');

// addBtn.addEventListener('click', function() {
//     if(!input.value.length == 0) {
//         const li = document.createElement('li');
//         const btnDel = document.createElement('button');
//         const checkBox = document.createElement('input');
//         checkBox.type = 'checkbox';
//         btnDel.classList.add('delete-list');
//         btnDel.textContent = 'delete';
//         if(input.value.length <= 30) {
//             li.appendChild(checkBox);
//             const textNode = document.createTextNode(input.value);
//             li.appendChild(textNode);
//             list.prepend(li);
//             li.appendChild(btnDel);
//         } else if(input.value.length >= 31) {
//             const notText = document.createElement('div');
//             notText.textContent = "МНОГО ТЕКСТА!";
//             notText.style.fontSize = '30px';

//             notText.style.color = 'red';
//             listContainer.append(notText);
//             setTimeout(() => {
//                 notText.remove();
//             }, 1000)
//         }
//         checkBox.addEventListener('click', () => {
//             if(checkBox.checked) {
//                 doneList.appendChild(li);
//                 const doneText = document.createElement('div');
//                 doneText.textContent = `Задание: ${li.textContent.slice(0, -6)} перемещено в выполненные задания!`;
//                 doneText.style.fontSize = '20px';
//                 doneText.style.color = 'green';
//                 list.append(doneText);
//                 setTimeout(() => {
//                     doneText.remove();
//                 }, 1500)
//             } else if(!checkBox.checked) {
//                 list.append(li);
//                 const doneText = document.createElement('div');
//                 doneText.textContent = `Задание: ${li.textContent.slice(0, -6)} перемещено в не выполненные задания!`;
//                 doneText.style.fontSize = '20px';
//                 doneText.style.color = 'red';
//                 doneList.append(doneText);
//                 setTimeout(() => {
//                     doneText.remove();
//                 }, 1500)
//             }
//         });

//         input.value = '';
//         btnDel.addEventListener('click', () => {
//         li.remove();
//         })
//     } else {
//         const notText = document.createElement('div');
//         notText.textContent = "ТЕКСТА НЕТУ, ВВЕДИТЕ ЕГО!";
//         notText.style.fontSize = '30px';
//         notText.style.color = 'red';
//         listContainer.append(notText);
//         setTimeout(() => {
//             notText.remove();
//         }, 1000)
//     }


// })

// openDoneList.addEventListener('click', () => {
//     modal.classList.add('displaydone');
// });

// closeDoneList.addEventListener('click', () => {
//     modal.classList.remove('displaydone');
// });










