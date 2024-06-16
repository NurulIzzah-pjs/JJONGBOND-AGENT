let isFlipped = false;

/*-- Download Card ------*/

function downloadCard() {
    let card = document.getElementById('districtCard');
    let cardFront = document.getElementById('cardFront');
    let cardBack = document.getElementById('cardBack');

    let scale = 2;

    // Temporarily disable transitions for accurate rendering
    card.style.transition = 'none';

    if (isFlipped) {
        // Show the back side
        cardFront.style.visibility = 'hidden';
        cardBack.style.visibility = 'visible';
    } else {
        // Show the front side
        cardBack.style.visibility = 'hidden';
        cardFront.style.visibility = 'visible';
    }

    // Delay to ensure DOM updates are applied before rendering
    setTimeout(() => {
        domtoimage.toPng(card, {
            width: card.clientWidth * scale,
            height: card.clientHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left',
            },
        }).then((dataUrl) => {
            var img = new Image();
            img.src = dataUrl;
            downloadURI(dataUrl, 'JJONG-BOND-AGENT.png');

            // Revert visibility changes
            cardFront.style.visibility = '';
            cardBack.style.visibility = '';
            
            // Re-enable transitions after rendering
            card.style.transition = '';
        });
    }, 100); // Adjust delay as needed
}

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}


