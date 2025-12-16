const fs = require('fs');

const date = new Date();

const headHTML = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Front-end Playground Workbook</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            .component-card {
                transition: all 0.3s ease;
                border-radius: 12px !important;
                overflow: hidden;
            }
            .component-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
            }
            .component-card .card-header {
                border-radius: 12px 12px 0 0 !important;
                background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%) !important;
            }
            .component-card .card-body {
                padding: 1.5rem;
            }
            .component-card .btn-group .btn {
                border-radius: 6px;
            }
            .component-card .badge {
                font-size: 0.7em;
            }
            .sidebar {
                position: fixed;
                top: 56px;
                left: 0;
                height: calc(100vh - 56px);
                width: 250px;
                background: #212529;
                overflow-y: auto;
                z-index: 1020;
                transition: all 0.3s;
            }
            .sidebar .nav-link {
                color: #adb5bd;
                padding: 0.75rem 1rem;
                border-bottom: 1px solid #343a40;
                transition: all 0.2s;
            }
            .sidebar .nav-link:hover {
                color: #fff;
                background-color: #495057;
            }
            .sidebar .nav-link.active {
                color: #0d6efd;
                background-color: rgba(13, 110, 253, 0.1);
                border-left: 3px solid #0d6efd;
            }
            .main-content {
                margin-left: 250px;
                padding: 2rem;
                min-height: calc(100vh - 56px);
            }
            @media (max-width: 768px) {
                .sidebar {
                    margin-left: -250px;
                }
                .sidebar.show {
                    margin-left: 0;
                }
                .main-content {
                    margin-left: 0;
                }
            }
            summary {
                display: flex;
            }
            .navbar-toggler {
                border: none;
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
