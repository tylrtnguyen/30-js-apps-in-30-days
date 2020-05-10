const validateName = () => {
    const name = document.getElementById('name')
    const re = /^[A-Za-z]{2,10}$/;
    if(!re.test(name.value)){
        name.classList.remove('is-valid')
        name.classList.add('is-invalid')
    } else {
        name.classList.remove('is-invalid')
        name.classList.add('is-valid')
    }
}

const validateEmail = () => {
    const email = document.getElementById('email')
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!re.test(email.value)){
        email.classList.remove('is-valid')
        email.classList.add('is-invalid')
    } else {
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
    }
}

// Canada Postal Code
const validateZipcode = () => {
    const zipcode = document.getElementById('zipcode')
    const re = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
    if(!re.test(zipcode.value)){
        zipcode.classList.remove('is-valid')
        zipcode.classList.add('is-invalid')
    } else {
        zipcode.classList.remove('is-invalid')
        zipcode.classList.add('is-valid')
    }
}

const validatePhone = () => {
    const phone = document.getElementById('phone')
    const re = /^\(?d{3}\)?[-. ]?\d{3}[-. ]\d{4}$/
    if(!re.test(phone.value)){
        email.classList.remove('is-valid')
        phone.classList.add('is-invalid')
    } else {
        phone.classList.remove('is-invalid')
        phone.classList.add('is-valid')
    }
}

// Form Blur Event Listeners
document.getElementById('name').addEventListener('blur', validateName)
document.getElementById('email').addEventListener('blur', validateEmail)
document.getElementById('zipcode').addEventListener('blur', validateZipcode)
document.getElementById('phone').addEventListener('blur', validatePhone)