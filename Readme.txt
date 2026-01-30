# Description

Canonical repo for an Express web api using production-grade patterns:

- Typescript (tsx for Dev mode)
- ES Modules
- Dependency Injection (using Inversify)

# Setup Steps

## **1. Initialize the project**

- **npm init**  
  Creates a new Node.js project.  
  **Important:** choose **module** instead of CommonJS.

---

## **2. Install Express**

- **npm i express**  
  Installs the Express web framework.

---

## **3. Install TypeScript + tooling**

- **npm install --save-dev typescript ts-node @types/express**  
  Adds TypeScript, ts-node, and Express type definitions.

---

## **4. Run the development server**

- **npm run dev**  
  Executes the `dev` script defined in `package.json`.

---

## **5. tsconfig.json**

- **tsconfig.json**  
  Configures TypeScript behavior for the project.

---

## **6. launch.json**

- **launch.json**  
  Configures VS Code debugging (run + breakpoints).

## **7. setup jest for unit testing**

npm install --save-dev jest @types/jest ts-jest

### added

jest.config.cjs

## **8. enable linting**

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
eslint.config.js

## **9. enable prettier**

npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier

## **10. Enable pino for app event logging**

npm install pino pino-http
npm install pino-pretty

example of log "Ping endpoint called"

{"level":30,"time":1767293539689,"pid":18236,"hostname":"DESKTOP-MCR7HBJ","req":{"id":2,"method":"GET","url":"/ping","query":{},"params":{},"headers":{"host":"localhost:3000","connection":"keep-alive","sec-ch-ua":"\"Microsoft Edge\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"","sec-ch-ua-mobile":"?0","sec-ch-ua-platform":"\"Windows\"","dnt":"1","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.7","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br, zstd","accept-language":"en-US,en;q=0.9","if-none-match":"W/\"12-6FyCUNJCdUkgXM8yXmM99u6fQw0\""},"remoteAddress":"::1","remotePort":61667},"msg":"Ping endpoint called"}

## **11. Install zod for parameter validation**
npm install zod

## **12. Dotenv flow for per-environment config**
npm install --save-dev dotenv-flow

## **13. Install Gitleaks for credential scanning**
https://github.com/gitleaks/gitleaks

## **14. Enable swagger and OpenAI spec for API introspection**
Installed dependencies: swagger-jsdoc, swagger-ui-express, and their TypeScript type definitions
Created Swagger configuration: src/config/swagger.ts with OpenAPI 3.0 setup
Integrated Swagger middleware: Added routes in src/app.ts for Swagger UI and JSON spec
Documented the /ping endpoint: Added JSDoc comments with OpenAPI 3.0 format
Access points
Swagger UI: http://localhost:3000/api-docs
OpenAPI JSON spec: http://localhost:3000/api-docs.json