Title: Jinja2 Templating Basics for Pelican
Date: 2025-10-03 14:00
Modified: 2025-10-03 15:00
Category: Tutorial
Tags: jinja2, templating, pelican, python
Slug: jinja2-templating-basics
Authors: Paul Serban
Summary: Learn the fundamentals of Jinja2 templating in Pelican static sites
Status: published

# Jinja2 Templating Basics

Jinja2 is a modern and designer-friendly templating language for Python. In Pelican, it's the engine that transforms your content and templates into beautiful HTML pages.

## Template Variables

Access variables using double curly braces:

```jinja2
{{ SITENAME }}
{{ article.title }}
{{ page.content }}
```

## Filters

Transform variables with filters using the pipe operator:

```jinja2
{{ article.date|strftime('%B %d, %Y') }}
{{ content|striptags|truncate(150) }}
{{ article.title|upper }}
```

## Control Structures

### Conditionals

```jinja2
{% if article.author %}
    <p>By {{ article.author }}</p>
{% endif %}

{% if articles %}
    <ul>
    {% for article in articles %}
        <li>{{ article.title }}</li>
    {% endfor %}
    </ul>
{% else %}
    <p>No articles yet.</p>
{% endif %}
```

### Loops

```jinja2
{% for tag in article.tags %}
    <span class="tag">{{ tag }}</span>
{% endfor %}
```

## Template Inheritance

Create a base template that others can extend:

**base.html**:
```jinja2
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{{ SITENAME }}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>
```

**article.html**:
```jinja2
{% extends "base.html" %}

{% block title %}{{ article.title }} - {{ SITENAME }}{% endblock %}

{% block content %}
    <article>
        <h1>{{ article.title }}</h1>
        {{ article.content }}
    </article>
{% endblock %}
```

## Macros

Reusable template components:

```jinja2
{% macro render_article(article) %}
    <article>
        <h2>{{ article.title }}</h2>
        <p class="meta">{{ article.date|format_date }}</p>
        <div>{{ article.summary }}</div>
        <a href="{{ article.url }}">Read more</a>
    </article>
{% endmacro %}

{# Use the macro #}
{% for article in articles %}
    {{ render_article(article) }}
{% endfor %}
```

## Best Practices

1. **Keep templates DRY**: Use template inheritance and macros
2. **Use meaningful names**: Clear variable and block names
3. **Comment your code**: `{# This is a comment #}`
4. **Separate logic**: Keep complex logic in Python, not templates
5. **Test your templates**: Verify with different content scenarios

## Pelican-Specific Variables

Pelican provides many useful variables:

- `SITENAME`, `SITEURL`: Site configuration
- `articles`, `pages`: Content collections
- `article`, `page`: Current content item
- `categories`, `tags`: Taxonomy collections
- `THEME_STATIC_DIR`: Path to static assets

## Conclusion

Mastering Jinja2 templates will give you complete control over your Pelican site's appearance and functionality. Experiment with these features to create beautiful, dynamic static sites!
