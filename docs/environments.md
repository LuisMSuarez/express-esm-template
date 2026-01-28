# Deployment Strategy

This document describes how code moves from development to production using our CI/CD pipelines.  
The strategy aligns with our Hybrid Branching Model, where **commits to `main` drive preproduction validation**, and **tag creation drives controlled, intentional releases**.

---

## 1. Environments Overview

| Environment             | Purpose                                                    | Trigger                        |
| ----------------------- | ---------------------------------------------------------- | ------------------------------ |
| **Preproduction (PPE)** | Integration testing, smoke tests, and validation of `main` | Push to `main`                 |
| **Staging**             | Final verification of a tagged release candidate           | Tag creation (e.g., `v1.4.0`)  |
| **Production Regions**  | Live customer traffic                                      | Manual approvals after staging |

---

## 2. Deployment Flow Summary

1. **Developers merge into `main`**  
   → Automatically deploys to **Preproduction (PPE)**.

2. **A release tag is created**  
   → Automatically deploys to **Staging**.

3. **Manual gates** ensure safe rollout to production regions  
   → Production deployments occur only after explicit approval.

This model ensures:

- Fast feedback for developers
- Predictable, intentional releases
- Safe, controlled production rollouts

---

# 3. Preproduction (PPE) Deployment

### **Trigger:** Any commit pushed to `main`

Whenever code is merged into `main`, the CI/CD pipeline automatically:

1. Builds the application
2. Runs tests and quality checks
3. Deploys the build to **Preproduction (PPE)**

### Purpose of PPE

- Validate integration of recent changes
- Catch regressions early
- Provide a stable environment for QA and exploratory testing
- Ensure `main` remains deployable at all times

PPE is **not** customer‑facing. It is a safety net for rapid iteration.

---

# 4. Staging Deployment (Tag‑Based)

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

### Purpose of Staging

- Final validation before production
- End‑to‑end testing
- Performance checks
- Release sign‑off

Staging always reflects the **exact version** that will be deployed to production.

---

# 5. Production Deployment (Manual Gates)

After a release tag successfully deploys to Staging, production deployment becomes available.

### **Trigger:** Manual approval steps

Production rollout includes:

- Human review of staging results
- Optional change‑management approvals
- Controlled deployment to each production region

### Why manual gates?

- Prevent accidental production releases
- Allow staged rollouts (e.g., Region A → Region B → Region C)
- Provide time for monitoring and rollback if needed
- Ensure compliance with operational and security requirements

This balances safety with deployment velocity.

---

# 6. Deployment Flow Diagram

```
main commit ───▶ PPE (auto)
       │
       └─── tag vX.Y.Z ───▶ Staging (auto)
                               │
                               └──▶ Production Regions (manual gates)
```

---

# 7. Key Principles

- **Tags define production releases**  
  Branches move; tags are immutable and reproducible.

- **`main` must remain deployable**  
  PPE deployments enforce this discipline.

- **Production deployments are intentional**  
  Nothing reaches customers without explicit approval.

- **Staging mirrors production**  
  The version deployed to staging is exactly what will ship.

---

# 8. Summary Table

| Action              | Result                       |
| ------------------- | ---------------------------- |
| Merge to `main`     | Auto‑deploy to PPE           |
| Create tag `vX.Y.Z` | Auto‑deploy to Staging       |
| Approve release     | Deploy to Production Regions |

---

This deployment strategy provides fast feedback for developers, stable release processes for operators, and safe, controlled rollouts for production environments.
