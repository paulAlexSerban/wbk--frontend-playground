// Main JavaScript for Pelican Site

(function() {
    'use strict';

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
            link.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        }
    });

    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px 10px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        // Make pre position relative to contain absolute button
        block.style.position = 'relative';
        
        // Show button on hover
        block.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });
        
        button.addEventListener('click', () => {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                button.textContent = 'Error';
            });
        });
        
        block.appendChild(button);
    });

    // Add external link icons
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        if (!link.querySelector('.external-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-icon';
            icon.textContent = ' ↗';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.background = '#764ba2';
        backToTopButton.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.background = '#667eea';
        backToTopButton.style.transform = 'scale(1)';
    });

    // Table of contents generator (if article has headings)
    const articleContent = document.querySelector('.article-content, .page-content');
    
    if (articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        
        if (headings.length > 2) {
            const toc = document.createElement('nav');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>Table of Contents</h3>';
            
            const tocList = document.createElement('ul');
            
            headings.forEach((heading, index) => {
                // Add ID if doesn't exist
                if (!heading.id) {
                    heading.id = `heading-${index}`;
                }
                
                const li = document.createElement('li');
                li.className = heading.tagName.toLowerCase();
                
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                
                li.appendChild(link);
                tocList.appendChild(li);
            });
            
            toc.appendChild(tocList);
            
            // Insert TOC after first paragraph
            const firstParagraph = articleContent.querySelector('p');
            if (firstParagraph) {
                firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
            }
            
            // Style TOC
            toc.style.cssText = `
                background: #f8f8f8;
                padding: 20px;
                border-radius: 6px;
                margin: 30px 0;
                border-left: 4px solid #667eea;
            `;
            
            toc.querySelector('h3').style.cssText = `
                margin-top: 0;
                margin-bottom: 15px;
                color: #667eea;
            `;
            
            tocList.style.cssText = `
                list-style: none;
                margin-left: 0;
            `;
            
            tocList.querySelectorAll('li').forEach(li => {
                li.style.marginBottom = '8px';
                
                if (li.className === 'h3') {
                    li.style.marginLeft = '20px';
                    li.style.fontSize = '0.9em';
                }
            });
            
            tocList.querySelectorAll('a').forEach(link => {
                link.style.cssText = `
                    color: #667eea;
                    text-decoration: none;
                `;
                
                link.addEventListener('mouseenter', function() {
                    this.style.textDecoration = 'underline';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.textDecoration = 'none';
                });
            });
        }
    }

    console.log('Pelican site initialized successfully! 🚀');
})();
