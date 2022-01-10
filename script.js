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