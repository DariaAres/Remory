import './styles.css'
import {EventCreating} from './EventCreating'
import {UserCreating, User} from './UserCreating'
import {createModels, isValid} from "./utilita";
import {Presenter, getSingInUp, Model} from "./singinup";
import 'firebaseui/dist/firebaseui.css'
import {initializeApp}from "firebase/app";

///////////////   добавление события    ///////////////
const form = document.getElementById( 'form') //получаем форму
const wrapperBTN = document.getElementById('wrapper-btn')//доступ к кнопе для открытия раздела авторизации
const input = form.querySelector('#question-input')//доступ к вводу
const submitBTN = form.querySelector('#buttonInput')//доступ к кнопке "Добавить"
const inputDay = form.querySelector('#eventDay')//доступ к добавлению даты
form.addEventListener('submit', submitFormHandler)//вызываем subitFormHandler когда мы нажимаем на enter или на кнопку
window.addEventListener('load', EventCreating.renderList)//добавляем события для которого при load обнавляем список событий

///////////////   авторизация    ///////////////
wrapperBTN.addEventListener('click',openWrapper)//вызаваем openWrapper по клику
addEventListener('input', () => {

    submitBTN.ariaDisabled= isValid(input.value)
})
form.addEventListener('submit', submitFormHandler)
wrapperBTN.addEventListener('click', openWrapper)
input.addEventListener('input', () => {
    submitBTN.disabled = !isValid(input.value)//если isValid - true, то мы расблакировываем кнопку если false, то мы блокируем кнопку
})
inputDay.addEventListener('date', () => {
    submitBTN.disabled = !isValid(inputDay.value)
})

//инициализируем массив firebase
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAeSK0xRIHr3ASwQZBsIAJJIAW3XCLNJBM",
    authDomain: "remory-web-app.firebaseapp.com",
    databaseURL: "https://remory-web-app-default-rtdb.firebaseio.com",
    projectId: "remory-web-app",
    storageBucket: "remory-web-app.appspot.com",
    messagingSenderId: "904497444889",
    appId: "1:904497444889:web:ff06444dce914a64701288",
    measurementId: "G-LWY35CZ8H1"
})

function submitFormHandler(event) {//обработчик формы создания события
    event.preventDefault()//поведение по умолчанию
    let n = input.value;

    if (isValid(input.value)) {
        let n = input.value;

        const event = {//если input валидный то задаем сам обьект вопроса
            text: "Запланированно на " + inputDay.value.trim() + "<br/>" + input.value.trim(),
            date: new Date().toJSON()
        }

        //асинхронный запрос на сервер для сохранения вопроса
        submitBTN.disabled = true
        EventCreating.create(event).then(() => {//передаем запрос в метод create
            input.value = ''
            input.className = ''
            submitBTN.disabled = false
        })
    }
}

function openWrapper(){ //создаем релизацию команды открытия формы
    createModels(getSingInUp())//создаем мадальное окно с html шаблоном
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})

    const model = new Model();
}

export function authFormHandler(events) {//обработчик формы авторизации
    events.preventDefault()//поведение по умолчанию
    const btn = events.target.querySelector('#but2')//получаем доступ к кнопке "Вход"
    const email = events.target.querySelector('#emails2').value //получаем доступ к эл. почте
    const password = events.target.querySelector('#passwords2').value //получаем доступ к паролю

    btn.disabled = true
    const pres = new Presenter();
    pres.authWithEmailAndPassword(email, password)//обьявляем авторизацию
        .then(EventCreating.fetch)//получаем fetch
        .then(UserCreating.fetch)//удалить
        .then(() => btn.disabled = false).then(() => btn.disabled = false)//разблакировываем кнопку
}