# Hotfix Process (Tag‑Based Model)

In this model, the **latest released tag** represents the true production state.  
Hotfixes branch directly from that tag to ensure the patch release contains **only** the hotfix and nothing else. This avoids accidentally deploying unreleased work that may exist on `main`.

After the hotfix is tagged and deployed, the fix is merged back into `main` (and into any active release branch) so that future releases automatically include it.

---

## When to Use a Hotfix Branch

Use this workflow when:

- A critical production issue must be fixed immediately  
- The fix cannot wait for the next scheduled release  
- `main` contains unreleased or unstable changes  
- You want the hotfix tag to include **only** the hotfix commit(s)

---

# Hotfix Workflow (Model B)

## **1. Identify the latest production tag**

This is the version currently deployed.

Example:

```
v1.4.0
```

---

## **2. Create a hotfix branch from the production tag**

Branch directly from the tag to guarantee a clean, minimal patch.

```bash
git checkout -b hotfix/critical-issue v1.4.0
```

---

## **3. Apply the fix**

Make the necessary changes, test locally, and commit.

```bash
git add .
git commit -m "Fix critical production issue"
git push -u origin hotfix/critical-issue
```

---

## **4. Tag the hotfix on the hotfix branch**

Tagging here ensures the patch release contains **only** the hotfix delta.

```bash
git tag -a v1.4.1 -m "Hotfix v1.4.1"
git push origin v1.4.1
```

Your CD pipeline deploys this tag.

---

## **5. Merge the hotfix back into `main`**

This ensures future releases include the hotfix.

```bash
git checkout main
git pull
git merge hotfix/critical-issue
git push
```

---

## **6. If a release branch is active, merge the hotfix into it**

If a release branch is currently stabilizing, it must also receive the hotfix to avoid regressions in the upcoming release.

```bash
git checkout release/<release-name>
git pull
git merge hotfix/critical-issue
git push
```

If no release branch is active, skip this step.

---

## **7. Delete the hotfix branch**

Once merged and deployed:

```bash
git branch -d hotfix/critical-issue
git push origin --delete hotfix/critical-issue
```

---

# Summary

| Step | Action |
|------|--------|
| 1 | Identify latest production tag |
| 2 | Branch from that tag into `hotfix/*` |
| 3 | Apply fix and commit |
| 4 | Tag the hotfix on the hotfix branch (e.g., `v1.4.1`) |
| 5 | Merge the hotfix into `main` |
| 6 | Merge into active release branch (if one exists) |
| 7 | Delete the hotfix branch |

---

# Why This Model Works

- **Zero risk** of deploying unreleased work from `main`  
- **Minimal, clean patch releases**  
- **Production is always defined by tags**, not branches  
- **Mainline history stays consistent** after merging the hotfix  
- **Active release branches stay aligned** with production fixes  
- **Future releases automatically include the fix**

This model is predictable, safe, and ideal for teams that treat tags as the authoritative production state.
