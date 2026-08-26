// Your code goes here.
const form = function () {

    const name = document.getElementById('name');
    const email = document.getElementById('email')
    const submit = document.getElementById('submit-button');
    const message = document.getElementById('message')

    const addMessage = function () {
        console.log(name.value);
        message.innerText="Name:" + name.value + ", Email:" + email.value;
    }

    return {
        init: function () {
            submit.addEventListener('click', addMessage)
        }
    }
}