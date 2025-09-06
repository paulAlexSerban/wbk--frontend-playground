// componentTemplate.js
// Generates HTML for a single component's variations

/**
 * Generate HTML for a single component's variations.
 * @param {string} baseUrl
 * @param {string} dir
 * @param {string} groupName
 * @param {string} categoryName
 * @param {object} component
 * @returns {string}
 */
function generateComponentHTML(baseUrl, dir, groupName, categoryName, component) {
    return component.variations
        .filter((variation) => !variation.hide)
        .map((variation, index) => {
            const cardId = `card-${dir}-${groupName}-${categoryName}-${component.component}-${index}`;
            const carouselId = `carousel-${cardId}`;

            // Generate image gallery if images exist, otherwise use default image
            const hasImages = variation.images && variation.images.length > 0;
            const imagesToShow = hasImages
                ? variation.images
                : [{ filename: 'default-background', alt: 'Default component image' }];

            const imageGallery = `
                    <div id="${carouselId}" class="carousel slide card-img-top" data-bs-ride="carousel">
                        ${
                            imagesToShow.length > 1
                                ? `
                        <div class="carousel-indicators">
                            ${imagesToShow
                                .map(
                                    (_, imgIndex) => `
                                <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${imgIndex}" 
                                        ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} 
                                        aria-label="Slide ${imgIndex + 1}"></button>
                            `
                                )
                                .join('')}
                        </div>
                        `
                                : ''
                        }
                        <div class="carousel-inner">
                            ${imagesToShow
                                .map((image, imgIndex) => {
                                    const imageURL =
                                        image && image.filename
                                            ? `${baseUrl}/assets/images/${image.filename}-960_720.webp`
                                            : `${baseUrl}/assets/images/default-background-960_720.webp`;
                                    return `
                                <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                    <img src="${imageURL}" class="d-block w-100" alt="${image.alt || variation.name}" style="height: 200px; object-fit: cover;">
                                    ${
                                        image.caption
                                            ? `<div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded">
                                        <p class="mb-0 small">${image.caption}</p>
                                    </div>`
                                            : ''
                                    }
                                </div>
                            `;
                                })
                                .join('')}
                        </div>
                        ${
                            imagesToShow.length > 1
                                ? `
                            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        `
                                : ''
                        }
                    </div>
                `;

            return `
                <div class="col-lg-4 col-md-6 mb-4 item-card" data-category="${categoryName}">
                    <div class="card h-100 shadow-sm border-0 component-card" >
                        ${imageGallery}
                        <div class="card-header bg-gradient bg-primary text-white border-0 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-puzzle-fill me-2"></i>
                                <small class="fw-bold text-uppercase">${categoryName}</small>
                            </div>
                            <div class="badge bg-light text-primary">v${component.version || '1.0'}</div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-dark mb-2">${variation.name}</h5>
                            <p class="card-text text-muted flex-grow-1 mb-3">${variation.description || 'No description available'}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <div class="btn-group btn-group-sm" role="group">
                                    <a type="button" class="btn btn-outline-primary btn-sm" href="${baseUrl}/${dir}/${groupName}/${categoryName}/${component.component}/${variation.slug}.html" target="_blank">
                                        <i class="bi bi-eye me-1"></i>Preview
                                    </a>
                                    ${
                                        hasImages
                                            ? `
                                        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#galleryModal-${cardId}">
                                            <i class="bi bi-images me-1"></i>Gallery
                                        </button>
                                    `
                                            : ''
                                    }
                                </div>
                                <small class="text-muted">
                                    <i class="bi bi-collection me-1"></i>Library: ${dir}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${
                    hasImages
                        ? `
                <!-- Gallery Modal for ${variation.name} -->
                <div class="modal fade" id="galleryModal-${cardId}" tabindex="-1" aria-labelledby="galleryModalLabel-${cardId}" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="galleryModalLabel-${cardId}">${variation.name} - Image Gallery</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-0">
                                <div id="galleryCarousel-${cardId}" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-indicators">
                                        ${variation.images
                                            .map(
                                                (_, imgIndex) => `
                                            <button type="button" data-bs-target="#galleryCarousel-${cardId}" data-bs-slide-to="${imgIndex}" 
                                                    ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} 
                                                    aria-label="Slide ${imgIndex + 1}"></button>
                                        `
                                            )
                                            .join('')}
                                    </div>
                                    <div class="carousel-inner">
                                        ${variation.images
                                            .map(
                                                (image, imgIndex) => `
                                            <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                                <img src="${baseUrl}/assets/images/${image.filename}-1920_1440.webp" class="d-block w-100" alt="${image.alt || variation.name}" style="max-height: 60vh; object-fit: contain;">
                                                ${
                                                    image.caption
                                                        ? `<div class="carousel-caption">
                                                    <p class="bg-dark bg-opacity-75 rounded p-2 mb-0">${image.caption}</p>
                                                </div>`
                                                        : ''
                                                }
                                            </div>
                                        `
                                            )
                                            .join('')}
                                    </div>
                                    ${
                                        variation.images.length > 1
                                            ? `
                                        <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel-${cardId}" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel-${cardId}" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    `
                                            : ''
                                    }
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <a href="${baseUrl}/${dir}/${groupName}/${categoryName}/${component.component}/${variation.slug}.html" target="_blank" class="btn btn-primary">
                                    <i class="bi bi-eye me-1"></i>View Component
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                `
                        : ''
                }
            `;
        })
        .join('');
}

module.exports = {
    generateComponentHTML,
};
