const Validator = require('validator');
const isEmpty = require('../is-empty');
const { setLang } = require('../../languages/setLang');



const validateNameInput = (name, messages) => {
  name = !isEmpty(name) ? name : '';
  if (Validator.isEmpty(name)) {
    return { valid: false, error: messages.nameRequired }
  }

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    return { valid: false, error: messages.errLength30 }

  }
  return { valid: true, error: '' }

}


const validateEmailInput = (email, messages) => {
  email = !isEmpty(email) ? email : '';
  if (Validator.isEmpty(email)) {
    return { valid: false, error: messages.emailRequired }
  }
    if (!Validator.isEmail(email)) {
    	return { valid: false, error: messages.invalidEmail }
  }
 
  return { valid: true, error: '' }

}

const validatePasswordInput = (password , messages) => {
  password = !isEmpty(password) ? password : '';
  if (Validator.isEmpty(password)) {
    return { valid: false, error: messages.passwordRequired }
  }
    if (!Validator.isLength(password, { min: 8, max: 20 })) {
    return { valid: false, error: messages.passwordLength }
  }
 
  return { valid: true, error: '' }

}

const validateConfirmPassInput = (password, confirmPassword, messages) => {
  password = !isEmpty(password) ? password : '';
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';
  if (Validator.isEmpty(password)) {
    return { valid: false, error: messages.passwordRequired }
  }
   if (!Validator.isLength(password, { min: 8, max: 20 })) {
    return { valid: false, error: messages.passwordLength }
  }
  if (Validator.isEmpty(confirmPassword)) {
    return { valid: false, error: messages.confirmPasswordRequired }
  }
  if (!Validator.equals(password, confirmPassword)) {
  	return { valid: false, error: messages.passwordMatch }
  }

 
  return { valid: true, error: '' }

}



const validatePhoneInput = (phone , messages) => {
  phone = !isEmpty(phone) ? phone : '';
  
  if (Validator.isEmpty(phone)) {
    return { valid: false, error: messages.phoneRequired }
  }

  if (!Validator.isMobilePhone(phone)) {
    return { valid: false, error: messages.invalidPhone }
  }
 
  return { valid: true, error: '' }

}





module.exports = { validateNameInput, validateEmailInput, validatePasswordInput, validatePhoneInput, validateConfirmPassInput}



