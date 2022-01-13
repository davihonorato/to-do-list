const inputField = document.querySelector(".input-field input");
const inputButton = document.querySelector(".input-field button");

inputField.onkeyup = () => {
    let userData = inputField.value;
    if (userData.trim() != 0) {
        inputButton.classList.add("active");
    }else {
        inputButton.classList.remove("active");
    }
}

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
}

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
        <input type="checkbox" id="t${index + 1}">
        <label for="t${index + 1}">${element}</label>
        </div>`;
    });
    document.getElementById("tasks").innerHTML = NewLiTag;
}