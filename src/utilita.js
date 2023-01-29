
export function createModels(content) {//активируем форму
    const modal = document.getElementById('modal')
    //формируем html для модального окна
    modal.innerHTML = `<div class="modal-content">${content}</div>`
}

export function isValid(value) { //возвращает boolen значение при условии: длина >=10
    return value.length >= 10
}