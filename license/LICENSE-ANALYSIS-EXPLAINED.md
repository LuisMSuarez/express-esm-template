# License Analysis - End-to-End Explanation

## Overview

This document explains how the license compliance analysis works from start to finish.

## Step-by-Step Process

### Step 1: Generate License Data

**Command:** `npx license-checker --csv --excludePrivatePackages > licenses.csv`

**What it does:**

- Scans your `node_modules` directory and `package-lock.json`
- Extracts license information for ALL packages (root + transitive dependencies)
- Outputs a CSV file with: `module name`, `license`, `repository`

**Example CSV line:**

```csv
"express@5.2.1","MIT","https://github.com/expressjs/express"
```

### Step 2: Load Root Dependencies

**Code:** Lines 8-13

**What it does:**

- Reads `package.json`
- Extracts all packages from `dependencies` and `devDependencies`
- Creates a list of root dependencies to compare against later

**Example:**

```javascript
rootDeps = ['express', 'inversify', 'zod', '@types/node', 'jest', ...]
```

### Step 3: Parse CSV File

**Code:** Lines 15-19, 21-44

**What it does:**

1. Reads the CSV file
2. Handles UTF-16 encoding issues (removes null bytes)
3. Splits into lines and skips header row
4. For each line, uses `parseCSVLine()` to properly handle quoted CSV fields

**Why custom parser?**

- CSV fields are quoted: `"package@version","MIT","https://..."`
- Need to handle commas inside quoted strings
- Need to handle escaped quotes (`""`)

**Example parsing:**

```javascript
Input: '"express@5.2.1","MIT","https://github.com/expressjs/express"';
Output: ["express@5.2.1", "MIT", "https://github.com/expressjs/express"];
```

### Step 4: Classify Each Package

**Code:** Lines 85-104

**For each package in the CSV:**

1. **Extract package info:**
   - `fullName`: `"express@5.2.1"` (with version)
   - `license`: `"MIT"`
   - `baseName`: `"express"` (without version, using `getBasePackageName()`)

2. **Check if it's a root dependency:**

   ```javascript
   isRootDep = rootDeps.includes("express"); // true
   ```

3. **Check if license is allowed:**

   ```javascript
   isAllowed("MIT"); // true
   isAllowed("ISC"); // false
   ```

4. **Categorize:**
   - If allowed → add to `allowed[]` array
   - If not allowed → add to `nonAllowed[]` array

### Step 5: License Validation Logic

**Code:** Lines 46-71 (`isAllowed()` function)

**Allowed licenses:**

- ✅ `MIT` (exact match)
- ✅ `Apache-2.0` or `Apache 2.0` (exact match or variations)
- ✅ `MIT OR CC0-1.0` (if MIT is one of the options)

**Not allowed:**

- ❌ `ISC` (similar to MIT but not MIT)
- ❌ `BSD-2-Clause`, `BSD-3-Clause`
- ❌ `GPL`, `LGPL`, `AGPL` (copyleft)
- ❌ Any other license

**Logic flow:**

```
1. Check if license is undefined/null → return false
2. Normalize (trim whitespace, uppercase)
3. Check exact MIT match → return true
4. Check Apache 2.0 variations → return true
5. Check "MIT OR ..." patterns → return true
6. Otherwise → return false
```

### Step 6: Group Non-Allowed Packages

**Code:** Lines 106-113

**What it does:**

- Groups all non-allowed packages by their license type
- Creates a map: `{ 'ISC': [pkg1, pkg2, ...], 'BSD-3-Clause': [...] }`

**Example:**

```javascript
byLicense = {
  'ISC': [
    { baseName: 'glob', license: 'ISC', isRootDep: false },
    { baseName: 'semver', license: 'ISC', isRootDep: false },
    ...
  ],
  'BSD-3-Clause': [...]
}
```

### Step 7: Generate Report

**Code:** Lines 115-157

**Console output includes:**

