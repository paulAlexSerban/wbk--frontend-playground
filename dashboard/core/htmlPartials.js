const fs = require('fs');

const date = new Date();

const headHTML = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Front-end Playground Workbook</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            summary {
                display: flex;
            }
        </style>
    </head>
`;

const topNavbarHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a class="navbar-brand" href="#"><h1>Front-end Playground Workbook</h1></a>
    <div class="ms-auto">
        <input id="searchInput" class="form-control" type="search" placeholder="Search components..." aria-label="Search">
    </div>
</nav>`;

const headerHTML = `
        <header class="row">
            
        </header>
`;

const embededScripts = () => {
    const scripts = fs.readFileSync('../dashboard/scripts/index.js', 'utf-8');
    return `<script>${scripts}</script>`;
};

const footerHTML = `
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="https://www.linkedin.com/in/paulalexs/" class="nav-link px-2 text-body-secondary">LinkedIn</a></li>
                <li class="nav-item"><a href="https://github.com/paulAlexSerban" class="nav-link px-2 text-body-secondary">Github</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/" class="nav-link px-2 text-body-secondary">Site</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/portfolio/" class="nav-link px-2 text-body-secondary">Portfolio</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/blog/" class="nav-link px-2 text-body-secondary">Blog</a></li>
            </ul>
            <p class="text-center text-body-secondary">© ${date.getFullYear()} paulserban.eu | Generated on ${date.toLocaleString()}</p>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
            crossorigin="anonymous"
            async defer></script>
            ${embededScripts()}
        </footer>
`;

module.exports = {
    headHTML,
    headerHTML,
    topNavbarHTML,
    footerHTML,
};
