const requestAPI = (url, body = null) => {
    return new Promise((resolve, reject) => {
        const endpoint = url.indexOf(':') > -1 ? url : 'https://api.github.com/' + url
        const options = {}
        if(body !== null) {
            options.method = 'POST'
            options.body = JSON.stringify(body)
        } else {
            options.method = 'GET'
        }
        fetch(endpoint, options).then(x => x.json()).then(resolve).catch(reject)
    })
}

const loadProgress = x => {
    x = x / 100 * 400
    qs('.loading-bar').style.boxShadow = `inset ${x}px 0px 0px 0px #FFF8`
}

const loadAPIs = async function() {
    const data = {}
    loadProgress(0)
    data.profile = await requestAPI('users/deshan-nawanjana')
    loadProgress(20)
    data.repos = await requestAPI('users/deshan-nawanjana/repos?per_page=100')
    loadProgress(60)
    data.calendar = await requestAPI('https://apis.dnjs.info/github_contributions/')
    data.calendar = data.calendar.data.user.contributionsCollection.contributionCalendar
    loadProgress(100)
    return data
}