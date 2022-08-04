// query selector method
let qs = x => document.querySelector(x)

// dev mode flag
const dev = location.toString().includes('localhost')
// current angle
let ax = 0
// mouse down flag
let md = false
// hover lock flag
let hv = false
// auto rotate flag
let rt = dev ? false : true
// auto rotate direction
let dr = 1
// gap for z direction
let gz = 450
// root element
const root = qs('#root')
// load element
const load = qs('.loading-screen')

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
    if(md === false && hv === false && rt) { ax += 0.06 * dr }
    // update children
    update()
    // request next frame
    requestAnimationFrame(rotate)
}

// rotate ignore elements
const ignore = ['loading-screen']

// mousedown listener
window.addEventListener('mousedown', event => {
    // return while loading screen showing
    if(ignore.some(x => event.target.classList.contains(x))) { return }
    // update cursor
    root.style.cursor = 'grabbing'
    // update mousedown flag
    md = true
})

// mouseup listener
window.addEventListener('mouseup', event => {
    // return while loading screen showing
    if(ignore.some(x => event.target.classList.contains(x))) { return }
    // update cursor
    root.style.cursor = 'grab'
    // update mousedown flag
    md = false
})

// mousemove listener
window.addEventListener('mousemove', event => {
    // return while loading screen showing
    if(ignore.some(x => event.target.classList.contains(x))) { return }
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
    // only if mouse not down
    if(md === false) {
        // check for hovering any active card
        if(event.composedPath().some(x => {
            return x.getAttribute && x.hasAttribute('active')
        })) {
            // disable auto rotate from hover flag
            hv = true
        } else {
            // enable auto rotate from hover flag
            hv = false
        }
    }
})

// method to calculate total of an array
const total = arr => arr.reduce((x, y) => x + y)

// method to start
const request = () => {
    // laod data from apis
    loadAPIs().then(data => {
        // call each generator
        Object.values(cards).forEach(x => x(data))
        // get delay time for timout
        const delay = dev ? 0 : 300
        // timeout
        setTimeout(() => {
            // decrease loading screen opacity
            load.style.opacity = 0
            // start rotate
            rotate()
            // timeout
            setTimeout(() => {
                // hide loading screen
                load.style.display = 'none'
            }, delay)
        }, delay)
    })
}

// click event on window
window.addEventListener('click', event => {
    // check for open window attribute
    if(event.target.hasAttribute('click-open')) {
        // get link to open
        let link = event.target.getAttribute('click-open')
        // replace from github profile url
        link = link.replace('{PROFILE}', 'https://github.com/deshan-nawanjana')
        // open in new window
        window.open(link)
    }
})

// request api data onload
window.addEventListener('load', request)