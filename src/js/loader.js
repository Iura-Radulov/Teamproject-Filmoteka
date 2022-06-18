
/*let bodyEl = document.querySelector('header');
bodyEl.insertAdjacentHTML('afterbegin',
'<div class = "mask"><div class = "loader"><div class = "inner one"></div><div class = "inner two"></div><div class = "inner three"></div></div></div>'

);*/

const maskEl = document.querySelector(".mask");
const spinner = document.querySelectorAll(".inner");
const loader = document.querySelector('.loader');

export function loadData () {

window.onload = function loading(){

    
    setInterval(() => {
    maskEl.classList.add('hide'); 
    spinner.forEach(spin => {
        spin.classList.add('hide');} 
        );  
;}, 1000)
}

}

export function openLoading() {
    maskEl.classList.remove('hide');
    loader.classList.remove('hide');
    loadData();
}



openLoading()