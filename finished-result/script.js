// API
const API_ENDPOINT = 'https://yesno.wtf/api';

// SELECTORS
const answerSelector = document.getElementById('answer');
const inputSelector = document.getElementById('input');
const buttonSelector = document.getElementById('button');
const ballSelector = document.getElementById('ball');
const errorSelector = document.getElementById('error');
const barSelector = document.querySelector('.input__bar');

// FLAGS
let isFetching = false;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

const setIsFetching = (value) => isFetching = value;

const setButtonState = (state) => {
    (state)
    ? buttonSelector.setAttribute('disabled', 'disabled')
    : buttonSelector.removeAttribute('disabled');
}

const cleanUp = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
    }, 2000);
}

const setData = (answer) => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p>${answer}</p>`;
        ballSelector.classList.remove('shake__ball');
        setIsFetching(false);
        setButtonState(false);
        cleanUp(); 
    }, 1000);
}

const fetchAnswer = () => {

    setButtonState(true);
    setIsFetching(true);
    ballSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then((body) => body.json())
        .then((data) => setData(data.answer));
}

const handleKeyEnter = (event) => {
    if (event.keyCode === 13) {
        sendAnswer();
    }
}

const sendAnswer = () => {
    if (isFetching) return;
    if (!inputSelector.value) return handleError();

    fetchAnswer();
}

const handleError = () => {
    barSelector.classList.add('shake__ball');
    errorSelector.innerHTML = 'You need to type your question';
    setTimeout(() => {
        errorSelector.innerHTML = '';
        barSelector.classList.remove('shake__ball');
    }, 4000);
}

buttonSelector.addEventListener('click', sendAnswer);