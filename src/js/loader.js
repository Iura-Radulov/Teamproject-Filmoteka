
/*let bodyEl = document.querySelector('header');
bodyEl.insertAdjacentHTML('afterbegin',
'<div class = "mask"><div class = "loader"><div class = "inner one"></div><div class = "inner two"></div><div class = "inner three"></div></div></div>'

);*/
export default function loadData () {
const maskEl = document.querySelector(".mask");
const spinner = document.querySelectorAll(".inner");
maskEl.classList.remove('hide');
spinner.forEach(spin => {
    spin.classList.remove('hide');
});

window.onload = function loading(){

    
    setInterval(() => {
    maskEl.classList.add('hide'); 
    spinner.forEach(spin => {
        spin.classList.add('hide');} 
        );  
;}, 1000)
}

}
