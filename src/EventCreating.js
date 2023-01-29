export class EventCreating {
    static create(event) { // создаем событие
        // нативный метод в firebase fetch
        return fetch('https://remory-web-app-default-rtdb.firebaseio.com/events.json', {
            //настраиваем метод
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()) //полунный некоторый promise получаем в response
            .then(response => {
                event.id = response.name //передаем поле name response-а в id события
                return event
            })
            //добавляем в Local Storage
            .then(addToLocalStorage)
            .then(EventCreating.renderList)
    }
    // нативный метод в firebase fetch
    static fetch(token) {
        if (!token) {//если нет токена то возвращаем промиз
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        // нативный метод в firebase fetch
        return fetch(`https://remory-web-app-default-rtdb.firebaseio.com/events.json?auth=${token}`)
            .then(response => response.json())//парсим событие
            .then((response) => {

                if (response && response.error) {//при возникноверии ошибки выводим ее
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({//пробигаемся по респонсу и на каждой итерации плучаем key
                    ...response[key],//возвращаем все те поля что есть в key
                    id: key // возвращаем id
                })) : [] //если в респонзе null возвращаем пустой массив
            })
    }

    static renderList() {//получаем список всех событий
        const events = getQuestionsFromLocalStorage()
        const html = events.length //формируем базовый html который будет содержать в себе все события
            ? events.map(toCard).join('') //если событие есть то формируем список
            : `<div class="asdfg" >Созайте событие</div>`//если нет то выводим "Создайте событие"
        const list = document.getElementById('list') // получаем лист куда будем записывать события
        list.innerHTML = html  // записываем события
    }

}

function addToLocalStorage(event) {//добавление в Local Storage
    const all = getQuestionsFromLocalStorage()//молучаем массив обьектов что есть в Local Storage
    all.push(event)//добавляем само событие в массив
    localStorage.setItem('События', JSON.stringify(all))

}

function getQuestionsFromLocalStorage() {//молучаем массив обьектов что есть в Local Storage
    return JSON.parse(localStorage.getItem('События') || '[]') //если он пустой возвращаем в массив [], если нет то парсим данные в массив
}

function toCard(event) {//возвращаем шаблон события
    return `
    <div class="output-data-time">
      ${new Date(event.date).toLocaleDateString()}
      ${new Date(event.date).toLocaleTimeString()}
    </div>
    <div class = "output-text">${event.text}</div>
    <br>
  `
}
