if (!localStorage.getItem('linkClicked') || localStorage.getItem('linkClicked') === 'false') {
    // Weiterleitung zum preloader.html-Fenster
    window.location.href = 'pages/preloader.html';
}