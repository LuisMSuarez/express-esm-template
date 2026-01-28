## Release Stabilization: Where Should Fixes Go?

Once a release branch is created, the goal is to stabilize it without blocking ongoing development on `main`. During this phase, it’s important to apply fixes in the correct direction to keep history clean and avoid accidentally shipping untested changes.

### ✅ Recommended Approach

**Fixes should be applied directly to the release branch, then merged back into `main` after the release is finalized.**

This ensures:

- The release branch contains all stabilization work
- `main` does not accidentally pull in incomplete or unstable changes
- The release remains isolated and predictable
- All fixes flow back into future development after the release ships

### Example Workflow

#### 1. Apply the fix on the release branch

```bash
git checkout release/2025-02-01
git pull
# apply fix
git commit -am "Fix issue discovered during release stabilization"
git push
```

#### 2. After tagging and deploying the release, merge the release branch back into `main`

```bash
git checkout main
git pull
git merge release/2025-02-01
git push
```

---

## Why Not Fix on `main` First?

Fixing on `main` and cherry‑picking into the release branch introduces several risks:

- `main` may contain new features not intended for the release
- Cherry‑picking can accidentally pull in unrelated commits
- It breaks the idea of a “frozen” release
- It creates diverging histories for the same fix

For these reasons, **fixing on the release branch first is the safest and cleanest approach**.

---

## When Cherry‑Picking _Is_ Appropriate

Cherry‑picking into the release branch is acceptable only in these cases:

1. **The fix already exists in `main` before the release branch was created**

   ```bash
   git checkout release/2025-02-01
   git cherry-pick <commit-sha>
   ```

2. **The fix is trivial and clearly independent**  
   (e.g., documentation updates, version bumps, typos)

These are exceptions—not the default workflow.

---

## Summary

| Situation                                           | Where to Fix                 | Why                               |
| --------------------------------------------------- | ---------------------------- | --------------------------------- |
| Bug found during release stabilization              | **release branch**           | Keeps release isolated and stable |
| Fix already in `main` before release branch was cut | cherry‑pick into release     | Safe and expected                 |
| Fix applies only to future development              | `main`                       | Not part of the release           |
| Fix applies to both release and future versions     | release → merge back to main | Ensures consistency               |

**Rule of thumb:**  
**During release stabilization, fix on the release branch → merge back into `main` after tagging.**
