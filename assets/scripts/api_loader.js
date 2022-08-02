const requestAPI = (url, body = null) => {
    return new Promise((resolve, reject) => {
        const endpoint = 'https://api.github.com/' + url
        const options = {
            headers : {
                'Authorization' : 'Bearer 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'
            }
        }
        if(body !== null) {
            options.method = 'POST'
            options.body = JSON.stringify(body)
        } else {
            options.method = 'GET'
        }
        fetch(endpoint, options).then(x => x.json()).then(resolve).catch(reject)
    })
}

const loadAPIs = async function() {
    const data = {}
    data.profile = await requestAPI('users/deshan-nawanjana')
    data.repos = await requestAPI('users/deshan-nawanjana/repos?per_page=100')
    data.calendar = await requestAPI('graphql', {
        query : `query($userName:String!) { 
                user(login: $userName){ contributionsCollection {
                    contributionCalendar { totalContributions
                      weeks { contributionDays { contributionCount date } }
                    }
                  }
                }
              }`,
        variables : { userName : 'deshan-nawanjana' }
    })
    data.calendar = data.calendar.data.user.contributionsCollection.contributionCalendar
    return data
}