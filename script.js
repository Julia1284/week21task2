// document.querySelector('.registration').addEventListener("click",formValidate);

// function formValidate(){
//     valid = true
//     let name = document.querySelector ('#formName').value;
//     if (name == ''){
//         document.querySelector ('.nameError').innerHTML = 'Заполните обязательное поле Имя'
//     }
//     else {document.querySelector ('.nameError').innerHTML = ''}

//     let mail = document.querySelector ('#mail').value;
//     if (mail=='' ){
//     document.querySelector ('.mailError').innerHTML = 'Заполните обязательное поле email'
//     }
//     else {document.querySelector ('.mailError').innerHTML = ''}
//     let phone = document.querySelector ('#phone').value;
//     if (phone=='' ){
//     document.querySelector ('.phoneError').innerHTML = 'Заполните обязательное поле Телефон'
//     }
//     else {document.querySelector ('.phoneError').innerHTML = ''
//     }

//     if (document.querySelector ('#formAgreement').checked === false){
//         document.querySelector ('.checkError').innerHTML = 'Нет согласия на обработку персональных данных'
//     }
//     else {
//         document.querySelector ('.checkError').innerHTML = ''
//     }

//     let checks = document.getElementsByName('animals');

//     if (checks[0].checked  || checks[1].checked  || checks[2].checked  || checks[3].checked  || checks[4].checked || checks[5].checked  || checks[6].checked || checks[7].checked  )
//     {
//     document.querySelector ('.animalsError').innerHTML = ''  
//     }
//     else {
//         document.querySelector ('.animalsError').innerHTML = 'Выберите хотя бы одно животное'  
//     }


// }


document.querySelector('.registration').addEventListener('click', checkAll)

let errors = [];

function checkValidity(input) {
    let validity = input.validity;
    if (validity.valueMissing) {
        errors.push('Поле ' + input.placeholder + ' не заполнено');
    }
    if (validity.patternMismatch) {
        errors.push(`Поле ${input.placeholder} заполнено неверно`);
    }
    if (validity.rangeOverflow) {
        let max = input.getAttribute('max');
        errors.push(`Максимальное значение поля ${input.placeholder} не может быть больше ${max}`)
    }
    if (validity.rangeUnderflow) {
        let min = input.getAttribute('min');
        errors.push(`Минимальное значение поля ${input.placeholder} не может быть меньше ${min}`)
    }


}

function checkAll() {
    errors = [];
    let inputs = document.querySelectorAll('input');
    for (let input of inputs) {
        checkValidity(input)
    }
    document.querySelector('.checkError').innerHTML = errors.join('. <br>')
}

document.querySelector('.registration').addEventListener('click', sendData);

function sendData(event) {
    event.preventDefault()
    // получим отмеченных животных
    function getCheckedAnimals() {
        var checkboxes = document.getElementsByName('animals');
        var checkboxesChecked = []; // массив выбранных животных
        for (i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value); // положим в массив выбранный

            }
        }
        return checkboxesChecked;
    }
    //получаем пользователя
    let user = {
        name: document.getElementById('formName').value,
        email: document.getElementById('mail').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        sex: document.getElementById('sex').value,
        qualities: document.querySelector('#info').value,
        favoriteanimals: getCheckedAnimals(),
    }
    console.log(user)
    //выполняем запрос
    fetch('http://httpbin.org/post', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
        })
        .catch(error => console.log(error));
}