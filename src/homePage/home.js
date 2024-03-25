const menuIcon = document.getElementById('menu')
const menuItems = document.getElementById('menu-items')
const logo = document.getElementById('logo')
const header = document.getElementsByClassName('header')
menuIcon.addEventListener(('click'), (e) => {
    e.preventDefault()
    menuItems.style.display = 'block'
    menuIcon.style.display = 'none'
    header.style.position = 'fixed'
})