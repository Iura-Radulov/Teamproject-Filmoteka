const refs = {
    signUpButton: document.getElementById('signUpBtn'),
   signInButton: document.getElementById('signInBtn'),
    container: document.getElementById('container'),
    registerFormSignUp: document.querySelector('.register-form__sign-up'),
    registerFormSignIn: document.querySelector('.register-form__sign-in'),
    signInContainer: document.querySelector('.sign-in-container'),
   signUpContainer: document.querySelector('.sign-up-container'),

   btnLogin: document.getElementById('btnLoginBtn'),
   btnSignup: document.getElementById('btnSignUpBtn'),
   btnLogout: document.getElementById('btnLogout'),

   formLogin: document.getElementById('formLogin'),

   txtEmailLogin: document.getElementById('txtEmailLogin'),
   txtPasswordLogin: document.getElementById('txtPasswordLogin'),

   txtNameRegister: document.getElementById('txtNameRegister'),
   txtEmailRegister: document.getElementById('txtEmailRegister'),
   txtPasswordRegister: document.getElementById('txtPasswordRegister'),

   loginUser: document.getElementById('loginUser'),

   divLoginError: document.getElementById('divLoginError'),
   lblLoginErrorMessage: document.getElementById('lblLoginErrorMessage'),
}
//        footer

export default refs;