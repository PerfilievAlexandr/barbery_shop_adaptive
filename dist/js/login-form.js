'use strict'

const loginForm = document.querySelector('.login-form')
const closeBtnLoginForm = loginForm.querySelector('.login-form__close-btn')
const openBtnLoginForm = document.querySelector('.main-nav__user-login')
const textInputsLoginForm = loginForm.querySelectorAll('.login-form__text-input')

function subForm (evt) {
    let error = false;

    for (let i = 0; i < textInputsLoginForm.length; i++) {
        if (!textInputsLoginForm[i].value) {
            error = true
            textInputsLoginForm[i].setCustomValidity ('введите хотя бы одно имя');
            textInputsLoginForm[i].classList.add('login-form__text-input--error');
        }
    }

    if (error) {
        evt.preventDefault()
    } else {
        for (let i = 0; i < textInputsLoginForm.length; i++) {
            textInputsLoginForm[i].classList.remove('login-form__text-input--error');
        };
        loginForm.classList.add('login-form--closed');
    };
}

closeBtnLoginForm.addEventListener('click', (evt) => {
    evt.preventDefault()
    loginForm.classList.add('login-form--closed')
})

openBtnLoginForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    loginForm.classList.remove('login-form--closed');
})


loginForm.addEventListener('submit', subForm)