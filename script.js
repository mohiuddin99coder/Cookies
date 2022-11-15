const Name = document.querySelector('#Name')
const dob = document.querySelector('#dob')
const phoneNum = document.querySelector('#phoneNum')
const email = document.querySelector('#email')
const movie = document.querySelector('#movies')
const aboutSelf = document.querySelector('#aboutself')
const profileModal = document.querySelector('#profile-modal')
const modalTable = document.querySelector('.modal-table');

let errMsg;
const mailFormat = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
const elements = [Name, dob, phoneNum, email, movie, aboutSelf]


const btnSubmit = document.querySelector('.btn-submit')
btnSubmit.addEventListener('click', () => {
    elements.forEach((element) => {
        document.cookie = `${encodeURIComponent(element.name)}=${encodeURIComponent(element.value)}; max-age=` + 60 * 60 * 24 * 10
    })
    Validation()
    blur()
    cookies()
})

function cookies() {
    elements.forEach((element) => {
        document.cookie = `${encodeURIComponent(element.name)}=${encodeURIComponent(element.value)}`
    })
}

let Cookies = document.cookie.split(';').map((cookie) => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

const btnEdit = document.querySelector('.btn-edit')
btnEdit.addEventListener('click', () => {
    if (document.cookie == "") {
        alert('No data available')
    } else  {   
        elements.forEach((element) => {
            let elName = element.name
            element.value = Cookies[elName]
        })
    }
})
const btnDeleteData = document.querySelector('.btn-del-data')
btnDeleteData.addEventListener('click', () => {
    elements.forEach((element) => {
        element.value = ""
        document.cookie = `${encodeURIComponent(element.name)}=${encodeURIComponent(element.value)}; max-age = -99`
    })
})

function errorMsg(element, errMsg) {
    countError++
    element.nextElementSibling.innerHTML = errMsg;
    element.classList.add('errorBox')

}
function removeMsg(element, elName) {
    document.querySelector(`#modal-${elName}`).innerHTML = element.value
    element.nextElementSibling.innerHTML = "";
    element.classList.remove('errorBox')


}
function blur() {
    for (let i = 0; i < elements.length; i++) {

        elements[i].addEventListener('blur', Validation)

    }
}
function Validation() {
    countError = 0;
    elements.forEach((element) => {
        let elName = element.name
        if (isNaN(phoneNum.value)) {
            errMsg = "❌not a valid number"
            errorMsg(phoneNum, errMsg)
        } else if (phoneNum.value.length < 10 || phoneNum.value.length > 10) {
            errMsg = "❌number length should 10"
            errorMsg(phoneNum, errMsg)
        }
        if (!email.value.match(mailFormat)) {
            errMsg = '❌enter valid email-id'
            errorMsg(email, errMsg)
        }

        errMsg = `❌ ${elName} is required`
        element.value == "" ? errorMsg(element, errMsg) : removeMsg(element, elName)

        if (countError != 0) {
            btnSubmit.classList.add('disabled')
        } else if (countError == 0) {
            btnSubmit.classList.remove('disabled')
            btnSubmit.setAttribute('data-bs-toggle', 'modal')
            btnSubmit.setAttribute('data-bs-target', '#profile-modal')
        }
    })
}