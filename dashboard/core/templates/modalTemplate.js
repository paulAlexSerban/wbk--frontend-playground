const generateModalHTML = `
<div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content shadow-lg rounded-4 border-0">
            <div class="modal-header bg-primary text-white rounded-top-4 border-0">
                <h5 class="modal-title fw-bold" id="detailTitle"></h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4 bg-light">
                <div id="detailBody" class="mb-3"></div>
                <div class="d-flex justify-content-end gap-2">
                    <a id="detailLink" href="#" target="_blank" rel="noopener" class="btn btn-primary shadow-sm">Preview</a>
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

module.exports = { generateModalHTML };
