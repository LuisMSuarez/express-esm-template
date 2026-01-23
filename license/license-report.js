import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get root dependencies
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const rootDeps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {})
];

// Read CSV - handle UTF-16 encoding
let csv = fs.readFileSync(path.join(__dirname, 'licenses.csv'), 'utf8');
// Remove null bytes (UTF-16 BOM issue)
csv = csv.replace(/\0/g, '');
const lines = csv.trim().split('\n').slice(1);

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function isAllowed(license) {
  if (!license || license === 'undefined') return false;
  
  const normalized = license.trim();
  const upper = normalized.toUpperCase();
  
  // MIT (exact match)
  if (normalized === 'MIT' || upper === 'MIT') return true;
  
  // Apache 2.0 (exact match or variations)
  if (normalized === 'Apache-2.0' || 
      normalized === 'Apache 2.0' ||
      (upper.includes('APACHE') && (upper.includes('2.0') || upper.includes('2')))) {
    // Make sure it's not Apache 1.x
    if (!upper.includes('1.') && !upper.includes('1,')) {
      return true;
    }
  }
  
  // MIT OR CC0-1.0 - acceptable if MIT is an option
  if (normalized.includes('MIT') && normalized.includes('OR')) {
    return true; // MIT is one of the options
  }
  
  return false;
}

function getBasePackageName(fullName) {
  // Handle scoped packages like @types/node@20.0.0
  const parts = fullName.split('@');
  if (fullName.startsWith('@')) {
    return parts.slice(0, 2).join('@');
  }
  return parts[0];
}

const nonAllowed = [];
const allowed = [];

lines.forEach(line => {
  const parts = parseCSVLine(line);
  if (parts.length < 2) return;
  
  const fullName = parts[0];
  const license = parts[1];
  const repository = parts[2] || '';
  
  const baseName = getBasePackageName(fullName);
  const isRootDep = rootDeps.some(dep => {
    const depBase = getBasePackageName(dep);
    return baseName === depBase || fullName.startsWith(depBase + '@');
  });
  
  if (isAllowed(license)) {
    allowed.push({ fullName, license, isRootDep });
  } else {
    nonAllowed.push({ fullName, baseName, license, repository, isRootDep });
  }
});

// Group non-allowed by license
const byLicense = {};
nonAllowed.forEach(pkg => {
  if (!byLicense[pkg.license]) {
    byLicense[pkg.license] = [];
  }
  byLicense[pkg.license].push(pkg);
});

// Print report
console.log('='.repeat(80));
console.log('LICENSE COMPLIANCE REPORT');
console.log('='.repeat(80));
console.log(`\nTotal packages: ${lines.length}`);
console.log(`✅ Allowed (MIT/Apache-2.0): ${allowed.length}`);
console.log(`⚠️  Non-allowed: ${nonAllowed.length}\n`);

if (nonAllowed.length > 0) {
  console.log('NON-ALLOWED LICENSES FOUND:');
  console.log('='.repeat(80));
  
  for (const [license, packages] of Object.entries(byLicense).sort()) {
    const rootPackages = packages.filter(p => p.isRootDep);
    console.log(`\n📋 ${license} (${packages.length} packages)`);
    if (rootPackages.length > 0) {
      console.log(`   ⚠️  ROOT DEPENDENCIES (${rootPackages.length}):`);
      rootPackages.forEach(p => console.log(`      - ${p.baseName}`));
    }
    if (packages.length - rootPackages.length > 0) {
      console.log(`   📦 Transitive dependencies (${packages.length - rootPackages.length})`);
      if (packages.length <= 10) {
        packages.filter(p => !p.isRootDep).forEach(p => console.log(`      - ${p.baseName}`));
      } else {
        packages.filter(p => !p.isRootDep).slice(0, 5).forEach(p => console.log(`      - ${p.baseName}`));
        console.log(`      ... and ${packages.length - rootPackages.length - 5} more`);
      }
    }
  }
  
  // Summary of root dependencies with non-allowed licenses
  const rootNonAllowed = nonAllowed.filter(p => p.isRootDep);
  if (rootNonAllowed.length > 0) {
    console.log('\n\n⚠️  ACTION REQUIRED: ROOT DEPENDENCIES WITH NON-ALLOWED LICENSES');
    console.log('='.repeat(80));
    rootNonAllowed.forEach(pkg => {
      console.log(`  - ${pkg.baseName}: ${pkg.license}`);
    });
  } else {
    console.log('\n\n✅ GOOD NEWS: All root dependencies use allowed licenses!');
    console.log('   Non-allowed licenses are only in transitive dependencies.');
  }
}

// Save detailed report
const report = {
  summary: {
    total: lines.length,
    allowed: allowed.length,
    nonAllowed: nonAllowed.length,
    rootDependenciesWithNonAllowed: nonAllowed.filter(p => p.isRootDep).length
  },
  nonAllowedByLicense: Object.fromEntries(
    Object.entries(byLicense).map(([license, packages]) => [
      license,
      {
        total: packages.length,
        rootDependencies: packages.filter(p => p.isRootDep).map(p => p.baseName),
        transitive: packages.filter(p => !p.isRootDep).map(p => p.baseName)
      }
    ])
  )
};

fs.writeFileSync(
  path.join(__dirname, 'license-compliance-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n\n📄 Detailed report saved to license-compliance-report.json');
