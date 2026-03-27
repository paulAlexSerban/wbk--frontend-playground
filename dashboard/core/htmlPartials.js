import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { createInlineScriptTag } from './rendering/html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const date = new Date();

function buildHeadHTML() {
    return `
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
            .dashboard-summary {
                border-bottom: 1px solid #dee2e6;
                padding-bottom: 0.75rem;
            }
            .filter-chip {
                display: inline-flex;
                align-items: center;
                border: 1px solid #0d6efd;
                border-radius: 999px;
                padding: 0.2rem 0.65rem;
                font-size: 0.8rem;
                color: #0d6efd;
                background: #eef5ff;
            }
            .sidebar {
                position: sticky;
                top: 1rem;
                align-self: flex-start;
                height: calc(100vh - 2rem);
                width: auto;
                max-width: 100%;
                background: #fff;
                overflow-y: auto;
                z-index: 1020;
                transition: transform 0.3s ease;
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
            .sidebar-backdrop {
                display: none;
            }
            .main-content {
                margin-left: 250px;
                padding: 2rem;
                min-height: calc(100vh - 56px);
            }
            @media (max-width: 768px) {
                .sidebar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: min(85vw, 320px);
                    height: 100vh;
                    transform: translateX(-100%);
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
                    border-right: 1px solid #dee2e6;
                    z-index: 1050;
                }
                .sidebar.show {
                    transform: translateX(0);
                }
                .sidebar-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(33, 37, 41, 0.4);
                    z-index: 1040;
                }
                .sidebar-backdrop.show {
                    display: block;
                }
                .main-content {
                    margin-left: 0;
                }
                #searchInput,
                #libraryFilter,
                #sortSelect {
                    min-width: 140px;
                    width: 100%;
                }
            }
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation: none !important;
                    transition: none !important;
                    scroll-behavior: auto !important;
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
}

function buildTopNavbarHTML() {
    return `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <button id="sidebarToggle" class="btn btn-outline-light me-2 d-md-none" type="button" aria-controls="categorySidebar" aria-expanded="false" aria-label="Toggle filters">
        Filters
    </button>
    <a class="navbar-brand" href="#"><h1>Front-end Playground Workbook</h1></a>
    <div class="ms-auto d-flex gap-2 align-items-center flex-wrap justify-content-end">
        <input id="searchInput" class="form-control" type="search" placeholder="Search components..." aria-label="Search">
        <select id="libraryFilter" class="form-select" aria-label="Filter by library">
            <option value="all">All Libraries</option>
        </select>
        <select id="sortSelect" class="form-select" aria-label="Sort components">
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="library-asc">Library A-Z</option>
            <option value="library-desc">Library Z-A</option>
        </select>
        <button id="resetFilters" type="button" class="btn btn-outline-light">Reset</button>
    </div>
</nav>`;
}

function buildHeaderHTML() {
    return `
        <header class="row">
            
        </header>
`;
}

function readEmbeddedScriptContent() {
    return fs.readFileSync(path.join(__dirname, '..', 'scripts', 'index.js'), 'utf-8');
}

function buildFooterHTML(buildDate = date, embeddedScriptContent = readEmbeddedScriptContent()) {
    return `
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="https://www.linkedin.com/in/paulalexs/" class="nav-link px-2 text-body-secondary">LinkedIn</a></li>
                <li class="nav-item"><a href="https://github.com/paulAlexSerban" class="nav-link px-2 text-body-secondary">Github</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/" class="nav-link px-2 text-body-secondary">Site</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/portfolio/" class="nav-link px-2 text-body-secondary">Portfolio</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/blog/" class="nav-link px-2 text-body-secondary">Blog</a></li>
            </ul>
            <p class="text-center text-body-secondary">© ${buildDate.getFullYear()} paulserban.eu | Generated on ${buildDate.toLocaleString()}</p>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
            crossorigin="anonymous"
            async defer></script>
            ${createInlineScriptTag(embeddedScriptContent)}
        </footer>
`;
}

const headHTML = buildHeadHTML();
const topNavbarHTML = buildTopNavbarHTML();
const headerHTML = buildHeaderHTML();
const footerHTML = buildFooterHTML();

export {
    buildHeadHTML,
    buildTopNavbarHTML,
    buildHeaderHTML,
    buildFooterHTML,
    headHTML,
    headerHTML,
    topNavbarHTML,
    footerHTML,
};
