// current angle
let ax = 0
// mouse down flag
let md = false
// auto rotate direction
let dr = 1
// gap for z direction
let gz = 450
// root element
const root = document.querySelector('#root')

// circle coords method
const circle = (radius, angle) => {
    // convert to radian
    const theta = (angle - 90) * Math.PI / 180
    // return x y coords in circle
    return {
        a : Math.cos(theta) * radius,
        b : Math.sin(theta) * radius * - 1
    }
}

// get children array of root
const children = Array.from(root.children)

// update method
const update = () => {
    // toggle z gap by window orientation
    gz = window.innerWidth < window.innerHeight && window.innerWidth < 1080 ? 3200 : 450
    // for each child
    for(let i = 0; i < children.length; i++) {
        // current child
        const child = children[i]
        // get angle for child
        const cax = ax + 45 * -i
        // get child coords in circle
        const cxz = circle(620, cax)
        // set active prop by position
        child.setAttribute('active', cxz.b - 450 > -185.038 ? 1 : 0)
        // update transform styles
        child.style.transform = `
            translateX(calc(calc(50vw - 50%) - ${cxz.a}px))
            translateY(calc(calc(50vh - 50%) - 0px))
            translateZ(calc(${cxz.b}px - ${gz}px))
            rotateY(${-cax}deg)
        `
    }
}

// rotate method
const rotate = () => {
    // auto rotate only not hold
    if(md === false) { ax += 0.1 * dr }
    // update children
    update()
    // request next frame
    requestAnimationFrame(rotate)
}

// mousedown listener
window.addEventListener('mousedown', () => {
    // update cursor
    root.style.cursor = 'grabbing'
    // update mousedown flag
    md = true
})

// mouseup listener
window.addEventListener('mouseup', () => {
    // update cursor
    root.style.cursor = 'grab'
    // update mousedown flag
    md = false
})

// mousemove listener
window.addEventListener('mousemove', event => {
    // only if mouse down
    if(md === true) {
        // update angle
        ax -= event.movementX * 0.1
        // clear overflow
        ax = ax % 360
        // update direction on drag right
        if(event.movementX > 0) { dr = -1 }
        // update direction on drag left
        if(event.movementX < 0) { dr = +1 }
    }
})

// profile link onlick
document.querySelector('.profile-link').addEventListener('click', () => {
    window.open('https://github.com/deshan-nawanjana')
})

const request = () => {
    loadAPIs().then(data => {
        children[0].children[0].style.backgroundImage = `url(${data.profile.avatar_url})`
        rotate()
    })
}

// request api data onload
window.addEventListener('load', request)