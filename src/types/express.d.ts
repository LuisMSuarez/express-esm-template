import "express";

declare module "express-serve-static-core" {
  interface Request {
    validated?: {
      query?: {
        name?: string;
      };
      body?: unknown;
      params?: unknown;
    };
  }
}
