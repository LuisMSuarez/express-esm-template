# 🚀 Setting up an Express API takes 10 lines of code… but making it production‑ready is a whole different story

Most developers have had that moment:  
Spin up a new Node.js project, install Express, add a single route… and suddenly you have an API server running in under 10 lines.

But here’s the reality:  
**“Hello World” is easy. Production‑grade is not.**

Once you move beyond a toy project, you quickly realize how many capabilities a real‑world API needs before it’s ready for enterprise environments — observability, testing, linting, dependency injection, module strategy, logging, formatting, containerization, and more.

That’s exactly why I created:

**express-esm-template**  
https://github.com/LuisMSuarez/express-esm-template

A canonical starter repo that bundles modern, scalable, enterprise‑ready patterns for Express.

---

# 📦 Capabilities Included

Below is the full list of production‑grade features baked into the template.

## 1. TypeScript (with tsx for Dev mode)

Strong typing, fast iteration, and modern DX.

## 2. ES Modules

Future‑proof module strategy aligned with modern Node.js.

## 3. Dependency Injection (Inversify)

Clean architecture, testability, and separation of concerns.

## 4. Jest Unit Testing

Configured with `ts-jest` and a ready‑to‑use `jest.config.cjs`.

## 5. ESLint

Static analysis and code quality enforcement.

## 6. Prettier

Consistent formatting across the entire codebase.

## 7. Morgan (HTTP Access Logging)

Nginx‑style access logs for every request.

Morgan is a request logger designed for:

- HTTP method, URL, status code, response time
- Access log formats (combined, common, tiny)
- Streaming logs to stdout or a file
- Middleware integration

## 8. Pino (Application Event Logging)

High‑performance structured JSON logs for application events.

## 9. VS Code Debugging (launch.json)

Breakpoints, stepping, and smooth debugging experience.

## 10. tsconfig.json tuned for NodeNext

Correct ESM behavior, strict typing, and clean build output.

## 11. Gitleaks credential scanner

Powerful, open-source tool designed to help developers detect secrets such as API keys, passwords, and tokens in their projects.

## 12. Dotenv-flow for per-environment config

dotenv‑flow is a configuration loader for Node.js that reads a layered set of .env files—base, environment‑specific, and local overrides—and merges them in the correct order based on the current NODE_ENV, giving you a clean, predictable way to manage environment variables across development, testing, staging, and production.

node -e "console.log(process.env.NODE_ENV)"

## 13. Dockerfile (Containerization)

A production‑grade Dockerfile that:

- Uses multi‑stage builds
- Produces a minimal runtime image
- Ensures reproducible deployments
- Aligns with enterprise container standards

## 14. GitHub CI workflow (YAML)

Automated testing, linting, type‑checking, and Node version matrix builds — ensuring every commit is validated before it reaches main.

This is essential for:

- Cloud deployments
- CI/CD pipelines
- Kubernetes
- Local reproducibility

## 15. Swagger (OpenAPI Documentation)

Interactive API documentation with swagger-jsdoc, providing automatic OpenAPI 3.0 specification generation from JSDoc comments in the route files.

---

# 🧱 Why this template exists

I wanted a clean, modern, batteries‑included Express starter that reflects how real teams build APIs today:

- Strong typing
- Clear separation of concerns
- Enterprise‑grade logging
- Testability from day one
- Modern ESM module strategy
- Container‑ready
- Developer experience that feels fast and frictionless

Instead of rebuilding this scaffolding for every new project, I packaged it into a reusable template.

---

# 🔗 Repo

**express-esm-template**  
https://github.com/LuisMSuarez/express-esm-template

If you’re starting a new Express API in 2026, this gives you a solid foundation that scales with you.
