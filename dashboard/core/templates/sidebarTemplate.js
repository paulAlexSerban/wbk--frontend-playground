const generateSidebarHTML = () => {
    return `
<nav id="categorySidebar" class="col-md-2 bg-white border-end h-auto sidebar" role="navigation" aria-label="Category filters" tabindex="-1">
    <div class="pt-3">
        <div class="px-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Categories</h6>
            <button id="sidebarClose" class="btn btn-sm btn-outline-secondary d-md-none" type="button" aria-label="Close filters">Close</button>
        </div>
        <ul id="categoryFilterList" class="nav flex-column">
            <li class="nav-item"><a class="nav-link active" href="#" data-filter-category="all">All</a></li>
        </ul>
    </div>
</nav>`;
};

export { generateSidebarHTML };
