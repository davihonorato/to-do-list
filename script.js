const inputField = document.querySelector(".input-field input");
const inputButton = document.querySelector(".input-field button");

showTasks();

// ao inserir dados na caixa de entrada (e não for apenas espaços), o botão será habilitar
inputField.onkeyup = () => {
    let userData = inputField.value;
    if (userData.trim() != 0) {
        inputButton.classList.add("active");
    }else {
        inputButton.classList.remove("active");
    }
}

// Função utilizada para adicionar dados na tag ul
inputButton.onclick = () => {
    let userData = inputField.value;
    let getLocalStorage = localStorage.getItem("Tasks");
    if (getLocalStorage == null) {
        listArray = [];
    } else{
        listArray = JSON.parse(getLocalStorage); // transformar o JSON em um objeto JS
    }

    listArray.push(userData);
    getLocalStorage = localStorage.setItem("Tasks", JSON.stringify(listArray));
    showTasks();
}

// Função utilizada para exibir os dados inseridos (e armazenados no navegador) do usuário
function showTasks() {
    let getLocalStorage = localStorage.getItem("Tasks");
    if (getLocalStorage == null) {
        listArray = [];
    }else {
        listArray = JSON.parse(getLocalStorage);
    }

    let NewLiTag = "";
    listArray.forEach( (element, index) => {
        NewLiTag += `<div class="input-taskbox">
        <input type="checkbox" id="t${index}" onclick="deleteTask(${index})">
        <label for="t${index}">${element}</label>
        </div>`;
    });
    document.querySelector(".tasks").innerHTML = NewLiTag;
    inputField.value = "";
}

// Função utilizada para deletar dados na tag ul
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Tasks");
    listArray = JSON.parse(getLocalStorage);

    listArray.splice(index, 1);
    getLocalStorage = localStorage.setItem("Tasks", JSON.stringify(listArray));
    showTasks();
}