Title: Welcome to Pelican with Jinja2
Date: 2025-10-01 10:00
Modified: 2025-10-01 10:30
Category: Tutorial
Tags: pelican, python, jinja2, getting-started
Slug: welcome-to-pelican
Authors: Paul Serban
Summary: An introduction to building static sites with Pelican and Jinja2 templating
Status: published

# Welcome to Pelican!

This is your first article built with **Pelican**, a static site generator powered by Python and **Jinja2** templating.

## Why Pelican?

Pelican is a fantastic choice for building static websites because:

1. **Python-powered**: Written in Python, making it easy to extend and customize
2. **Jinja2 templates**: Powerful templating engine for flexible layouts
3. **Markdown support**: Write content in Markdown for easy formatting
4. **Plugin ecosystem**: Extend functionality with plugins
5. **Fast builds**: Quick generation of static HTML files

## Getting Started

To create content in Pelican, simply write Markdown files with metadata headers like this:

```markdown
Title: Your Article Title
Date: 2025-10-01 10:00
Category: Your Category
Tags: tag1, tag2
```

## Code Highlighting

Pelican supports code highlighting out of the box:

```python
def hello_pelican():
    print("Hello from Pelican!")
    return "Welcome to static site generation"

if __name__ == "__main__":
    hello_pelican()
```

## Jinja2 Features

With Jinja2, you can create powerful templates with:

- **Variables**: `{{ variable }}`
- **Filters**: `{{ date|format_date }}`
- **Control structures**: `{% if condition %}...{% endif %}`
- **Template inheritance**: `{% extends "base.html" %}`

## Next Steps

Check out more articles to learn about:

- Advanced Pelican configuration
- Creating custom Jinja2 templates
- Working with plugins
- Deploying your site

Happy static site building! 🚀
