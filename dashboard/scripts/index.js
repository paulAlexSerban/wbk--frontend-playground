const dashboardState = {
    query: '',
    category: 'all',
    library: 'all',
    sort: 'title-asc',
};

let lastSidebarTrigger = null;

function isMobileViewport() {
    return window.matchMedia('(max-width: 768px)').matches;
}

function getAllCards() {
    return Array.from(document.querySelectorAll('.item-card'));
}

function getAvailableCategories() {
    return Array.from(
        new Set(
            getAllCards()
                .map((card) => normalizeText(card.dataset.category))
                .filter((value) => value.length > 0)
        )
    ).sort((a, b) => a.localeCompare(b));
}

function isValidSort(sortValue) {
    return ['title-asc', 'title-desc', 'library-asc', 'library-desc'].includes(sortValue);
}

function applyStateFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const query = normalizeText(params.get('q')).trim();
    const category = normalizeText(params.get('category') || 'all');
    const library = normalizeText(params.get('library') || 'all');
    const sort = normalizeText(params.get('sort') || 'title-asc');

    dashboardState.query = query;
    dashboardState.category = category || 'all';
    dashboardState.library = library || 'all';
    dashboardState.sort = isValidSort(sort) ? sort : 'title-asc';
}

function syncUrlFromState() {
    const params = new URLSearchParams();

    if (dashboardState.query) params.set('q', dashboardState.query);
    if (dashboardState.category !== 'all') params.set('category', dashboardState.category);
    if (dashboardState.library !== 'all') params.set('library', dashboardState.library);
    if (dashboardState.sort !== 'title-asc') params.set('sort', dashboardState.sort);

    const queryString = params.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
}

function normalizeText(value) {
    return String(value || '').toLowerCase();
}

function applyFilters() {
    const cardContainer = document.getElementById('cardContainer');
    const resultsSummary = document.getElementById('resultsSummary');
    const activeFilters = document.getElementById('activeFilters');
    const emptyState = document.getElementById('emptyState');
    const cards = Array.from(document.querySelectorAll('.item-card'));

    if (!cardContainer) {
        return;
    }

    const compareByTitle = (a, b) => {
        const titleA = normalizeText(a.querySelector('.card-title')?.innerText);
        const titleB = normalizeText(b.querySelector('.card-title')?.innerText);
        return titleA.localeCompare(titleB);
    };

    const compareByLibrary = (a, b) => {
        const libA = normalizeText(a.dataset.library);
        const libB = normalizeText(b.dataset.library);
        return libA.localeCompare(libB);
    };

    const sortMap = {
        'title-asc': compareByTitle,
        'title-desc': (a, b) => compareByTitle(b, a),
        'library-asc': compareByLibrary,
        'library-desc': (a, b) => compareByLibrary(b, a),
    };

    const sortComparator = sortMap[dashboardState.sort] || sortMap['title-asc'];
    cards.sort(sortComparator);

    cards.forEach((card) => cardContainer.appendChild(card));

    let visibleCount = 0;

    cards.forEach((card) => {
        const cardTitle = normalizeText(card.querySelector('.card-title')?.innerText);
        const cardCategory = normalizeText(card.dataset.category);
        const cardLibrary = normalizeText(card.dataset.library);

        const matchesQuery = dashboardState.query.length === 0 || cardTitle.includes(dashboardState.query);
        const matchesCategory = dashboardState.category === 'all' || cardCategory === dashboardState.category;
        const matchesLibrary = dashboardState.library === 'all' || cardLibrary === dashboardState.library;

        const isVisible = matchesQuery && matchesCategory && matchesLibrary;
        card.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (resultsSummary) {
        const noun = visibleCount === 1 ? 'result' : 'results';
        resultsSummary.innerText = `Showing ${visibleCount} ${noun}`;
    }

    if (emptyState) {
        emptyState.classList.toggle('d-none', visibleCount > 0);
    }

    if (activeFilters) {
        const chips = [];
        if (dashboardState.query) chips.push(`Search: ${dashboardState.query}`);
        if (dashboardState.category !== 'all') chips.push(`Category: ${dashboardState.category}`);
        if (dashboardState.library !== 'all') chips.push(`Project: ${dashboardState.library}`);
        if (dashboardState.sort !== 'title-asc') chips.push(`Sort: ${dashboardState.sort}`);

        activeFilters.innerHTML = '';
        chips.forEach((chip) => {
            const chipElement = document.createElement('span');
            chipElement.className = 'filter-chip';
            chipElement.textContent = chip;
            activeFilters.appendChild(chipElement);
        });
    }

    syncUrlFromState();
}

function setActiveCategoryLink(category) {
    const links = document.querySelectorAll('[data-filter-category]');
    links.forEach((link) => {
        const isActive = normalizeText(link.dataset.filterCategory) === category;
        link.classList.toggle('active', isActive);
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        return;
    }

    searchInput.value = dashboardState.query;

    searchInput.addEventListener('input', (event) => {
        dashboardState.query = normalizeText(event.target.value).trim();
        applyFilters();
    });
}

function renderCategoryLinks() {
    const categoryFilterList = document.getElementById('categoryFilterList');
    if (!categoryFilterList) {
        return;
    }

    const categories = getAvailableCategories();
    const links = [
        { value: 'all', label: 'All' },
        ...categories.map((category) => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
        })),
    ];

    categoryFilterList.innerHTML = links
        .map(
            (entry) =>
                `<li class="nav-item"><a class="nav-link ${entry.value === 'all' ? 'active' : ''}" href="#" data-filter-category="${entry.value}">${entry.label}</a></li>`
        )
        .join('');
}

function initializeLibraryFilter() {
    const libraryFilter = document.getElementById('libraryFilter');
    if (!libraryFilter) {
        return;
    }

    const libraries = getAllCards()
        .map((card) => normalizeText(card.dataset.library))
        .filter((library) => library.length > 0);

    const uniqueLibraries = Array.from(new Set(libraries)).sort((a, b) => a.localeCompare(b));

    uniqueLibraries.forEach((library) => {
        const option = document.createElement('option');
        option.value = library;
        option.textContent = library;
        libraryFilter.appendChild(option);
    });

    const isKnownLibrary = dashboardState.library === 'all' || uniqueLibraries.includes(dashboardState.library);
    dashboardState.library = isKnownLibrary ? dashboardState.library : 'all';
    libraryFilter.value = dashboardState.library;

    libraryFilter.addEventListener('change', (event) => {
        dashboardState.library = normalizeText(event.target.value || 'all');
        applyFilters();
    });
}

function initializeSortControl() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) {
        return;
    }

    sortSelect.value = dashboardState.sort;

    sortSelect.addEventListener('change', (event) => {
        dashboardState.sort = normalizeText(event.target.value || 'title-asc');
        applyFilters();
    });
}

