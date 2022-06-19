const changeBtn = document.getElementById('change-theme-btn');
const signBtn = document.getElementById('footer')


function setDarkTheme() {
    document.body.classList.add('dark')
    changeBtn.textContent = "🌞"
    signBtn.style.backgroundColor = "#818181"
}

function setLightTheme() {
    document.body.classList.remove('dark')
    changeBtn.textContent = "🌙"
    signBtn.style.backgroundColor = "#8e8c8c"
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