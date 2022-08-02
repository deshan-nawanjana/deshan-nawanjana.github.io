const cards = {}

cards.profile = data => {
    qs('.profile-image').style.backgroundImage = `url(${data.profile.avatar_url})`
    const repos = `${data.repos.length} Repos`
    const stars = `${total(data.repos.map(x => x.stargazers_count))} Stars`
    const folws = `${data.profile.followers} Followers`
    qs('.profile-count').innerHTML = `
        <span class="spr" click-open="{PROFILE}?tab=repositories">${repos}</span>
        <span class="spr" click-open="{PROFILE}?tab=repositories">${stars}</span>
        <span class="spr" click-open="{PROFILE}?tab=followers">${folws}</span>
    `
}

const color = x => x > 4 ? 4 : x

cards.calendar = data => {
    const obj = data.calendar
    qs('.calendar-top-title').innerHTML = `${obj.totalContributions} Contributions`
    for(let w = 0; w < obj.weeks.length; w++) {
        const dys = obj.weeks[w].contributionDays
        for(let d = 0; d < dys.length; d++) {
            const e = document.createElement('div')
            const c = dys[d].contributionCount
            e.className = 'calendar-day day-level-' + color(c)
            if(c > 0) {
                e.innerHTML = `<div class="day-tip">${c} Commits</div>`
            }
            qs('.calendar-bottom').appendChild(e)
        }
    }
    console.log(data.calendar)
}