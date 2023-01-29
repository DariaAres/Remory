import {firebaseApp} from "./remory"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {authFormHandler} from "./remory"
import {createModels} from "./utilita";


export function getSingInUp() {// возвращает HTML шаблон для модального окна
    return `
    <div class="wrapper">
        <div class="title-text">
            <div class="title login">
                Remory
            </div>
            <div class="title signup">
                Remory
            </div>
        </div>
        <div class="form-container">
            <div class="slide-controls">
                <input type="radio" name="slide" id="login" checked>
                <input type="radio" name="slide" id="signup">
                <label for="login" id="act1" class="slide login">Регистрация</label>
                <label for="signup" id="act1" class="slide signup">Вход</label>
                <div class="slider-tab"></div>
            </div>
            <div class="form-inner">
                <form action="#" class="login" id = "auth-form">
                    <div class="field">
                        <input type="text"  id = "emails1" placeholder="Электронная почта" required>
                    </div>
                    <div class="field">
                        <input type="password" id = "passwords1" placeholder="Пароль" required>
                    </div>
                    <div class="field">
                        <input type="password"  id = "passwords2Test" placeholder="Повторите пароль" required>
                    </div>
                     
                    <div class="field btn">
                        <div class="btn-layer"></div>
                        <input type="submit" value="Зарегистрироваться" id = "but1">
                    </div>
                    <div class="signup-link">
                        Хотите стать VIP пользователем? <a href="">VIP ре- гистрация</a>
                    </div>
                    
                </form>
                <form action="#" class="signup" id = "auth">
                    <div class="field">
                        <input type="text" id = "emails2" placeholder="Электоронная почта" required>
                    </div>
                    <div class="field">
                        <input type="password"  id = "passwords2" placeholder="Пароль" required>
                    </div>
                    <div class="pass-link">
                        <a href="#">Забыли пароль?</a>
                    </div>            
                    <div class="field btn">
                        <div class="btn-layer" id = "but2"></div>
                        <input type="submit" value="Войти">
                    </div>
                </form>
            </div>
        </div>
    `
}

export class View{
    constructor() {
        this.init();
    }

    init() { //инициализируем конструктор вида
        this.authReg = getAuth(firebaseApp); //получаем доступ к авторизации
        this.btnReg = document.querySelector('#but1');//получаем доступ к кнопке входа
        this.loginText = document.querySelector(".title-text .title");//получаем доступ к тексту входа
        this.loginForm = document.querySelector("form.login");//получаем доступ к форме входа
        this.loginBtn = document.querySelector("label.login");//получаем доступ к кнопке входа
        this.signupBtn = document.querySelector("label.signup");//к кнопке регитрации
        this.signupLink = document.querySelector("form .signup-link a");// к ссылке регистрации
        this.Login = document.querySelector("form .btn");//к кнопке входа
        this.btnLog = document.querySelector("form .btn");//к кнопке входа
        this.apiKey = 'AIzaSyAeSK0xRIHr3ASwQZBsIAJJIAW3XCLNJBM'; //к ключу firebase
    }
    RegistrationBtn(handler) {//команда регистрации
        this.btnReg.addEventListener('click', handler);
    }
    LoginBtn(handler){ //команда входа
        this.btnLog.addEventListener('click', handler)
    }

}

export class Model{
    constructor(){
        this.initModel();
    }
    initModel() {
        const view = new View();//связываемся с видом
        console.log(firebaseApp, view.btnReg, view.authReg);

        view.RegistrationBtn((e) => {
            var email = document.querySelector('#emails1').value;//получаем доступ к электронной почте
            var password = document.querySelector('#passwords1').value;//получаем доступ к паролю
            var passwordTest = document.querySelector('#passwords2Test').value;//получаем доступ ко второму паролю
            if(passwordTest === password){//сравниваем пароли
                createUserWithEmailAndPassword(view.authReg, email, password)//вызываем метод firebase для регистрации пользователя
                    .then((userCredential) => {//пробуем регистрацию
                        const user = userCredential.user;
                        alert('Пользователь успешно добавлен! G-G');
                    })
                    .catch((error) => {//если произошла ошибка выводим ее
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        alert(errorMessage);
                    });
            }
            else alert("Пароли не совпадают! ");
        });

        view.signupBtn.onclick = (() => {//анимация при нажатии при нажатия на переключатель
            view.loginForm.style.marginLeft = "-50%";
            view.loginText.style.marginLeft = "-50%";
        });
        view.loginBtn.onclick = (() => {//анимация при нажатии на переключатель
            view.loginForm.style.marginLeft = "0%";
            view.loginText.style.marginLeft = "0%";
        });
        view.Login.onclick = (() => {
            createModels('j');//делаем это чтобы нас выбрасило на главный экран
        });
        view.signupLink.onclick = (() => {
            view.signupBtn.click(); // переадресовываем команду нажатия ссылки на нажатие кнопки
        });
        document
            .getElementById('auth-form')//получаем доступ к форму
            .addEventListener('submit', authFormHandler, {once: true})//по нажатию кнопки вызываем authFormHandler и во избежание спама ставим опцию once
    }
}

export class Presenter {
    authWithEmailAndPassword(email, password) {//авторизация с электронной почтой и паролем
        const view = new View(); //связываемся с видом
        // нативный метод в firebase fetch
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${view.apiKey}`, {
            method: 'POST',
            body: JSON.stringify({//передаем по сети электронную почту и пароль и boolean returnSecureToken
                email, password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())//распарсим
            .then(data => data.idToken)//возвращаем поле idToken из firebase
    }
}



export function d(){
    const view = new View();
    view.LoginBtn();
}



