# Deployment Strategy

This document describes how code moves from development to production using our CI/CD pipelines.  
The strategy aligns with our Hybrid Branching Model, where:

- **Commits to `main` drive Pre‑Production (PPE) validation**
- **Pushes to `release/*` branches drive UAT validation**
- **Tag creation drives controlled, intentional releases to Staging**
- **Manual approvals drive Production deployments**

---

## 1. Environments Overview

Our deployment pipeline uses five environments, each serving a distinct purpose in delivering high‑quality, reliable software.  
This structure balances **engineering velocity** with **business safety**, ensuring that changes move through increasingly production‑like stages before reaching customers.

### Environment Summary Table

| Environment                   | Purpose                                                    | Trigger                        |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------ |
| **Developer Local**           | Fast iteration, debugging, and isolated development        | Manual (developer‑initiated)   |
| **UAT**                       | Business validation and acceptance testing                 | Push to `release/*` branch     |
| **Pre‑Production (PPE)**      | Integration testing, smoke tests, and validation of `main` | Push to `main`                 |
| **Staging**                   | Final verification of a tagged release candidate           | Tag creation (e.g., `v1.4.0`)  |
| **Production Regions (PROD)** | Live customer traffic                                      | Manual approvals after staging |

---

## 2. Environment Details

### 🧑‍💻 Developer Local Environment

The local environment is where all development begins.

**Engineering Value**

- Fast feedback loop for coding and debugging
- Full control over tools, logs, and breakpoints
- Ability to run services in isolation or via local containers

**Business Value**

- Issues are caught early, reducing downstream cost
- Faster iteration leads to quicker delivery of features

---

### 🧪 UAT (User Acceptance Testing)

UAT is where business stakeholders validate that a feature meets requirements and behaves as expected.

**Trigger:** Push to a `release/*` branch

**Engineering Value**

- Confirms functional correctness from a user perspective
- Provides a stable environment for exploratory testing
- Ensures features are ready for final release tagging

**Business Value**

- Stakeholders verify that the product meets real business needs
- Reduces risk of misaligned features reaching customers

**Important:**  
If additional fixes are made after UAT sign‑off, the release candidate must be rebuilt and re‑validated.  
This requires **creating a new release tag** (usually a patch bump) so downstream environments receive the updated build.

---

### 🧭 Pre‑Production (PPE)

Pre‑Prod automatically receives every commit to `main`.  
It is the first shared environment where integrated changes run together.

**Trigger:** Push to `main`

**Engineering Value**

- Continuous integration validation
- Early detection of regressions and integration issues
- Mirrors production configuration closely
- Ensures `main` remains deployable at all times

**Business Value**

- Faster delivery of stable features
- Reduced risk of broken builds entering the release pipeline

PPE is **not** customer‑facing. It is a safety net for rapid iteration.

---

### 🧪 Staging

Staging receives deployments triggered by **release tags** (e.g., `v1.4.0`).  
It represents the exact build intended for production.

**Trigger:** Tag creation

**Engineering Value**

- Final verification environment
- Identical to production in configuration, scale, and integrations
- Supports load testing, performance checks, and release rehearsals

**Business Value**

- Ensures the release is production‑ready
- Provides a safe space for final validation
- Reduces risk of production incidents

**Important:**  
If additional fixes are committed to the release branch after a tag has been created,  
a **new tag must be created** (typically a patch bump such as `v1.4.1`) so Staging is refreshed with the updated build.  
Tags are immutable, so the only way to update Staging is to create a new version.

---

### 🚀 Production (PROD)

Production is the live customer environment.  
Deployments occur only after manual approval gates following successful staging validation.

**Trigger:** Manual approvals after staging

**Engineering Value**

- Stable, predictable deployment process
- Controlled rollout to regions minimizes blast radius
- Clear rollback points via immutable tags

**Business Value**

- High reliability and uptime for customers
- Safe, intentional releases with minimal risk
- Ability to pause, monitor, or roll back deployments quickly

---

## 3. Deployment Flow Summary

1. **Developers merge into `main`**  
   → Automatically deploys to **Pre‑Production (PPE)**.

2. **Developers push to a `release/*` branch**  
   → Automatically deploys to **UAT**.

3. **A release tag is created**  
   → Automatically deploys to **Staging**.

4. **Manual gates** ensure safe rollout to production regions  
   → Production deployments occur only after explicit approval.

This model ensures:

- Fast feedback for developers
- Predictable, intentional releases
- Safe, controlled production rollouts

---

# 4. Pre‑Production (PPE) Deployment

### **Trigger:** Any commit pushed to `main`

Whenever code is merged into `main`, the CI/CD pipeline automatically:

1. Builds the application
2. Runs tests and quality checks
3. Deploys the build to **Pre‑Production (PPE)**

---

# 5. UAT Deployment (Release Branch‑Based)

### **Trigger:** Push to a `release/*` branch

Whenever code is pushed to a release branch:

1. The release candidate is rebuilt
2. The updated build is deployed to **UAT**
3. Business stakeholders validate functionality

**Reminder:**  
If fixes are added after UAT approval, a **new tag** must be created so Staging and Production receive the updated build.

---

# 6. Staging Deployment (Tag‑Based)

### **Trigger:** Creation of a release tag

Example:

```bash
git tag -a v1.4.0 -m "Release v1.4.0"
git push origin v1.4.0
```

Tag creation signals that the code is:

- Stabilized
- Reviewed
- Ready for release

The pipeline automatically deploys the tagged version to **Staging**.

---

# 7. Production Deployment (Manual Gates)

After a release tag successfully deploys to Staging, production deployment becomes available.

### **Trigger:** Manual approval steps

Production rollout includes:

- Human review of staging results
- Optional change‑management approvals
- Controlled deployment to each production region

---

# 8. Deployment Flow Diagram

```
Local Dev → UAT (release/*) → PPE (main) → Staging (tag) → Production (manual)
```

---

# 9. Key Principles

- **Tags define production releases**  
  Branches move; tags are immutable and reproducible.

- **`main` must remain deployable**  
  PPE deployments enforce this discipline.

- **Release branches feed UAT**  
  Business validation happens before tagging.

- **Staging mirrors production**  
  The version deployed to staging is exactly what will ship.

- **Release fixes require new tags**  
  Any change after UAT sign‑off or after tagging must produce a new version.

---

# 10. Summary Table

| Action                     | Result / Deployment Target        |
| -------------------------- | --------------------------------- |
| Merge to `main`            | Auto‑deploy to **Pre‑Prod (PPE)** |
| Push to `release/*` branch | Auto‑deploy to **UAT**            |
| Create tag `vX.Y.Z`        | Auto‑deploy to **Staging**        |
| Approve release            | Deploy to **Production Regions**  |

---

This deployment strategy provides fast feedback for developers, stable release processes for operators, and safe, controlled rollouts for production environments.
