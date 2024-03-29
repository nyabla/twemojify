/* 
twemoji.js and twemoji images are Copyright 2020 Twitter, Inc and other contributors
Code licensed under the MIT License: http://opensource.org/licenses/MIT
Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
*/
import twemoji from '@twemoji/api/dist/twemoji.esm'
import { siteDisabled } from './blacklist';
import Browser from 'webextension-polyfill';
window.twemoji = twemoji

twemoji.className = 'twemojified';

window.twemojifyExt = () => {}

// observe the body for changes and update accordingly
const config = {
    subtree: true,        // observe all descendants
    characterData: true,  // observe changes in text
    childList: true       // observe changes in children
};

function twemojify(mutationList, _observer) {
    mutationList.forEach((mutation) => {
        switch (mutation.type) {
            case 'characterData':
                twemoji.parse(mutation.target);
                break;
                
            case 'childList':
                window.twemojifyExt()
                mutation.addedNodes.forEach( (node) => {
                    twemoji.parse(node);
                });
                break;
        }
    });
}

const observer = new MutationObserver(twemojify);

siteDisabled(new URL(location.href)).then(disabled => {
    if (!disabled) {
        // parse body and replace with twemoji
        twemoji.parse(document.body);
        observer.observe(document.body, config);
    }
})

Browser.runtime.onMessage.addListener(message => {
    if (message.enabled == true) {
        twemoji.parse(document.body);
        observer.observe(document.body, config);
    } else {
        observer.disconnect()
    }
})
