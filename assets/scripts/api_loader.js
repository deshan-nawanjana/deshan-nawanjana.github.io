const requestAPI = (url, prg) => {
    return new Promise((resolve, reject) => {
        const endpoint = url.indexOf(':') > -1 || url[0] === '.'
            ? url : 'https://api.github.com/' + url
        const options = { method : 'GET' }
        fetch(endpoint, options).then(x => x.json()).then(data => {
            prg = prg / 100 * 400
            qs('.loading-bar').style.boxShadow = `inset ${prg}px 0px 0px 0px #FFF8`
            resolve(data)
        }).catch(reject)
    })
}

const loadAPIs = async function() {
    // data object
    const data = {}
    // request from each endpoints
    data.profile = await requestAPI('users/deshan-nawanjana', 20)
    data.repos = await requestAPI('users/deshan-nawanjana/repos?per_page=100', 60)
    data.calendar = await requestAPI('https://apis.dnjs.info/github_contributions/', 100)
    // get calendar nested data
    data.calendar = data.calendar.data.user.contributionsCollection.contributionCalendar
    // sort repo array by starts
    data.repos = data.repos.sort((a, b) => a.stargazers_count > b.stargazers_count ? -1 : 1)
    // return data
    return data
}