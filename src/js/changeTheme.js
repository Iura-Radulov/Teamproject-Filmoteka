const changeBtn = document.getElementById('change-theme-btn');



function setDarkTheme() {
    document.body.classList.add('dark')
    changeBtn.textContent = "🌞"
   
}

function setLightTheme() {
    document.body.classList.remove('dark')
    changeBtn.textContent = "🌙"    
    localStorage.theme = 'light'
}

changeBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
    setLightTheme()
    } else {
    setDarkTheme()
    }
})

if (localStorage.theme === 'dark') {
    setDarkTheme()
}