# Branching Strategy

This document outlines the branching strategy used in this repository. It begins with a brief overview of common Git branching models and then describes the **Hybrid Model** adopted by this team, including detailed workflows for feature development, release stabilization, and hotfixes.

---

## 1. Overview of Popular Branching Strategies

### 🌲 Trunk‑Based Development

A lightweight model where developers branch off `main`, make small changes, and merge back quickly.

**Characteristics**

- Short‑lived feature branches
- Frequent merges to `main`
- Heavy reliance on CI
- Feature flags often used

**Pros**

- Fastest feedback loop
- Minimal merge conflicts

**Cons**

- Requires strong CI discipline
- Harder to support multiple release versions

---

### 🌿 GitFlow

A structured model with dedicated branches for features, releases, and hotfixes.

**Branches**

- `main`
- `develop`
- `feature/*`
- `release/*`
- `hotfix/*`

**Pros**

- Clear separation of development and release work
- Supports multiple versions

**Cons**

- High process overhead
- Lots of merging
- Slower feedback loops

---

### 🌱 Hybrid Model (GitHub Flow + Release Branches)

A modern, pragmatic approach combining the speed of trunk‑based development with the safety of release branches.

**Branches**

- `main` — always deployable
- `feature/*` — short‑lived
- `release/*` — created only when preparing a release
- `hotfix/*` — for urgent production fixes

**Pros**

- Fast development
- Controlled releases
- Minimal overhead
- Works well with CI/CD

This is the model used by this repository.

---

## 2. Our Chosen Strategy: Hybrid Model

The Hybrid Model gives us:

- Fast iteration on `main`
- Predictable, stable releases
- Clean rollback points via tags
- A simple mental model for developers

### **Production Source of Truth**

In this model, the **latest released tag represents the true production state**.  
Tags — not branches — define what is deployed. This ensures production always maps to an immutable, reproducible commit, even when `main` contains unreleased or unstable work.

Release branches stabilize upcoming releases, while hotfix branches are created directly from the latest production tag to guarantee minimal, isolated patch releases.

Below is the full lifecycle for features, releases, and hotfixes.

---

# 3. Feature Development Workflow

Feature branches are short‑lived and created directly from `main`.

### **Step 1 — Create a feature branch**

```bash
git checkout main
git pull origin main
git checkout -b feature/my-new-feature
```

### **Step 2 — Commit work locally**

```bash
git add .
git commit -m "Add new feature"
```

### **Step 3 — Keep your branch up to date**

```bash
git fetch origin
git merge origin/main
```

or, if your team prefers rebasing:

```bash
git fetch origin
git rebase origin/main
```

### **Step 4 — Push the branch**

```bash
git push -u origin feature/my-new-feature
```

### **Step 5 — Open a Pull Request**

- PR targets `main`
- CI must pass
- At least one reviewer approves

### **Step 6 — Merge into `main`**

Use **squash merge** or **merge commit**, depending on team preference.

After merging:

```bash
git checkout main
git pull origin main
```

Feature branches are deleted after merge.

---

# 4. Release Branch Workflow

Release branches are created only when preparing a production release. They allow stabilization without blocking ongoing development on `main`.

### **Step 1 — Create the release branch**

```bash
git checkout main
git pull origin main
git checkout -b release/2025-02-01
git push -u origin release/2025-02-01
```

### **Step 2 — Stabilize the release**

Allowed changes:

- Bug fixes
- Documentation updates
- Version bumps
- Release notes

Not allowed:

- New features
- Refactors
- Risky changes

Example bug fix:

```bash
git checkout release/2025-02-01
git pull
# fix bug
git commit -am "Fix issue in release"
git push
```

### **Step 3 — Tag the release**

```bash
git checkout release/2025-02-01
git pull
git tag -a v1.4.0 -m "Release v1.4.0"
git push origin v1.4.0
```

Your CD pipeline deploys this tag.

### **Step 4 — Merge the release branch back into `main`**

```bash
git checkout main
git pull
git merge release/2025-02-01
git push
```

### **Step 5 — Delete the release branch**

```bash
git branch -d release/2025-02-01
git push origin --delete release/2025-02-01
```

---

# 6. Summary

| Workflow | Branch From               | Merge Into                       | Deployment Trigger       |
| -------- | ------------------------- | -------------------------------- | ------------------------ |
| Feature  | `main`                    | `main`                           | None                     |
| Release  | `main`                    | `main`                           | **Tag** (e.g., `v1.4.0`) |
| Hotfix   | Latest production **tag** | `main` (+ active release branch) | **Tag** (e.g., `v1.4.1`) |

The Hybrid Model gives us:

- Fast development
- Safe, intentional releases
- Clean rollback points
- Minimal branching overhead
