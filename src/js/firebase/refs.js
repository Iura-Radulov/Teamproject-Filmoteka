const refs = {
  signUpButton: document.getElementById('signUpBtn'),
  signInButton: document.getElementById('signInBtn'),
  container: document.getElementById('container'),
  overlayBackdrop: document.querySelector('.overlay__backdrop'),
  registerFormSignUp: document.querySelector('.register-form__sign-up'),
  registerFormSignIn: document.querySelector('.register-form__sign-in'),
  signInContainer: document.querySelector('.sign-in-container'),
  signUpContainer: document.querySelector('.sign-up-container'),
  signInLogin: document.querySelector('.sign-in-login'),

  btnLogin: document.getElementById('btnLoginBtn'),
  btnSignup: document.getElementById('btnSignUpBtn'),
  btnLogout: document.getElementById('btnLogout'),
  signUpBtn: document.querySelector('.sign-up-btn'),
  signInBtn: document.querySelector('.sign-in-btn'),
  signUpButtonClose: document.querySelector('.signUp__btnClose'),
  signInButtonClose: document.querySelector('.signIn__btnClose'),
  overlayBtnClose: document.querySelector('.overlayBtnClose'),
  overlayBtn: document.querySelector('.overlayBtn'),

  formLogin: document.getElementById('formLogin'),
  loginContainer: document.querySelector('.login-container'),
  boxLoginLogout: document.querySelector('.boxLoginLogout'),
  overlayContainer: document.querySelector('.overlay-container'),

  txtEmailLogin: document.getElementById('txtEmailLogin'),
  txtPasswordLogin: document.getElementById('txtPasswordLogin'),

  txtEmailRegister: document.getElementById('txtEmailRegister'),
  txtPasswordRegister: document.getElementById('txtPasswordRegister'),

  loginUser: document.getElementById('loginUser'),

  divLoginError1: document.getElementById('divLoginError1'),
  lblLoginErrorMessage1: document.getElementById('lblLoginErrorMessage1'),
  divLoginError2: document.getElementById('divLoginError2'),
  lblLoginErrorMessage2: document.getElementById('lblLoginErrorMessage2'),
  btnMyLibrary: document.querySelector('#library'),

  showWatchedBtn: document.getElementById('watched'),
  showQueueBtn: document.getElementById('queue'),
  showLibraryBtn: document.getElementById('library'),
  showHomeBtn: document.getElementById('home'),
  search: document.querySelector('.search-form'),
  libraryButtons: document.querySelector('.buttons'),
  filmsContainer: document.querySelector('.films__container'),
  header: document.querySelector('.header'),
  emptyListMessage: document.querySelector('.films__empty-list-thumb'),
  paginationButtons: document.getElementById('pagination_list'),
  paginationContainer: document.querySelector('.pagination'),
};

export default refs;
