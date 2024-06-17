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
    setTimeout(() => {let isFlipped = false;

        // Function to ensure images are fully loaded
        function loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => reject();
                img.src = url;
            });
        }
        
        // Function to download card as image
        function downloadCard() {
            // Ensure both images are fully loaded
            Promise.all([
                loadImage('/MEDIA/front.png'),
                loadImage('/MEDIA/back.png')
            ]).then(() => {
                var card = document.getElementById('districtCard');
                var scale = 2; // Scaling factor to improve image quality
        
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
                    domtoimage.toBlob(card, {
                        width: card.offsetWidth * scale,
                        height: card.offsetHeight * scale,
                        style: {
                            transform: 'scale(' + scale + ')',
                            transformOrigin: 'top left',
                            width: card.offsetWidth + 'px',
                            height: card.offsetHeight + 'px'
                        }
                    }).then(function(blob) {
                        window.saveAs(blob, 'card.png');
        
                        // Revert visibility and transition
                        document.getElementById('cardFront').style.visibility = '';
                        document.getElementById('cardBack').style.visibility = '';
                        card.style.transition = '';
                    }).catch(function(error) {
                        console.error('Failed to download image:', error);
                    });
                }, 100);
            }).catch(error => {
                console.error('Failed to load images:', error);
            });
        }
        
        // JavaScript for toggle class on click
        document.addEventListener('DOMContentLoaded', function() {
            var flipCards = document.querySelectorAll('.flip-card');
            var fileInput = document.getElementById('file-input');
            var idPhoto = document.getElementById('id-photo');
            var idPhoto1 = document.getElementById('id-photo1');
            var editableInputs = document.querySelectorAll('.editable');
        
            flipCards.forEach(function(flipCard) {
                flipCard.addEventListener('click', function() {
                    flipCard.classList.toggle('flipped');
                    isFlipped = !isFlipped;
                });
            });
        
            idPhoto.addEventListener('click', function(event) {
                fileInput.click();
            });
        
            fileInput.addEventListener('change', function(event) {
                var file = event.target.files[0];
                var reader = new FileReader();
        
                reader.onload = function(e) {
                    idPhoto1.style.backgroundImage = 'url(' + e.target.result + ')';
                    idPhoto1.style.backgroundSize = 'cover';
                    idPhoto1.style.backgroundPosition = 'center';
                };
        
                if (file) {
                    reader.readAsDataURL(file);
                }
            });
        
            editableInputs.forEach(function(input) {
                input.addEventListener('click', function(event) {
                    event.stopPropagation();
                });
            });
        });
        
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






