function replaceFacebookEmoji() {
    let emoji = document.querySelectorAll('img[src*="emoji"]:not([class])');
    for (let e of emoji) {
        e.classList.add('twemojified', 'facebook-emoji');
        e.setAttribute('old-src', e.src);
        e.onerror = () => {e.src = e.getAttribute('old-src')};
        e.src = convertFacebookURL(e.src);
    }
}

function convertFacebookURL(fbURL) {
    let codepointsRegex = /(?:.+\/)+((?:.+_)?.+).png/i;
    let rawCodepoints = fbURL.match(codepointsRegex);
    let codepoints = rawCodepoints[1].replace(/_/g, '-');
    if (codepoints == 'LIKE')
        return fbURL;
    
    return `${twemoji.base}${twemoji.size}/${codepoints}${twemoji.ext}`;
}

window.twemojifyExt = replaceFacebookEmoji
    