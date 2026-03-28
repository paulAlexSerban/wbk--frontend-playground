These terms get thrown around interchangeably, but they’re not the same thing. The differences come down to **scope, flexibility, and intent**.

---

## 1. Template

A **template** is the most generic concept.

**What it is:**

* A pre-defined structure with placeholders
* You fill in the gaps

**Where you see it:**

* Project scaffolding (e.g. basic React app)
* Documents (resume templates, ADR templates)

**Key idea:**

> A template is a *starting shape*, not a full system.

**Example:**

* A CRUD API template with empty controllers and routes
* A blog post template with headings already defined

---

## 2. Boilerplate

A **boilerplate** is a *working base project* with repetitive setup already done.

**What it is:**

* Pre-written, reusable code
* Eliminates repetitive setup work

**Where you see it:**

* Web apps with auth, routing, logging already wired
* Backend starters with middleware configured

**Key idea:**

> Boilerplate is about *saving time on known, repetitive code*.

**Example:**

* Express server with logging, error handling, env config
* React app with routing, state management, and styling preconfigured

**Reality check:**
Boilerplates often become:

* Outdated quickly
* Over-opinionated
* Hard to strip down

---

## 3. Skeleton

A **skeleton** is the *minimal structural foundation* of a system.

**What it is:**

* Barebones architecture
* Defines structure, not implementation

**Where you see it:**

* Clean architecture folder structures
* Microservice layout without business logic

**Key idea:**

> A skeleton defines *how things are organized*, not how they work.

**Example:**

```
/src
  /domain
  /application
  /infrastructure
```

No logic, just structure and boundaries.

---

## 4. Archetype

An **archetype** is a *code generator blueprint*.

**What it is:**

* A higher-level abstraction that generates projects
* Often parameterized (name, modules, features)

**Where you see it:**

* Maven Archetype
* Internal company scaffolding tools
* CLI generators

**Key idea:**

> Archetype = *factory for templates/boilerplates*

**Example:**

```
mvn archetype:generate \
  -DgroupId=com.company \
  -DartifactId=payment-service
```

This generates a full project based on a predefined model.

---

## Straight Comparison

| Concept     | Level      | Purpose                         | Flexibility | Typical Use       |
| ----------- | ---------- | ------------------------------- | ----------- | ----------------- |
| Template    | Low        | Fill-in structure               | High        | Docs, simple code |
| Boilerplate | Medium     | Reuse working setup             | Medium      | App starters      |
| Skeleton    | Low-Medium | Define architecture             | High        | System design     |
| Archetype   | High       | Generate projects automatically | Low-Medium  | CLI scaffolding   |

---

## The Clean Mental Model

Think in layers:

```
Archetype → generates → Boilerplate → contains → Templates + Skeleton
```

* **Skeleton** → structure
* **Template** → placeholders
* **Boilerplate** → working code
* **Archetype** → automation

---

## Practical Take (No BS)

* If you’re designing systems → think **skeleton**
* If you’re standardizing teams → build **archetypes**
* If you’re speeding up dev → use **boilerplate**
* If you’re guiding consistency → use **templates**

---

## What Most Engineers Get Wrong

They:

* Call everything a *template*
* Copy boilerplates blindly
* Ignore architectural skeletons
* Don’t invest in archetypes → lose scalability


