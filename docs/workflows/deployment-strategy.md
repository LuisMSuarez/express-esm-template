## Continuous Deployment Trigger (Tag-Based)

In the hybrid branching model, production deployments are **not** triggered by pushes to `main`.  
Instead, deployments occur only when a **version tag** is created and pushed.

This ensures that releases are intentional, stable, and traceable.

### Example GitHub Actions Trigger

```yaml
on:
  push:
    tags:
      - "v*" # Deploy only when a version tag is pushed (e.g., v1.4.0)
```

### How it works

1. A release branch is stabilized (e.g., `release/2025-02-01`).
2. When ready to ship, a version tag is created:

```bash
git tag -a v1.4.0 -m "Release v1.4.0"
git push origin v1.4.0
```

3. The CD workflow detects the tag push and deploys that exact version.

This gives the team:

- reproducible deployments
- clean rollback points
- intentional release control
- a stable, predictable production pipeline
