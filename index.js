const load = () => {
    const img = document.querySelector('body > img')
    const cli = img.getBoundingClientRect()
    img.style.left = (window.innerWidth - cli.width) / 2 + 'px'
    img.style.top = (window.innerHeight - cli.height) / 2 + 'px'
    img.addEventListener('click', () => location = 'https://github.com/deshan-nawanjana/')
    setTimeout(() => img.style.opacity = 1, 100)
}

window.addEventListener('load', load)
window.addEventListener('resize', load)

window.addEventListener('contextmenu', event => {
    event.preventDefault()
    return false
})