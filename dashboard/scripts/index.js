// Search filter
document.getElementById('searchInput').addEventListener('keyup', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.item-card').forEach((card) => {
        const title = card.querySelector('.card-title').innerText.toLowerCase();
        card.style.display = title.includes(query) ? '' : 'none';
    });
});

// Category filter
function filterCategory(category) {
    document.querySelectorAll('.item-card').forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open modal detail
function openDetail(title, body, href) {
    document.getElementById('detailTitle').innerText = title;
    document.getElementById('detailBody').innerText = body;
    document.getElementById('detailLink').setAttribute('href', href);
    new bootstrap.Modal(document.getElementById('detailModal')).show();
}