function initializeResetControl() {
    const resetButton = document.getElementById('resetFilters');
    const searchInput = document.getElementById('searchInput');
    const libraryFilter = document.getElementById('libraryFilter');
    const sortSelect = document.getElementById('sortSelect');

    if (!resetButton) {
        return;
    }

    resetButton.addEventListener('click', () => {
        dashboardState.query = '';
        dashboardState.category = 'all';
        dashboardState.library = 'all';
        dashboardState.sort = 'title-asc';

        if (searchInput) searchInput.value = '';
        if (libraryFilter) libraryFilter.value = 'all';
        if (sortSelect) sortSelect.value = 'title-asc';

        setActiveCategoryLink('all');
        applyFilters();
    });
}

function initializeCategoryFilter() {
    const sidebar = document.getElementById('categorySidebar');
    if (!sidebar) {
        return;
    }

    sidebar.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-filter-category]');
        if (!trigger) {
            return;
        }

        event.preventDefault();

        dashboardState.category = normalizeText(trigger.dataset.filterCategory || 'all');
        setActiveCategoryLink(dashboardState.category);
        applyFilters();

        if (isMobileViewport()) {
            closeSidebar();
        }
    });
}

function closeSidebar() {
    const sidebar = document.getElementById('categorySidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('sidebarToggle');

    if (!sidebar) {
        return;
    }

    sidebar.classList.remove('show');
    if (backdrop) {
        backdrop.classList.remove('show');
    }
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
    }

    if (isMobileViewport() && lastSidebarTrigger && typeof lastSidebarTrigger.focus === 'function') {
        lastSidebarTrigger.focus();
    }
}

function openSidebar() {
    const sidebar = document.getElementById('categorySidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('sidebarToggle');

    if (!sidebar) {
        return;
    }

    sidebar.classList.add('show');
    if (backdrop) {
        backdrop.classList.add('show');
    }
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
    }

    const firstFocusable = sidebar.querySelector('[data-filter-category], #sidebarClose');
    if (firstFocusable && typeof firstFocusable.focus === 'function') {
        firstFocusable.focus();
    }
}

function initializeSidebarToggle() {
    const sidebar = document.getElementById('categorySidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('sidebarToggle');
    const closeButton = document.getElementById('sidebarClose');

    if (!sidebar || !toggle) {
        return;
    }

    toggle.addEventListener('click', () => {
        lastSidebarTrigger = toggle;
        if (sidebar.classList.contains('show')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeSidebar);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });
}

function initializeDashboardFilters() {
    applyStateFromUrl();
    renderCategoryLinks();

    initializeSearch();
    initializeCategoryFilter();
    initializeLibraryFilter();
    initializeSortControl();
    initializeResetControl();
    initializeSidebarToggle();

    // Apply defaults once DOM is ready so initial state is deterministic.
    setActiveCategoryLink(dashboardState.category);
    applyFilters();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboardFilters);
} else {
    initializeDashboardFilters();
}
