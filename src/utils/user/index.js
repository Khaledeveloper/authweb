const Validator = require('validator');
const isEmpty = require('../is-empty');
const { setLang } = require('../../languages/setLang');
const { validateEmailInput, validatePasswordInput, validatePhoneInput, validateConfirmPassInput, validateNameInput } = require('./inputsValidation');
const bcrypt = require('bcryptjs')
const validateLoginInput = (data, messages) => {

  let errors = {};

  const validateEmail = validateEmailInput(data.email, messages)
  if (!validateEmail.valid) errors.email = validateEmail.error

  const validatePassword = validatePasswordInput(data.password, messages)
  if (!validatePassword.valid) errors.password = validatePassword.error

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



const validateRegisterInput = (data, messages) => {

  let errors = {};

  const validateName = validateNameInput(data.name, messages)
  if (!validateName.valid) errors.name = validateName.error

  const validateEmail = validateEmailInput(data.email, messages)
  if (!validateEmail.valid) errors.email = validateEmail.error

  const validatePassword = validatePasswordInput(data.password, messages)
  if (!validatePassword.valid) errors.password = validatePassword.error

  const validateConfirmPass = validateConfirmPassInput(data.password, data.repassword, messages)
  if (!validateConfirmPass.valid) errors.password = validateConfirmPass.error

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


const validateUpdateInput = (update, data, messages) => {

  let errors = {};

  if (update === 'name') {
    const validateName = validateNameInput(data.name, messages)
    if (!validateName.valid) errors.name = validateName.error

  } else if (update === 'phone') {
    const validatePhone = validatePhoneInput(data.phone, messages)
    if (!validatePhone.valid) errors.phone = validatePhone.error

  } else if (update === 'email') {
    const validateEmail = validateEmailInput(data.email, messages)
    if (!validateEmail.valid) errors.email = validateEmail.error

  } else if (update === 'password') {
    const validatePassword = validatePasswordInput(data.password, messages)
    if (!validatePassword.valid) errors.password = validatePassword.error
    const validateConfirmPass = validateConfirmPassInput(data.password, data.repassword, messages)
    if (!validateConfirmPass.valid) errors.repassword = validateConfirmPass.error

  } else {
    errors.error = messages.error
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



const isUniqueEmail = async (operation, User, email, messages, _id) => {

  let errors = {};

  if (operation === 'update') {
    console.log("update" + email);
    const user = await User.findOne({ _id })
    console.log("user" + user.local.email);
    let checkEmail = await User.findOne({
      $or: [
        { "google.email": email },
        { "facebook.email": email },
        { "local.email": email }
      ]
    });
    console.log("checkemail");
    if (!user.local.email) {
      errors.email = messages.socialAccount
    }
    //check if email is used by another user
    if (checkEmail && user.local.email !== email) {
      errors.email = messages.usedEmail
    }


  } else if (operation === 'new') {
    let user = await User.findOne({
      $or: [
        { "google.email": email },
        { "facebook.email": email },
        { "local.email": email }
      ]
    });
    if (user) { errors.email = messages.usedEmail }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


const updateUser = async (User, update, _id, data, messages) => {
  let errors = {};
  let user = {}

  try {

    if (update === 'name') {
      user = await User.findOneAndUpdate({ _id }, { name: data.name }, {
        new: true
      });
    } else if (update === 'phone') {
      user = await User.findOneAndUpdate({ _id }, { phone: data.phone }, {
        new: true
      });

    } else if (update === 'email') {

      const isUnique = await isUniqueEmail('update', User, data.email, messages, _id)
      if (!isUnique.isValid) { errors = isUnique.errors }
      user = await User.findOneAndUpdate({ _id }, { "local.email": data.email }, {
        new: true
      });

    } else if (update === 'password') {
      const currentUser = await User.findOne({ _id })
      if (!currentUser.local.email) {
        errors.email = messages.socialAccount
        return;
      }
      
      const isTruePassword = await bcrypt.compare(data.oldpassword, currentUser.local.password)
        if (!isTruePassword) {
          console.log("isTr"+isTruePassword+data.oldpassword +currentUser.local.password);
          errors.oldpassword = messages.passwordMatch
          return;
        }
      
      
       
user = await User.findOneAndUpdate({ _id }) 
user.local.password = await bcrypt.hash(data.password , 8)
user.save()
    } else {
  errors.error = messages.error
}
  } catch (error) {
  errors.update = messages.error

}

return {
  errors,
  isValid: isEmpty(errors),
  user
};

}


module.exports = { validateLoginInput, validateRegisterInput, validateUpdateInput, updateUser, isUniqueEmail }