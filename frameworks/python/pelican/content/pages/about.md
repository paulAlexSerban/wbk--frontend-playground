Title: About
Date: 2025-10-01 12:00
Slug: about
Authors: Paul Serban
Status: published

# About This Site

Welcome to the **Frontend Playground - Pelican Edition**! This site demonstrates the power and flexibility of [Pelican](https://docs.getpelican.com/), a static site generator written in Python, combined with the elegant [Jinja2](https://jinja.palletsprojects.com/) templating engine.

## What is This Project?

This is a playground and learning environment for exploring:

- **Static Site Generation** with Pelican
- **Jinja2 Templating** for dynamic layouts
- **Markdown** for content creation
- **Python-based** workflows
- **Modern web development** practices

## Technologies Used

### Core Technologies

- **Pelican**: Static site generator framework
- **Jinja2**: Template engine for Python
- **Markdown**: Lightweight markup language
- **Python 3.12**: Programming language

### Additional Tools

- **Beautiful Soup**: HTML/XML parsing
- **Typogrify**: Typography improvements
- **Invoke**: Task execution
- **LiveReload**: Development server with auto-reload

## Features

This Pelican setup includes:

✅ Custom Jinja2 templates  
✅ Responsive design  
✅ Markdown content with code highlighting  
✅ SEO optimization  
✅ Sitemap generation  
✅ RSS/Atom feeds  
✅ Category and tag organization  
✅ Archive pages  
✅ Pagination  

## About the Author

**Paul Serban** is a developer exploring various static site generation tools and modern web development frameworks. This project is part of a larger workbook focused on frontend development.

## Project Structure

```
pelican/
├── site/
│   ├── content/          # Your content (Markdown files)
│   │   ├── posts/        # Blog articles
│   │   ├── pages/        # Static pages
│   │   └── images/       # Images and media
│   ├── themes/           # Custom Jinja2 themes
│   └── output/           # Generated static site
├── pelicanconf.py        # Main configuration
├── requirements.txt      # Python dependencies
└── dev.sh               # Development script
```

## Getting Started

To use this Pelican setup:

1. Install dependencies: `pip install -r requirements.txt`
2. Create content in `site/content/`
3. Build the site: `pelican site/content -s pelicanconf.py`
4. Serve locally: `pelican --listen`

## Resources

- [Pelican Documentation](https://docs.getpelican.com/)
- [Jinja2 Documentation](https://jinja.palletsprojects.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Repository](https://github.com/paulAlexSerban/wbk--frontend-playground)

## Contact

Feel free to reach out:

- **GitHub**: [@paulAlexSerban](https://github.com/paulAlexSerban)
- **LinkedIn**: [paulalexserban](https://linkedin.com/in/paulalexserban)

---

*This site is built with Pelican and Jinja2. All content is written in Markdown.*
