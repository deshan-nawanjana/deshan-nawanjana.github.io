// card generator methods object
const cards = {}

// method to generate profile card
cards.profile = data => {
    // set profile image
    qs('.profile-image').style.backgroundImage = `url(${data.profile.avatar_url})`
    // get repositories count
    const repos = `${data.repos.length} Repos`
    // get stargazers count
    const stars = `${total(data.repos.map(x => x.stargazers_count))} Stars`
    // get followers count
    const folws = `${data.profile.followers} Followers`
    // set counts in card
    qs('.profile-count').innerHTML = `
        <span class="spr spr_repos" click-open="{PROFILE}?tab=repositories">${repos}</span>
        <span class="spr spr_stars" click-open="{PROFILE}?tab=repositories">${stars}</span>
        <span class="spr spr_folws" click-open="{PROFILE}?tab=followers">${folws}</span>
    `
}

// method to get commit color level
const color = x => x > 4 ? 4 : x

// method to generate calendar card
cards.calendar = data => {
    // get calendar data
    const obj = data.calendar
    // update title with contributions count
    qs('.calendar-top-title').innerHTML = `${obj.totalContributions} Contributions`
    // for each week
    for(let w = 0; w < obj.weeks.length; w++) {
        // get week days
        const dys = obj.weeks[w].contributionDays
        // for each day
        for(let d = 0; d < dys.length; d++) {
            // create calendar item element
            const e = document.createElement('div')
            // get commits level
            const c = dys[d].contributionCount
            // set class name and level color 
            e.className = 'calendar-day day-level-' + color(c)
            // if any commits
            if(c > 0) {
                // set commits count tooltip
                e.innerHTML = `<div class="day-tip">${c} Commits</div>`
            }
            // append to calendar
            qs('.calendar-bottom').appendChild(e)
        }
    }
}

// method to generate popular repositories card
cards.popular = data => {
    // get repo data
    const arr = data.repos
    // for each first six repos
    for(let i = 0; i < 6; i++) {
        // create item element
        const e = document.createElement('div')
        // set class name
        e.className = 'popular-item'
        // set child items
        e.innerHTML = `
            <div class="popular-open" click-open="${arr[i].html_url}"></div>
            <div class="popular-title">${arr[i].name}</div>
            <div class="popular-intro">${arr[i].description}</div>
        `
        // append to card
        qs('.popular-bottom').appendChild(e)
    }
}