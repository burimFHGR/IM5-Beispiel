// Preloader nur beim 1. auf Website, dann nicht mehr
function checkLink() {
    if (localStorage.getItem('linkClicked') === 'true') {
        window.location.href = '/../index.html';
    } else {
        localStorage.setItem('linkClicked', 'true');
        
        
    }
}


// Mauszeiger = Weisser Kreis
document.addEventListener('DOMContentLoaded', function () {
    const circle = document.getElementById('circle');

    document.addEventListener('mousemove', function (e) {
        const x = e.clientX - circle.clientWidth / 2;
        const y = e.clientY - circle.clientHeight / 2;

        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
    });
});

        // Set random position for the QR code in the lower half of the webpage
        var qrCodeContainer = document.getElementById('qr-code-container');
        var qrCode = document.getElementById('qr-code');

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;

        var randomTop = Math.floor(Math.random() * (windowHeight / 2)) + (windowHeight / 2);
        var randomLeft = Math.floor(Math.random() * (windowWidth - qrCode.clientWidth));

        // Ensure a 25% margin from the bottom
        var marginFromBottom = 0.2 * windowHeight;
        randomTop = Math.min(randomTop, windowHeight - marginFromBottom);

        qrCodeContainer.style.top = randomTop + 'px';
        qrCodeContainer.style.left = randomLeft + 'px';



    document.addEventListener('DOMContentLoaded', function () {
        const circle = document.getElementById('circle');
        const qrCodeContainer = document.getElementById('qr-code-container');

        // Function to handle the click event on the circle
        function handleCircleClick() {
            circle.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
        }

        // Function to handle the mouseup event on the document
        function handleMouseUp() {
            circle.style.backgroundColor = 'white';
        }

        // Attach the click event listener to the circle
        circle.addEventListener('mousedown', handleCircleClick);

        // Attach the mouseup event listener to the document
        document.addEventListener('mouseup', handleMouseUp);

        // Function to handle the click event on the QR code container
        function handleQRCodeContainerClick() {
            // Call the handleCircleClick function when the QR code container is clicked
            handleCircleClick();
        }

        // Attach the click event listener to the QR code container
        qrCodeContainer.addEventListener('click', handleQRCodeContainerClick);

        document.addEventListener('mousemove', function (e) {
            const x = e.clientX - circle.clientWidth / 2;
            const y = e.clientY - circle.clientHeight / 2;

            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
        });

        // Set random position for the QR code in the lower half of the webpage
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;

        var randomTop = Math.floor(Math.random() * (windowHeight / 2)) + (windowHeight / 2);
        var randomLeft = Math.floor(Math.random() * (windowWidth - qrCodeContainer.clientWidth));

        // Ensure a 25% margin from the bottom
        var marginFromBottom = 0.2 * windowHeight;
        randomTop = Math.min(randomTop, windowHeight - marginFromBottom);

        qrCodeContainer.style.top = randomTop + 'px';
        qrCodeContainer.style.left = randomLeft + 'px';
    });


     // Get the elements
     var qrCodeContainer = document.getElementById('qr-code-container');
     var textElement = document.getElementById('text');

     // Add event listener for hover
     qrCodeContainer.addEventListener('mouseover', function() {
         textElement.innerHTML = 'Du hast den QR-Code gefunden! 👏 Klicke ihn an, um direkt zur Homepage zu gelangen.';
     });

     // Add event listener for mouseout (optional, to revert the text)
     qrCodeContainer.addEventListener('mouseout', function() {
         textElement.innerHTML = 'Um auf diese Seite zuzugreifen, bitte den QR-Code suchen und scannen.';
     });


     document.addEventListener('DOMContentLoaded', function () {
        const circle = document.getElementById('circle');
        const qrCodeContainer = document.getElementById('qr-code-container');
        const qrCode = document.getElementById('qr-code');
    
        function handleQRCodeClick() {
            setTimeout(function () {
                checkLink();
                window.location.href = '/../index.html';
            }, 1000);
        }
    
        // Attach the click event listener to the QR code
        qrCode.addEventListener('click', handleQRCodeClick);
    });