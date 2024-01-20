/* 
twemoji.js and twemoji images are Copyright 2020 Twitter, Inc and other contributors
Code licensed under the MIT License: http://opensource.org/licenses/MIT
Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/
*/

twemoji.className = 'twemojified';

// parse body and replace with twemoji
twemoji.parse(document.body);

// observe the body for changes and update accordingly
const config = {
    subtree: true,        // observe all descendants
    characterData: true,  // observe changes in text
    childList: true       // observe changes in children
};

function twemojify(extension) {
    return (mutationList, _observer) => {
        mutationList.forEach( (mutation) => {
            switch (mutation.type) {
                case 'characterData':
                    twemoji.parse(mutation.target);
                    break;
                    
                case 'childList':
                    extension();
                    mutation.addedNodes.forEach( (node) => {
                        twemoji.parse(node);
                    });
                    break;
            }
        });
    }
}

const observer = new MutationObserver(twemojify(() => {}));
observer.observe(document.body, config);