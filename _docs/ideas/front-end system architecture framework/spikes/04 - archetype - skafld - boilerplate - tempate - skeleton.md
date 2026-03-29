# 1. Archetype — “Opinionated blueprint”

An **archetype** is a **formalized, opinionated project template**, usually tied to a **tooling ecosystem**.

Classic example:

- Apache Maven Archetype
  Frontend equivalents:
- Opinionated starters like:
    - Create React App (historically)
    - Next.js starters
    - Vite templates

Key idea:

> It’s not just code—it encodes **best practices, conventions, and architecture decisions**.

---

# 2. Scaffold / Scaffolding — “Generated structure”

**Scaffolding** is the **process** of generating code.
A **scaffold** is the **output**.
Frontend examples:

- Running:
    - `npx create-react-app`
    - `npm create vite@latest`
- Generating a component via CLI

Key idea:

> Instead of copying code, you **generate it programmatically**.

This is more powerful than boilerplate because:

- It can ask questions
- It can customize output
- It enforces consistency

---

# 3. Boilerplate — “Minimal working setup”

A **boilerplate** is a **ready-to-use base codebase** that removes repetitive setup.

Frontend examples:

- A React app with routing, state management, linting already wired
- A “starter repo” on GitHub

Key idea:

> It’s a **starting codebase**, but typically static—you clone it and modify it.

Important nuance:

- Boilerplate often becomes outdated quickly
- It’s not always parameterized or configurable

# 4. Template — “Reusable structure with placeholders”

A **template** is a **predefined structure where you fill in the blanks**.

Think:

- HTML templates
- UI component templates
- Email templates

Frontend examples:

- A React component template:

    ```tsx
    const Component = ({ title }) => <h1>{title}</h1>;
    ```

- A page layout with placeholders (header, content, footer)
  Key idea:

> You reuse it many times, but you don’t generate a project from it—you **instantiate it repeatedly**.

---

# 5. Skeleton — “Barebones structure”

A **skeleton** is the **absolute minimal structure** of something.
Frontend examples:

- A minimal folder structure:

    ```
    src/
      components/
      pages/
    ```

- A component with no logic:

    ```tsx
    const Component = () => null;
    ```

Key idea:

> It’s **stripped down to essentials**, often used as a conceptual or structural starting point.

Also used in UI:

- “Skeleton screens” (loading placeholders)

---

# 6. Scaffold vs Boilerplate vs Template (the real distinction)

Here’s the part most people get wrong:

| Concept     | Static or Generated | Purpose                       | Flexibility |
| ----------- | ------------------- | ----------------------------- | ----------- |
| Template    | Static (reused)     | Fill placeholders             | Medium      |
| Boilerplate | Static (copied)     | Skip setup                    | Low         |
| Scaffold    | Generated           | Create tailored structure     | High        |
| Skeleton    | Static              | Minimal structure             | Very low    |
| Archetype   | Generated/Tooling   | Opinionated project blueprint | Medium-High |

---

# How this plays out in frontend (real-world)

Let’s say you start a new React project:

### Option 1 — Boilerplate

You clone a repo:

```
git clone react-starter
```

### Option 2 — Scaffold

You run:

```
npm create vite@latest
```

### Option 3 — Archetype

You use:

- Next.js starter with routing, SSR, conventions

### Option 4 — Template

Inside the app:

- You reuse component templates

### Option 5 — Skeleton

You define:

- Minimal folder + component structure

---

# The blunt truth

- **Boilerplate is the weakest approach** → becomes stale, rigid
- **Scaffolding is the modern default** → dynamic, repeatable
- **Templates are micro-level reuse**
- **Archetypes are macro-level opinionated systems**
- **Skeletons are just structure, not solutions**

---

# Mental model (keep this)

Think in layers:

```
Archetype (philosophy + architecture)
    ↓
Scaffold (generation mechanism)
    ↓
Boilerplate (static snapshot)
    ↓
Template (reusable pieces)
    ↓
Skeleton (bare structure)
```