1. **Summary statistics:**
   - Total packages analyzed
   - Count of allowed vs non-allowed

2. **Detailed breakdown by license:**
   - For each non-allowed license type:
     - Total count
     - Which are root dependencies (⚠️ action required)
     - Which are transitive (📦 informational)

3. **Final verdict:**
   - ✅ If all root deps are compliant
   - ⚠️ If any root deps need attention

### Step 8: Save JSON Report

**Code:** Lines 159-182

**What it does:**

- Creates a structured JSON file with all the data
- Includes summary statistics
- Includes detailed breakdown by license type
- Separates root dependencies from transitive

**File:** `license-compliance-report.json`

## Key Functions Explained

### `parseCSVLine(line)`

**Purpose:** Parse a CSV line handling quoted fields correctly

**How it works:**

1. Track if we're inside quotes
2. When we see `"`, toggle quote state
3. When we see `,` outside quotes, that's a field separator
4. Handle escaped quotes `""` → single quote

**Example:**

```javascript
Input: '"express@5.2.1","MIT","https://github.com/expressjs/express"';
Output: ["express@5.2.1", "MIT", "https://github.com/expressjs/express"];
```

### `isAllowed(license)`

**Purpose:** Determine if a license is acceptable (MIT or Apache-2.0 only)

**Logic:**

1. Reject undefined/null
2. Normalize (trim, uppercase)
3. Check exact MIT match
4. Check Apache 2.0 variations (but not 1.x)
5. Check "MIT OR ..." patterns
6. Reject everything else

### `getBasePackageName(fullName)`

**Purpose:** Extract base package name from versioned name

**Examples:**

- `"express@5.2.1"` → `"express"`
- `"@types/node@20.0.0"` → `"@types/node"`
- `"@babel/core@7.28.5"` → `"@babel/core"`

**How it works:**

- For scoped packages (`@scope/name`): take first 2 parts after split
- For regular packages: take first part

## Complete Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Generate License Data                                    │
│    npx license-checker --csv > licenses.csv                  │
│    ↓                                                         │
│    CSV file with all packages + licenses                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Load Root Dependencies                                  │
│    Read package.json → extract dependencies                 │
│    ↓                                                         │
│    List of root packages: ['express', 'jest', ...]         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Parse CSV File                                           │
│    Read licenses.csv → parse each line                      │
│    ↓                                                         │
│    Array of: {fullName, license, repository}                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Classify Each Package                                    │
│    For each package:                                        │
│    - Extract base name (remove version)                     │
│    - Check if root dependency                              │
│    - Check if license allowed (MIT/Apache-2.0)            │
│    ↓                                                         │
│    Two arrays: allowed[] and nonAllowed[]                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Group by License Type                                    │
│    Group nonAllowed[] by license                           │
│    ↓                                                         │
│    { 'ISC': [...], 'BSD-3-Clause': [...] }                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Generate Report                                          │
│    - Console output with summary                            │
│    - JSON file with detailed data                           │
│    ↓                                                         │
│    license-compliance-report.json                          │
└─────────────────────────────────────────────────────────────┘
```

## Usage

### To run the analysis:

1. **First time setup (generate CSV):**

   ```bash
   npx license-checker --csv --excludePrivatePackages > licenses.csv
   ```

2. **Run the analysis:**

   ```bash
   node license-report.js
   ```

3. **Review output:**
   - Console shows summary and non-compliant packages
   - `license-compliance-report.json` has detailed data

### When to re-run:

- After adding/updating dependencies
- Before releases
- Periodically to check for license changes in transitive deps

## Understanding the Results

### ✅ Good News

- All root dependencies use MIT/Apache-2.0
- Non-allowed licenses are only in transitive dependencies

### ⚠️ Action Required

- If any root dependencies have non-allowed licenses
- You need to find alternatives or get approval

### 📦 Informational

- Transitive dependencies with non-allowed licenses
- Usually acceptable if root deps are compliant
- But be aware for legal/compliance reviews
