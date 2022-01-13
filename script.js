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