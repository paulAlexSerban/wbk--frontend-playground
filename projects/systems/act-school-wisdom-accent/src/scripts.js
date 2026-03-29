(() => {
    function getBody() {
        return document.body;
    }

    function setTheme(theme) {
        const body = getBody();
        if (!body) return;
        body.className = theme || 'wisdom-accent';
    }

    function setDarkLightTheme(theme) {
        const body = getBody();
        if (!body) return;
        body.dataset.theme = theme === 'dark' ? 'dark' : 'light';
    }

    window.setTheme = setTheme;
    window.setDarkLightTheme = setDarkLightTheme;

    function initializeTheme() {
        setTheme('wisdom-accent');
        setDarkLightTheme('light');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }
})()