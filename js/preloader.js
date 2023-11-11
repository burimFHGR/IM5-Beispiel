
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

