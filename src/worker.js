import Browser from 'webextension-polyfill'
import { disableSite, enableSite, siteDisabled } from './blacklist'

const icons = {
    enabled: new URL('../icons/icon.svg', import.meta.url),
    disabled: new URL('../icons/icon-bw.svg', import.meta.url)
}

async function disabledSiteAction(tab) {
    await Browser.browserAction.setIcon({
        path: icons.disabled.href,
        tabId: tab.id,
    })
    await Browser.browserAction.setBadgeText({
        text: "off",
        tabId: tab.id,
    })
    await Browser.browserAction.setTitle({
        title: "enable twemojify for this site",
        tabId: tab.id,
    })
}

async function enabledSiteAction(tab) {
    await Browser.browserAction.setIcon({
        path: icons.enabled.href,
        tabId: tab.id,
    })
    await Browser.browserAction.setBadgeText({
        text: "",
        tabId: tab.id,
    })
    await Browser.browserAction.setTitle({
        title: "disable twemojify for this site",
        tabId: tab.id,
    })
}

Browser.tabs.onUpdated.addListener(async (_, __, tab) => {
    const url = new URL(tab.url)

    if (await siteDisabled(url)) {
        await disabledSiteAction(tab)
    } else {
        await enabledSiteAction(tab)
    }
})

Browser.browserAction.onClicked.addListener(async (tab, info) => {
    const url = new URL(tab.url)

    if (await siteDisabled(url)) {
        await enableSite(url)
        await enabledSiteAction(tab)
        await Browser.tabs.sendMessage(tab.id, { enabled: true })//Browser.runtime.sendMessage({ enabled: true })
        
    } else {
        await disableSite(url)
        await disabledSiteAction(tab)
        await Browser.tabs.sendMessage(tab.id, { enabled: false })
    }
})
