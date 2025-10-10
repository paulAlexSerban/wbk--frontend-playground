#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# Basic site information
AUTHOR = 'Paul Serban'
SITENAME = 'Frontend Playground - Python w. Pelican'
SITEURL = "http://localhost:8000"
SITESUBTITLE = 'A playground for exploring static site generation with Pelican and Jinja2'

# Path configuration
PATH = "content"
OUTPUT_PATH = "output/"
STATIC_PATHS = [
    'images',
    'extra',
]

# Extra files to copy to root
EXTRA_PATH_METADATA = {
    'extra/robots.txt': {'path': 'robots.txt'},
    'extra/favicon.ico': {'path': 'favicon.ico'},
}

# Locale and timezone
TIMEZONE = 'Europe/Rome'
DEFAULT_LANG = 'en'
DEFAULT_DATE_FORMAT = '%B %d, %Y'

# Template configuration - explicitly use Jinja2
JINJA_ENVIRONMENT = {
    'extensions': ['jinja2.ext.i18n'],
}

# Theme configuration
THEME = 'themes/base'  # Custom theme with Jinja2 templates
THEME_STATIC_DIR = 'static'
THEME_STATIC_PATHS = ['static']

# URL structure
ARTICLE_URL = 'posts/{slug}.html'
ARTICLE_SAVE_AS = 'posts/{slug}.html'
PAGE_URL = 'pages/{slug}.html'
PAGE_SAVE_AS = 'pages/{slug}.html'
CATEGORY_URL = 'category/{slug}.html'
CATEGORY_SAVE_AS = 'category/{slug}.html'
TAG_URL = 'tag/{slug}.html'
TAG_SAVE_AS = 'tag/{slug}.html'
AUTHOR_URL = 'author/{slug}.html'
AUTHOR_SAVE_AS = 'author/{slug}.html'

# Index and archive settings
INDEX_SAVE_AS = 'index.html'
ARCHIVES_SAVE_AS = 'archives.html'
CATEGORIES_SAVE_AS = 'categories.html'
TAGS_SAVE_AS = 'tags.html'
AUTHORS_SAVE_AS = 'authors.html'

# Feed generation (disabled for development)
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Navigation and links
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = True

# External links
LINKS = (
    ("Pelican Documentation", "https://docs.getpelican.com/"),
    ("Jinja2 Documentation", "https://jinja.palletsprojects.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Markdown Guide", "https://www.markdownguide.org/"),
)

# Social media links
SOCIAL = (
    ("GitHub", "https://github.com/paulAlexSerban"),
    ("LinkedIn", "https://linkedin.com/in/paulalexserban"),
)

# Pagination
DEFAULT_PAGINATION = 10
PAGINATION_PATTERNS = (
    (1, '{url}', '{save_as}'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

# Markdown configuration
MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.toc': {'permalink': True},
    },
    'output_format': 'html5',
}

# Plugin configuration
PLUGIN_PATHS = ['plugins']
PLUGINS = [
    'sitemap',
    'seo',
]

# SEO and sitemap settings
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}

# Development settings
RELATIVE_URLS = True
DELETE_OUTPUT_DIRECTORY = True
CACHE_CONTENT = False

# Custom Jinja2 filters and globals
def format_date(date, format_string='%B %d, %Y'):
    """Custom date filter for Jinja2 templates"""
    return date.strftime(format_string)

JINJA_FILTERS = {
    'format_date': format_date,
}

# Article and page defaults
DEFAULT_METADATA = {
    'status': 'published',
}

# Summary settings
SUMMARY_MAX_LENGTH = 50
