let isFlipped = false;

/*-- Download Card ------*/

function downloadCard() {
    let card = document.getElementById('districtCard');
    // let cardFront = document.getElementById('cardFront');
    // let cardBack = document.getElementById('cardBack');
    

    let scale = 2;

    // Temporarily disable transitions for accurate rendering
    card.style.transition = 'none';

    if (isFlipped) {
        document.getElementById('cardFront').style.visibility = 'hidden';
        document.getElementById('cardBack').style.visibility = 'visible';
    } else {
        document.getElementById('cardBack').style.visibility = 'hidden';
        document.getElementById('cardFront').style.visibility = 'visible';
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
            downloadURI(dataUrl, 'JJONG-BOND-AGENT.png');
            document.getElementById('cardFront').style.visibility = '';
            document.getElementById('cardBack').style.visibility = '';
            card.style.transition = '';
        });
    }, 100);
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



