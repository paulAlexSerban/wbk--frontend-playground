const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'Mozilla/5.0 (iPad; CPU OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.121 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/295.0.590048842 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.169 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.169 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.169 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/293.0.586189917 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/297.0.594082364 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; SM-G965F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0,gzip(gfe)',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0,gzip(gfe)',
    'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.50 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/293.0.586189917 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/295.0.590048842 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.92 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.101 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.169 Mobile/15E148 Safari/604.1',
];

const UNKNOWN_VALUE = 'n/a';

const getOperatingSystem = (ua) => {
    const windowsMatch = ua.match(/Windows NT ([.\d]+)/);
    const androidMatch = ua.match(/Android ([.\d]+)/);
    const macMatch = ua.match(/Mac OS X ([._\d]+)/);
    const iosMatch = ua.match(/iPhone OS ([._\d]+)/) || ua.match(/iPad OS ([._\d]+)/) || ua.match(/CPU OS ([._\d]+)/);
    const linuxMatch = ua.match(/Linux/);

    if (windowsMatch) {
        return `Windows ${windowsMatch[1]}`;
    }
    if (androidMatch) {
        return `Android ${androidMatch[1]}`;
    }
    if (macMatch) {
        return `macOS ${macMatch[1].replace(/_/g, '.')}`;
    }
    if (iosMatch) {
        return `iOS ${iosMatch[1].replace(/_/g, '.')}`;
    }
    if (linuxMatch) {
        return 'Linux';
    }

    return 'an unknown operating system';
};

const getRenderingEngine = (ua) => {
    if (/Gecko\//.test(ua) && /Firefox\//.test(ua)) {
        return 'Gecko';
    }
    if (/AppleWebKit\//.test(ua) && /(Chrome\/|CriOS\/|Edg\/|OPR\/)/.test(ua)) {
        return 'Blink';
    }
    if (/AppleWebKit\//.test(ua)) {
        return 'WebKit';
    }

    return 'Unknown engine';
};

const getDeviceType = (ua) => {
    if (/iPad|Tablet/.test(ua)) {
        return 'Tablet';
    }
    if (/Mobi|iPhone|Android/.test(ua)) {
        return 'Mobile';
    }

    return 'Desktop';
};

const detectBrowser = (ua) => {
    const edgeMatch = ua.match(/Edg\/([.\d]+)/);
    const criosMatch = ua.match(/CriOS\/([.\d]+)/);
    const firefoxMatch = ua.match(/Firefox\/([.\d]+)/);
    const fxiosMatch = ua.match(/FxiOS\/([.\d]+)/);
    const chromeMatch = ua.match(/Chrome\/([.\d]+)/);
    const safariMatch = ua.match(/Version\/([.\d]+).*Safari\//);
    const gsaMatch = ua.match(/GSA\/([.\d]+)/);

    if (edgeMatch) {
        return { browserName: 'Edge', browserVersion: edgeMatch[1] };
    }
    if (criosMatch) {
        return { browserName: 'Chrome (iOS)', browserVersion: criosMatch[1] };
    }
    if (fxiosMatch) {
        return { browserName: 'Firefox (iOS)', browserVersion: fxiosMatch[1] };
    }
    if (firefoxMatch) {
        return { browserName: 'Firefox', browserVersion: firefoxMatch[1] };
    }
    if (chromeMatch) {
        return { browserName: 'Chrome', browserVersion: chromeMatch[1] };
    }
    if (safariMatch) {
        return { browserName: 'Safari', browserVersion: safariMatch[1] };
    }
    if (gsaMatch) {
        return { browserName: 'Google Search App', browserVersion: gsaMatch[1] };
    }

    return { browserName: 'Unknown browser', browserVersion: UNKNOWN_VALUE };
};

const resolveBrowserInfo = (ua) => {
    const osString = getOperatingSystem(ua);
    const { browserName, browserVersion } = detectBrowser(ua);

    if (!browserName) {
        return '';
    }

    return `${browserName} version ${browserVersion} on ${osString}`;
};

const resolveCurrentBrowserDetails = () => {
    const ua = navigator.userAgent;
    const { browserName, browserVersion } = detectBrowser(ua);
    const os = getOperatingSystem(ua);
    const engine = getRenderingEngine(ua);
    const deviceType = getDeviceType(ua);
    const platform = navigator.userAgentData?.platform || navigator.platform || UNKNOWN_VALUE;
    const language = navigator.language || UNKNOWN_VALUE;

    return [
        ['Browser', browserName],
        ['Version', browserVersion],
        ['Operating system', os],
        ['Rendering engine', engine],
        ['Device type', deviceType],
        ['Platform', platform],
        ['Language', language],
        ['User agent', ua],
    ];
};

const renderCurrentBrowserDetails = (root) => {
    const detailsTableBody = root.querySelector('.js-current-browser-details');

    if (!detailsTableBody) {
        return;
    }

    detailsTableBody.innerHTML = '';

    resolveCurrentBrowserDetails().forEach(([key, value]) => {
        const row = document.createElement('tr');
        const keyCell = document.createElement('th');
        const valueCell = document.createElement('td');

        keyCell.textContent = key;
        valueCell.textContent = value;

        row.appendChild(keyCell);
        row.appendChild(valueCell);
        detailsTableBody.appendChild(row);
    });
};

export const initPattern = () => {
    const browserMap = userAgents.map(resolveBrowserInfo).filter(Boolean);

    document.querySelectorAll('[data-js-cmp="browser-detect--browser-map"]').forEach((root) => {
        const browserTable = root.querySelector('.js-browser-map-table');

       

        if (!browserTable) {
            return;
        }

        browserTable.innerHTML = '';

        browserMap.forEach((browserInfo) => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = browserInfo;
            row.appendChild(cell);
            browserTable.appendChild(row);
        });
    });

    document.querySelectorAll('[data-js-cmp="browser-detect--current-browser"]').forEach((root) => {
        renderCurrentBrowserDetails(root);
    });
};
