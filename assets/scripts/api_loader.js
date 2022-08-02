const requestAPI = (url, body = null) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'https://api.github.com/' + url
        const options = {}
        if(body !== null) { options.body = JSON.stringify(body) }
        fetch(endpoint, options).then(x => x.json()).then(resolve).catch(reject)
    })
}

const loadAPIs = async function() {
    const data = {}
    data.profile = await requestAPI('users/deshan-nawanjana')
    data.repos = await requestAPI('users/deshan-nawanjana/repos?per_page=100')
    return data
}