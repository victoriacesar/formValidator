const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

// Show input error message
function showError(input, message){
  const formControl = input.parentElement
  formControl.className = 'form-control error'

  const small = formControl.querySelector('small')
  small.innerText = message;
}

// Show input sucess
function showSucess(input){
  const formControl = input.parentElement
  formControl.className = 'form-control sucess'
}

// Check if email is valid
function checkEmail(input){
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())){
    showSucess(input)
  } else{
    showError(input, `Email is not valid!`)
  }
}

// Check required fields
function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if(input.value.trim() === ''){
      showError(input, `${getInputName(input)} is required`)
    } else{
      showSucess(input)
    }
  })
}

// Check input length
function checkLength(input, min, max){
  if(input.value.length < min){
    showError(input, `${getInputName(input)} must be at least ${min} characters`)
  } else if(input.value.length > max){
    showError(input, `${getInputName(input)} must be less than ${max} characters`)
  } else{
    showSucess(input)
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2){
  if(input1.value !== input2.value){
    showError(input2, `Passwords do not match`)
  }
}

// Get fieldname capitalize (ex: username -> Username)
function getInputName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listener more clean and neat
form.addEventListener('submit', function(e){
  e.preventDefault()
  
  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 20)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
})
