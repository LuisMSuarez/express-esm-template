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
