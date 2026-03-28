// Core HTML builder for dashboard templating system
// Contains functions for assembling the HTML structure from data

const buildHtmlDocument = ({ head, sidebar, topNavbar, cards, footer }) => `
<!DOCTYPE html>
<html lang="en">
    ${head}
    <body class="bg-light">
        ${topNavbar}
        <div id="sidebarBackdrop" class="sidebar-backdrop"></div>

        <div class="container-fluid">
            <div class="row">
                ${sidebar}
                <main class="col-md-10 ms-sm-auto px-4 py-4">
                    <section class="dashboard-summary mb-3" aria-live="polite">
                        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                            <p id="resultsSummary" class="mb-0 fw-semibold">Showing 0 results</p>
                            <div id="activeFilters" class="d-flex flex-wrap gap-2" aria-label="Active filters"></div>
                        </div>
                    </section>
                    <div class="row" id="cardContainer">
                        ${cards}
                    </div>
                    <section id="emptyState" class="alert alert-light border mt-3 d-none" role="status" aria-live="polite">
                        <h2 class="h5 mb-2">No Components Found</h2>
                        <p class="mb-0 text-muted">Try clearing filters or broadening your search terms.</p>
                    </section>
                </main>
            </div>
        </div>
        ${footer}
    </body>
</html>
`;

export { buildHtmlDocument };
