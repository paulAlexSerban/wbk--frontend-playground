Title: Markdown Tips for Pelican
Date: 2025-10-05 09:30
Category: Writing
Tags: markdown, content, writing, tips
Slug: markdown-tips
Authors: Paul Serban
Summary: Essential Markdown syntax and tips for creating content in Pelican
Status: published

# Markdown Tips for Pelican

Markdown makes writing for the web easy and enjoyable. Here's a comprehensive guide to Markdown syntax for your Pelican blog.

## Text Formatting

**Bold text** using `**bold**` or `__bold__`

*Italic text* using `*italic*` or `_italic_`

***Bold and italic*** using `***text***`

~~Strikethrough~~ using `~~text~~`

## Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Links and Images

[Link text](https://example.com)

[Link with title](https://example.com "Link title")

![Alt text for image](/images/example.jpg)

## Code

Inline `code` using backticks.

Code blocks:

```python
def example_function():
    print("Hello, Pelican!")
```

```javascript
function exampleFunction() {
    console.log('Hello, Pelican!');
}
```

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > And can be nested.

## Horizontal Rules

---

Use three or more hyphens, asterisks, or underscores.

***

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

Aligned columns:

| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Advanced Features

### Definition Lists

Term 1
:   Definition 1

Term 2
:   Definition 2a
:   Definition 2b

### Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

## Tips for Pelican

1. **Use metadata**: Always include Title, Date, Category, and Tags
2. **Summary field**: Add a brief summary for article listings
3. **Slug control**: Use custom slugs for clean URLs
4. **Status**: Set `Status: draft` for unpublished content
5. **Modified date**: Track content updates

Example metadata:

```markdown
Title: My Article
Date: 2025-10-01 10:00
Modified: 2025-10-02 15:30
Category: Technology
Tags: python, pelican
Slug: my-article
Authors: Your Name
Summary: A brief summary of your article
Status: published
```

## Conclusion

Markdown in Pelican is powerful and easy to use. Combine it with Jinja2 templates for a complete static site solution!
