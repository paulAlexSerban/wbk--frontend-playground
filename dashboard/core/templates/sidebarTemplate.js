const generateSidebarHTML = () => {
    return `
<nav class="col-md-2 d-none d-md-block bg-white border-end vh-100">
    <div class="pt-3">
        <h6 class="px-3">Categories</h6>
        <ul class="nav flex-column">
            <li class="nav-item"><a class="nav-link active" href="#" onclick="filterCategory('all')">All</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="filterCategory('components')">Components</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="filterCategory('modules')">Modules</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="filterCategory('patterns')">Patterns</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="filterCategory('products')">Products</a></li>

        </ul>
    </div>
</nav>`;
};

module.exports = {
    generateSidebarHTML,
};
