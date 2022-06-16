
let bodyEl = document.querySelector('body');
bodyEl.insertAdjacentHTML('afterbegin',
'<div class = "mask"><div class = "loader"><div class = "inner one"></div><div class = "inner two"></div><div class = "inner three"></div></div></div>'

);
window.onload = function loading(){
const maskEl = document.querySelector(".mask");
    
    setInterval(() => {
    maskEl.classList.add('hide');   
    }, 3000)
}
/*const header = document.querySelector("header");
header.addEventListener("load",() => {
    const maskEl = document.querySelector(".mask");
        
        setTimeout(() => {
        maskEl.classList.add('hide');   
        }, 3000)
    })*/

