import Browser from "webextension-polyfill";

const key = 'disabledSites'

export async function disableSite(url) {
    let storage = await Browser.storage.sync.get(key)
    let disabledSites = new Set(storage[key] || [])

    disabledSites.add(url.host)
    
    storage[key] = Array.from(disabledSites)
    await Browser.storage.sync.set(storage)
}

export async function siteDisabled(url) {
    let storage = await Browser.storage.sync.get(key)
    let disabledSites = new Set(storage[key] || [])

    return disabledSites.has(url.host)
}

export async function enableSite(url) {
    let storage = await Browser.storage.sync.get(key)
    let disabledSites = new Set(storage[key] || [])
    disabledSites.delete(url.host)
    storage[key] = Array.from(disabledSites)
    await Browser.storage.sync.set(storage)
}
