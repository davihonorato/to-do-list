const inputField = document.querySelector(".input-field input");
const inputButton = document.querySelector(".input-field button");
const clearAllButton = document.querySelector(".footer button");
const filters = document.querySelectorAll(".filters span");

let editId;


filters.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector("span.selected").classList.remove("selected");
        option.classList.add("selected");
        showTasks(option.id);
    });
});

showTasks("all");

// ao inserir dados na caixa de entrada (e não for apenas espaços), o botão será habilitar
inputField.onkeyup = (e) => {
    let userData = inputField.value.trim();
    if (userData != 0) {
        inputButton.classList.add("active");
    }else {
        inputButton.classList.remove("active");
    }

    // caso o usuário envie o texto com a tecla "enter"
    if (e.key == "Enter" && userData != 0) {
        let getLocalStorage = localStorage.getItem("Tasks");
        let editing = inputField.classList.contains("editing");

        if (!editing) {
            if (getLocalStorage == null) {
                listArray = [];
            } else{
                listArray = JSON.parse(getLocalStorage); // transformar o JSON em um objeto JS
            }
    
            let taskInfo = {"nameTask": userData, "status": "pending"};
            listArray.push(taskInfo);
        } else {
            listArray[editId].nameTask = inputField.value;
            inputField.classList.remove("editing");
        }

        localStorage.setItem("Tasks", JSON.stringify(listArray)); //modifica os valores do armazenamento local
        inputButton.classList.remove("active"); // desabilitar o botão novamente após inserir uma nova task
        showTasks("all");
    }
}

// Função utilizada para adicionar dados na tag ul
inputButton.onclick = () => {
    let userData = inputField.value;
    let getLocalStorage = localStorage.getItem("Tasks");
    let editing = inputField.classList.contains("editing");

    if (!editing) {
        if (getLocalStorage == null) {
            listArray = [];
        } else{
            listArray = JSON.parse(getLocalStorage); // transformar o JSON em um objeto JS
        }
    
        let taskInfo = {"nameTask": userData, "status": "pending"};
        listArray.push(taskInfo);
    } else {
        listArray[editId].nameTask = inputField.value;
        inputField.classList.remove("editing");
    }

    localStorage.setItem("Tasks", JSON.stringify(listArray));
    inputButton.classList.remove("active"); // desabilitar o botão novamente após inserir uma nova task
    showTasks("all");
}

// Função utilizada para exibir os dados inseridos (e armazenados no navegador) do usuário
function showTasks(filter) {
    let getLocalStorage = localStorage.getItem("Tasks");
    if (getLocalStorage == null) {
        listArray = [];
    }else {
        listArray = JSON.parse(getLocalStorage);
    }

    let NewTask = "";
    listArray.forEach( (element, index) => {
        let isCompleted = element.status == "completed" ? "checked" : "";
        
        if (filter == "all" || filter == element.status){
            NewTask += `<div class="input-taskbox">
            <div class="task ${element.status}">
                <input type="checkbox" id="t${index}" onclick="completeTask(${index}, ${filter})" ${isCompleted}>
                <label for="t${index}">${element.nameTask}</label>
            </div>
            <div class="settings">
                <i class="fas fa-ellipsis-h"></i>
                <ul class="config-menu">
                    <li onclick="editTask(${index})"><i class="fas fa-pen"></i>Editar</li>
                    <li onclick="deleteTask(${index}, ${filter})"><i class="fas fa-solid fa-eraser"></i>Deletar</li>
                </ul>
            </div>
            </div>`;
        }
    });
    
    // exibindo texto de atividades
    document.querySelector(".info-text").textContent = bottomMessage(filter, listArray);
    if (listArray.length > 0) {
        clearAllButton.classList.add("active");
    }else {
        clearAllButton.classList.remove("active");
    }

    // exibindo atividades e limpando o campo de entrada
    document.querySelector(".tasks").innerHTML = NewTask;
    inputField.value = "";
}

function bottomMessage(filter, listArray) {
    let message;

    if (filter != "all") {
        let filterElements = listArray.filter(element => element.status == filter);
        let filterStatus = filter == "pending" ? "pendente(s)" : "finalizada(s)";

        message = `Você tem ${filterElements.length} atividade(s) ${filterStatus}`;
    } else {
        message = `Você tem ${listArray.length} atividade(s)`;
    }

    return message;
}

// Função utilizada para alterar o status de uma task para "completo"
function completeTask(taskIndex, filter){
    let getLocalStorage = localStorage.getItem("Tasks");
    listArray = JSON.parse(getLocalStorage);

    let task = document.querySelector(`#t${taskIndex}`);

    if (task.checked) {
        task.parentElement.classList.replace("pending", "completed");

        listArray[taskIndex].status = "completed";
    } else {
        task.parentElement.classList.replace("completed", "pending");

        listArray[taskIndex].status = "pending";
    }

    localStorage.setItem("Tasks", JSON.stringify(listArray));
}

// Função utilizada para editar os dados da lista
function editTask(taskIndex) {
    let getLocalStorage = localStorage.getItem("Tasks");
    listArray = JSON.parse(getLocalStorage);

    inputField.value = listArray[taskIndex].nameTask;
    inputField.focus();
    inputField.classList.add("editing");
    inputButton.classList.add("active");

    editId = taskIndex;
}

// Função utilizada para deletar dados da lista
function deleteTask(taskIndex, filter) {
    let getLocalStorage = localStorage.getItem("Tasks");
    listArray = JSON.parse(getLocalStorage);

    listArray.splice(taskIndex, 1);
    localStorage.setItem("Tasks", JSON.stringify(listArray));
    showTasks(filter);
}

// Função utilizada para deletar todos os dados da lista
clearAllButton.onclick = () =>{
    listArray = [];

    localStorage.setItem("Tasks", JSON.stringify(listArray));
    showTasks("all");
}