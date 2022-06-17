
/*let bodyEl = document.querySelector('header');
bodyEl.insertAdjacentHTML('afterbegin',
'<div class = "mask"><div class = "loader"><div class = "inner one"></div><div class = "inner two"></div><div class = "inner three"></div></div></div>'

);*/
export default function loadData () {

window.onload = function loading(){
const maskEl = document.querySelector(".mask");
const spinner = document.querySelectorAll(".inner");
    
    setInterval(() => {
    maskEl.classList.add('hide'); 
    spinner.forEach(spin => {
        spin.classList.add('hide');} 
        );  
;}, 1000)
}

}
