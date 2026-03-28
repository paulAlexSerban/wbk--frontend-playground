// componentTemplate.js
// Generates HTML for a single component's variations

import { escapeHtml, escapeAttribute } from '../rendering/html.js';
import { buildPreviewUrl, buildImageUrl, buildCardId } from '../rendering/paths.js';

function renderCarouselIndicators(carouselId, imagesToShow) {
    if (imagesToShow.length <= 1) {
        return '';
    }

    return `
        <div class="carousel-indicators">
            ${imagesToShow
                .map(
                    (_, imgIndex) => `
                <button type="button" data-bs-target="#${escapeAttribute(carouselId)}" data-bs-slide-to="${imgIndex}" 
                        ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} 
                        aria-label="Slide ${imgIndex + 1}"></button>
            `
                )
                .join('')}
        </div>
    `;
}

function renderCarouselControls(carouselId, imagesToShow) {
    if (imagesToShow.length <= 1) {
        return '';
    }

    return `
        <button class="carousel-control-prev" type="button" data-bs-target="#${escapeAttribute(carouselId)}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${escapeAttribute(carouselId)}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    `;
}

function renderImageGallery({ baseUrl, carouselId, variationName, imagesToShow }) {
    return `
        <div id="${escapeAttribute(carouselId)}" class="carousel slide card-img-top" data-bs-ride="carousel">
            ${renderCarouselIndicators(carouselId, imagesToShow)}
            <div class="carousel-inner">
                ${imagesToShow
                    .map((image, imgIndex) => {
                        const imageURL = buildImageUrl(baseUrl, image?.filename, '960_720');
                        const altText = image?.alt || variationName;
                        const caption = image?.caption ? escapeHtml(image.caption) : '';
                        return `
                            <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                <img src="${escapeAttribute(imageURL)}" class="d-block w-100" alt="${escapeAttribute(altText)}" style="height: 200px; object-fit: cover;" loading="lazy" decoding="async">
                                ${
                                    caption
                                        ? `<div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded">
                                    <p class="mb-0 small">${caption}</p>
                                </div>`
                                        : ''
                                }
                            </div>
                        `;
                    })
                    .join('')}
            </div>
            ${renderCarouselControls(carouselId, imagesToShow)}
        </div>
    `;
}

function renderGalleryModal({ baseUrl, dir, groupName, categoryName, componentSlug, variation, cardId }) {
    const galleryCarouselId = `galleryCarousel-${cardId}`;
    const modalId = `galleryModal-${cardId}`;
    const modalLabelId = `galleryModalLabel-${cardId}`;
    const previewUrl = buildPreviewUrl(baseUrl, dir, groupName, categoryName, componentSlug, variation.slug);

    return `
        <!-- Gallery Modal for ${escapeHtml(variation.name)} -->
        <div class="modal fade" id="${escapeAttribute(modalId)}" tabindex="-1" aria-labelledby="${escapeAttribute(modalLabelId)}" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${escapeAttribute(modalLabelId)}">${escapeHtml(variation.name)} - Image Gallery</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-0">
                        <div id="${escapeAttribute(galleryCarouselId)}" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                ${variation.images
                                    .map(
                                        (_, imgIndex) => `
                                    <button type="button" data-bs-target="#${escapeAttribute(galleryCarouselId)}" data-bs-slide-to="${imgIndex}" 
                                            ${imgIndex === 0 ? 'class="active" aria-current="true"' : ''} 
                                            aria-label="Slide ${imgIndex + 1}"></button>
                                `
                                    )
                                    .join('')}
                            </div>
                            <div class="carousel-inner">
                                ${variation.images
                                    .map((image, imgIndex) => {
                                        const imageURL = buildImageUrl(baseUrl, image.filename, '1920_1440');
                                        const caption = image.caption ? escapeHtml(image.caption) : '';
                                        const altText = image.alt || variation.name;
                                        return `
                                            <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                                <img src="${escapeAttribute(imageURL)}" class="d-block w-100" alt="${escapeAttribute(altText)}" style="max-height: 60vh; object-fit: contain;" loading="lazy" decoding="async">
                                                ${
                                                    caption
                                                        ? `<div class="carousel-caption">
                                                    <p class="bg-dark bg-opacity-75 rounded p-2 mb-0">${caption}</p>
                                                </div>`
                                                        : ''
                                                }
                                            </div>
                                        `;
                                    })
                                    .join('')}
                            </div>
                            ${renderCarouselControls(galleryCarouselId, variation.images)}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a href="${escapeAttribute(previewUrl)}" target="_blank" class="btn btn-primary">
                            <i class="bi bi-eye me-1"></i>View Component
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
            const cardId = buildCardId(dir, groupName, categoryName, component.component, index);
            const carouselId = `carousel-${cardId}`;
            const modalId = `galleryModal-${cardId}`;
            const previewUrl = buildPreviewUrl(
                baseUrl,
                dir,
                groupName,
                categoryName,
                component.component,
                variation.slug
            );

            // Generate image gallery if images exist, otherwise use default image
            const hasImages = variation.images && variation.images.length > 0;
            const imagesToShow = hasImages
                ? variation.images
                : [{ filename: 'default-background', alt: 'Default component image' }];

            const imageGallery = renderImageGallery({
                baseUrl,
                carouselId,
                variationName: variation.name,
                imagesToShow,
            });

            return `
                <div class="col-lg-4 col-md-6 mb-4 item-card" data-category="${escapeAttribute(categoryName)}" data-library="${escapeAttribute(dir)}">
                    <div class="card h-100 shadow-sm border-0 component-card" >
                        ${imageGallery}
                        <div class="card-header bg-gradient bg-primary text-white border-0 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-puzzle-fill me-2"></i>
                                <small class="fw-bold text-uppercase">${escapeHtml(categoryName)}</small>
                            </div>
                            <div class="badge bg-light text-primary">v${escapeHtml(component.version || '1.0')}</div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold text-dark mb-2">${escapeHtml(variation.name)}</h5>
                            <p class="card-text text-muted flex-grow-1 mb-3">${escapeHtml(variation.description || 'No description available')}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <div class="btn-group btn-group-sm" role="group">
                                    <a type="button" class="btn btn-outline-primary btn-sm" href="${escapeAttribute(previewUrl)}" target="_blank">
                                        <i class="bi bi-eye me-1"></i>Preview
                                    </a>
                                    ${
                                        hasImages
                                            ? `
                                        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#${escapeAttribute(modalId)}">
                                            <i class="bi bi-images me-1"></i>Gallery
                                        </button>
                                    `
                                            : ''
                                    }
                                </div>
                                <small class="text-muted">
                                    <i class="bi bi-collection me-1"></i>Library: ${escapeHtml(dir)}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${
                    hasImages
                        ? renderGalleryModal({
                              baseUrl,
                              dir,
                              groupName,
                              categoryName,
                              componentSlug: component.component,
                              variation,
                              cardId,
                          })
                        : ''
                }
            `;
        })
        .join('');
}

export { generateComponentHTML };
