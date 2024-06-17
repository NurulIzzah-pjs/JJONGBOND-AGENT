let isFlipped = false;

/*-- Download Card ------*/

function downloadCard() {
    var card = document.getElementById('districtCard');
    var scale = 2; // Scaling factor for higher resolution

    // Temporarily disable transitions for accurate rendering
    card.style.transition = 'none';

    // Ensure both sides are visible
    var cardFront = document.getElementById('cardFront');
    var cardBack = document.getElementById('cardBack');
    cardFront.style.visibility = 'visible';
    cardBack.style.visibility = 'visible';

    // Delay to ensure DOM updates are applied before rendering
    setTimeout(() => {
        // Convert card to base64 data URL
        domtoimage.toPng(card, {
            width: card.offsetWidth * scale,
            height: card.offsetHeight * scale,
            style: {
                transform: 'scale(' + scale + ')',
                transformOrigin: 'top left',
                width: card.offsetWidth + 'px',
                height: card.offsetHeight + 'px'
            }
        }).then((dataUrl) => {
            // Create a temporary link element
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'JJONGBOND-AGENT.png';

            // Simulate a click on the link to trigger download
            link.click();

            // Clean up
            setTimeout(() => {
                URL.revokeObjectURL(dataUrl);
                document.body.removeChild(link);
            }, 100);
        }).catch(function(error) {
            console.error('Failed to download image:', error);
        }).finally(() => {
            // Re-enable transitions and reset visibility
            card.style.transition = '';
            cardFront.style.visibility = '';
            cardBack.style.visibility = '';
        });
    }, 100);
}






