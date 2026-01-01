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

## **10. enable morgan as request/access middleware**

npm install morgan

Example

::1 - - [01/Jan/2026:18:36:40 +0000] "GET /ping HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0"

Morgan is a request logger. Its entire purpose is to emit access logs — the same style you’d get from Nginx or Apache.
Here’s what Morgan is designed for:
HTTP request logging: method, URL, status code, response time

- Access log formats: combined, common, tiny, etc.
- Streaming logs to stdout or a file
- Middleware integration: sits in the Express pipeline
