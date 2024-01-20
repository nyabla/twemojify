function replaceYoutubeEmoji() {
    let emoji = document.querySelectorAll('img.emoji.yt-formatted-string:not([data-emoji-id]):not(.twemojified)');
    for (let e of emoji) {
        e.classList.add('twemojified');
        e.src = convertYoutubeURL(e.src);
    }
}

function convertYoutubeURL(ytURL) {
    let codepointsRegex = /\/emoji_u(.+)\.png/i;
    let rawCodepoints = ytURL.match(codepointsRegex);
    let codepoints = rawCodepoints[1].replace(/_/g, '-');
    return `${twemoji.base}${twemoji.size}/${codepoints}${twemoji.ext}`;
}

// disable observer
observer.disconnect();

// new observer
const ytObserver = new MutationObserver(twemojify(replaceYoutubeEmoji));
ytObserver.observe(document.body, config);

    