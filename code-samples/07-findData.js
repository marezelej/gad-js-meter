function getUserAddress1() {
    let params = {
        data: 'data',
        id: 1
    }
    const locations = services.getUserLocation(params);
    if (locations.length > 0) {
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].lat < 320000 && locations[i].long < 57000) {
                return location[i]
            }
        }
    }   
}

function getUserAddress2() {
    const locations = services.getUserLocation({data: 'data', id: 1 }).length
    return locations.length > 0 ? locations.find(e => e.lat < 320000 && e.long< 57000) : null
}